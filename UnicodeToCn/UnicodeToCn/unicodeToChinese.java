package UnicodeToCn;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

// @Info: 这是一个简单的 Unicode 字符和 中文 转换的小例子

public class unicodeToChinese {
    /**
     * @Title: unicodeEncode
     * @Description: unicode编码
     */
    public static String unicodeEncode(String string) {
        char[] utfBytes = string.toCharArray();
        String unicodeBytes = "";
        for (int i = 0; i < utfBytes.length; i++) {
            String hexB = Integer.toHexString(utfBytes[i]);
            if (hexB.length() <= 2) {
                hexB = "00" + hexB;
            }
            unicodeBytes = unicodeBytes + "\\u" + hexB;
        }
        return unicodeBytes;
    }

    /**
     * @Title: unicodeDecode
     * @Description: unicode解码
     */
    public static String unicodeDecode(String string) {
        Pattern pattern = Pattern.compile("(\\\\u(\\p{XDigit}{4}))");
        Matcher matcher = pattern.matcher(string);
        char ch;
        while (matcher.find()) {
            ch = (char) Integer.parseInt(matcher.group(2), 16);
            string = string.replace(matcher.group(1), ch + "");
        }
        return string;
    }

    public static void main(String[] args) {
        String sourceData = "这是原始的数据！！！";
        String unicodeEncode = unicodeEncode(sourceData);
        System.out.println("编码结果：");
        System.out.println(unicodeEncode);//\u8fd9\u662f\u539f\u59cb\u7684\u6570\u636e\uff01\uff01\uff01

        String unicodeDecode = unicodeDecode(unicodeEncode);
        System.out.println("解码结果：");
        System.out.println(unicodeDecode);//这是原始的数据！！！
    }

}