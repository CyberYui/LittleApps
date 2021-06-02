/*
 * @Author: Chaos J 
 * @Date: 2017-11-29 14:19:04 
 * @Last Modified by: Chaos J
 * @Last Modified time: 2017-12-07 11:15:55
 */
window.onload = function() {

    'use strict';

    let vCount = new Vue({
        el: '#v-count',
        data: {
            list1: [],
            list2: [],
            list3: [],
            list4: []
        },
        methods: {
            count: function(index) {
                let targetList = [];
                let valueCount = 0;
                switch(index) {
                    case 1: targetList = this.list1; break;
                    case 2: targetList = this.list2; break;
                    case 3: targetList = this.list3; break;
                    case 4: targetList = this.list4; break;                    
                }
                for(let i in targetList) {
                    valueCount += targetList[i].value;
                }
                if(DEBUG) {
                    console.log('count方法被调用\nlist'+index,targetList,'\ncount:',valueCount);
                }
                return valueCount;
            }
        }
    });

    let starttime = '';
    let endtime = '';

    // 时间选择器 
    $('#text-search').daterangepicker({
        autoApply: true
    }, function(start, end) {
        starttime = start.format('YYYY-MM-DD HH:mm:ss');
        endtime   = end.format('YYYY-MM-DD HH:mm:ss');
        if(DEBUG) console.log('New date range selected: ' + starttime + ' to ' + endtime);
    });

    // 获取canvas
    let chartCanvasAll = $('#chart-all').get(0).getContext('2d');
    let chartCanvas1   = $('#chart-1').get(0).getContext('2d');
    let chartCanvas2   = $('#chart-2').get(0).getContext('2d');
    let chartCanvas3   = $('#chart-3').get(0).getContext('2d');
    let chartCanvas4   = $('#chart-4').get(0).getContext('2d');

    // 初始化饼图
    let chartAll = new Chart(chartCanvasAll);
    let chart1   = new Chart(chartCanvas1);
    let chart2   = new Chart(chartCanvas2);
    let chart3   = new Chart(chartCanvas3);
    let chart4   = new Chart(chartCanvas4);

    // 饼图设定
    let chartOptions     = {
        segmentShowStroke    : true,
        segmentStrokeColor   : '#fff',
        segmentStrokeWidth   : 2,
        percentageInnerCutout: 50, // This is 0 for Pie charts
        animationSteps       : 100,
        animationEasing      : 'easeOutBounce',
        animateRotate        : true,
        animateScale         : false,
        responsive           : true,
        maintainAspectRatio  : true,
    };

    /**
     * 给后台传过来的表数据进行转换以便适应饼图
     * @param {list} data
     * @return {list} preparedData
     */
    function toChartData(data) {
        let preparedData = [];
        for(let i in data) {
            let o = {};
            o.value = data[i].value;
            o.label = data[i].name;
            o.color = getColorBeauty(i);
            preparedList.push(o);
        }
        return preparedData;
    }

    /**
     * 为ChartAll定义的刷新方法
     * @param {Chart} chart 需要变更数据的Chart对象
     * @param {List} newData 要填入的内容
     */ 
    function updateChart(chart, newData) {
        let id = chart.chart.canvas.id;
        let e = $('#' + id).get(0).getContext('2d');
        if(DEBUG) console.log('Chart:'+id+' 被销毁');
        chart.destroy();
        if(DEBUG) console.log('Chart:'+id+' 重新生成');
        let preparedData = toChartData(newData);
        chart = new Chart(e).Doughnut(preparedData, chartOptions);
    }

    /**
     * 为ChartAll定义的刷新方法
     * @param {Chart} chart 需要变更数据的Chart对象
     * @param {Vue} vue 要填入的Vue的内容
     */ 
    function updateChartAll(chart, vue) {
        let id = chart.chart.canvas.id;
        let e = $('#' + id).get(0).getContext('2d');
        if(DEBUG) console.log('Chart:'+id+' 被销毁');
        chart.destroy();
        if(DEBUG) console.log('Chart:'+id+' 重新生成');
        chart = new Chart(e).Doughnut([
            { value: vue.count(1), color: getColorBeauty(0), label: '共售出（桶）' },
            { value: vue.count(2), color: getColorBeauty(1), label: '共回收' },
            { value: vue.count(3), color: getColorBeauty(2), label: '共售出（水）' },
            { value: vue.count(4), color: getColorBeauty(3), label: '共换桶' }
        ], chartOptions);
    }

    // 初始化Vue-count
    function updatePage() {
        $.ajax({
            url: '',
            type: 'POST',
            dataType: 'json',
            data: {
                starttime: starttime,
                endtime  : endtime
            },
            success: function(data) {
                // 填充Vue表格
                vCount.list1 = data.list1;
                vCount.list2 = data.list2;
                vCount.list3 = data.list3;
                vCount.list4 = data.list4;

                // 为饼图分别填充值（先销毁后新建）
                updateChartAll(chartAll, vCount);
                updateChart(chart1, vCount.list1);
                updateChart(chart2, vCount.list2);
                updateChart(chart3, vCount.list3);
                updateChart(chart4, vCount.list4);
            },
            error: function(data) {
                if(DEBUG) console.error('更新Vue-Count失败');
                if($('.alert-danger').length == 0) {
                    MessageBox($('#time-picker'), 'DANGER', '错误！', '无法访问服务器！');
                }
            }
        });
    }
    // 先进行一次初始化
    updatePage();
    // 搜索按钮点击的时候也进行一次ajax
    $(document).on('click', '#btn-search', updatePage);
}