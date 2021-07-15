package com.cyber.view;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;

/**
 * @Description: 工具类
 * @author: Cyber
 * @date: 2021年07月15日 20:34
 */
public class Main {
    /**
     * 读取网址数据
     *
     * @return String
     */
    public static String getString(String url) {
        try {
            // 创建一个网址的抽象表示 ( 对象 )
            URL u = new URL(url);
            // 打开链接
            URLConnection conn = u.openConnection();
            // 获取传输数据的通道 ( 字节输入流 )
            InputStream is = conn.getInputStream();
            // 将字节输入流装饰为能一次读取一行文字的缓冲字符输入流
            BufferedReader br = new BufferedReader(new InputStreamReader(is, "utf-8"));
            // 读取一行行的数据并汇总
            StringBuffer stringBuffer = new StringBuffer();
            String text = null;
            while ((text = br.readLine()) != null) {
                stringBuffer.append(text);
            }
            // 将读取的数据返回给调用者
            return stringBuffer.toString();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 查询的天气
     * @return String
     * @description 查询天气函数
     */
    public static String getWeather(String city) {
        try {
            String json = getString("https://itdage.cn/hw/weather?city=" + URLEncoder.encode(city, "utf-8"));
            return json;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 发送短信函数
     * @param name 对象名称
     * @param phoneNumber 电话号码
     * @param s1 天气中文
     * @param s2 体感温度
     * @param s3 送她的话
     * @return String
     */
    public static String sendSms(String name, String phoneNumber, String s1, String s2, String s3) {
        try {
            name = URLEncoder.encode(name, "utf-8");
            System.out.println("Name:"+name);
            System.out.println("PhoneNum:"+phoneNumber);
            s1 = URLEncoder.encode(s1, "utf-8");
            System.out.println("s1:"+s1);
            System.out.println("s2:"+s2);
            s3 = URLEncoder.encode(s1, "utf-8");
            System.out.println("s3:"+s3);
            return name + "&phoneNumber=" + phoneNumber + "&s1=" + s1 + "&s2=" + s2 + "&s3=" + s3;
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * main function
     */
    public static void main(String[] args) {
        String name = "宝";
        String phoneNumber = "15173177539";
        String s1 = "雨";
        String s2 = "25-35";
        // String s3 = "宝,今天晚上输液了,输得什么液,想你的夜!";
        String s3 = "今天想你!";
        // 调用创建的函数 , 输出天气
        // System.out.println(getWeather("西宁"));
        // 使用此种方法会报错 , 因为数据没有进行格式转换
        // String json = getString("https://itdage.cn/hw/hwSms?name=" + name + "&phoneNumber="+phoneNumber+"&s1"+s1+"&s2"+s2+"&s3"+s3);
        // 使用创建的函数获取发送完信息后的值
        // System.out.println("params:"+sendSms(name,phoneNumber,s1,s2,s3));
        String json = getString("https://itdage.cn/hw/hwSms?name=" + sendSms(name,phoneNumber,s1,s2,s3));
        System.out.println(json);
    }
}
