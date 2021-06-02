<h1>Day 4</h1>
学习链接<br>
https://blog.csdn.net/u012702547/article/details/53784992<br>
该博客写于2016年12月，SpringBoot版本更新后或许很多案例无法成功实现，但用于学习足够(应该吧)<br>

Sprng Boot这些东西说到底最终还是要回归到Web上才能体现出它的更大的价值<br>
<h2>使用Spring Boot开发Web项目</h2>
Spring Boot 提供了spring-boot-starter-web来为Web开发予以支持<br>
spring-boot-starter-web为我们提供了嵌入的Tomcat以及SpringMVC的依赖，用起来很方便<br>
另外，我们这里还要用到模板引擎<br>
(模板引擎（这里特指用于Web开发的模板引擎）是为了使用户界面与业务数据（内容）分离而产生的，它可以生成特定格式的文档，用于网站的模板引擎就会生成一个标准的HTML文档)关于模版引擎可以看另一个文档ModelEngine.md<br>
Spring Boot提供了大量的模板引擎，包括FreeMarker、Groovy、Thymeleaf、Velocity和Mustache，在 提供的这么多中它推荐使用Thymeleaf<br>
Thymeleaf在使用的过程中通过ThymeleafAutoConfiguration类对集成所需要的Bean进行自动配置，通过ThymeleafProperties来配置Thymeleaf，包括前缀后缀什么的<br>
我们可以查看ThymeleafProperties一段源码：
<pre>
@ConfigurationProperties("spring.thymeleaf")
public class ThymeleafProperties {
    private static final Charset DEFAULT_ENCODING = Charset.forName("UTF-8");
    private static final MimeType DEFAULT_CONTENT_TYPE = MimeType.valueOf("text/html");
    public static final String DEFAULT_PREFIX = "classpath:/templates/";
    public static final String DEFAULT_SUFFIX = ".html";
    private boolean checkTemplate = true;
    private boolean checkTemplateLocation = true;
    private String prefix = "classpath:/templates/";
    private String suffix = ".html";
    private String mode = "HTML5";

    ......
    ......
    ......
}
</pre>
DEFAULT_CONTENT_TYPE = MimeType.valueOf("text/html")<br>
DEFAULT_PREFIX = "classpath:/templates/"<br>

从这一段源码中我们可以看到默认的页面后缀名为.html，前缀为classpath:/templates/，实际上也就是我们需要把html页面放到resources文件夹下的templates文件夹中<br>
同时我们也看到了要如何修改这个配置，在application.properties文件中以spring.thymeleaf为前缀来配置相关属性<br>
(在@ConfigurationProperties中看到)<br>
关于Thymeleaf可以看目录中的Thymeleaf文件夹中的文件<br>

关于Thymeleaf的文件有些多，看一段时间回来接着搞这个。。。<br>

Day4 over......