<h1>模版引擎</h1>

模板的诞生是为了将显示与数据分离，模板技术多种多样，但其本质是将模板文件和数据通过模板引擎生成最终的HTML代码<br>

模板技术并不是什么神秘技术，干的是拼接字符串的体力活。模板引擎就是利用正则表达式识别模板标识，并利用数据替换其中的标识符。<br>
比如：
<pre>
Hello, <%= name%>

数据是
{name: '木的树'}
</pre>
那么通过模板引擎解析后，我们希望得到
<pre>
Hello, 木的树
</pre>
模板的前半部分是普通字符串，后半部分是模板标识，我们需要将其中的标识符替换为表达式。模板的渲染过程如下<br><br>
![ModelRenderProcess](https://oss-cn-hangzhou.aliyuncs.com/yqfiles/e437978f5ecc9f4046d63de6cdcce42bdc308ea2.png "ModelRenderProcess")
上面我们演示是简单的字符串替换，但对于模板引擎来说，要做的事情更复杂些。通常需要以下几个步骤<br>
<h4>利用正则表达式分解出普通字符串和模板标识符</h4>
<h4>将模板标识符转换成普通的语言表达式</h4>
<h4>生成待执行语句</h4>
<h4>将数据填入执行，生成最终的字符串</h4>

Demo代码如下
<pre>
//编译的思想
function tmpl(str, obj) {
    if (typeof str === 'string') {
        var tm = str.replace(/<%=\s*([^%>]+)\s*%>/g, function() {
            var key = arguments[1];
            return "' + obj." + key; // 在函数字符串中利用'包裹正常字符串
        });

        tm = "return '" + tm; //"'Hello' + obj.name"
        var compile = new Function('obj', tm);
        return compile(obj);
    }
}

var str = "Hello, <%= name%>";
var obj = {name: "Lzz"}; // Hello, Lzz
</pre>
模板引擎是以业务逻辑层和表现层分离为目的的，将规定格式的模板代码转换为业务数据的算法实现。<br>

它可以是一个过程代码、一个类，甚至是一个类库。不同的模板引擎其功用也不尽相同，但其基本原理都差不多。<br>
 
模板引擎的基本机理就是替换（转换），将指定的标签转换为需要的业务数据；将指定的伪语句按照某种流程来变换输出<br>