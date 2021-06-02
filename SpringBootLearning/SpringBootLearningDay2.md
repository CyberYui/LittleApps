<h1>Day2</h1>  
学习链接https://blog.csdn.net/u012702547/article/details/53740047<br>
此链接编写时间为2016年，相对于新版本Spring Boot已经有些过时了，但用于学习还好<br>

创建Spring Boot项目成功之后，系统会自动下载所需要的依赖项。<br>

在项目工程中看到整个项目的入口类文件<br>
src-->main-->java-->包名-->class文件<br>

其中有@SpringBootApplication注解<br>
这是整个Spring Boot的核心注解，它的目的就是开启Spring Boot的自动配置<br>
根据官方文档操作<br>
在@SpringBootApplication注解上加一个@RestController注解<br>
这样使这个类变为一个Controller，然后再在里边提供一个地址转换方法<br>
<pre>
    @RequestMapping(value = "/",produces = "text/plain;     charset=UTF-8")  
    String index(){  
        return "Hello Spring Boot!";  
    }  
</pre>

运行，自动开启tomcat，并打开浏览器，键入地址http://localhost:8080<br>
显示为Hello Spring Boot！<br>
项目运行成功<br>
  
入口类会自动创建一个main方法<br>
这里的@SpringBootApplication则是一个组合注解<br>
它的源码是:  
<pre>
    @Target({ElementType.TYPE})  
    @Retention(RetentionPolicy.RUNTIME)  
    @Documented  
    @Inherited  
    @SpringBootConfiguration  
    @EnableAutoConfiguration  
    @ComponentScan(  
        excludeFilters = {@Filter(  
        type = FilterType.CUSTOM,  
        classes = {TypeExcludeFilter.class}  
    )}  
    )  
    public @interface SpringBootApplication {  
  
    }  
</pre>
就像官方文档说的那样，这一个注解包含了  
@SpringBootConfiguration、@EnableAutoConfiguration以及@ComponentScan三个注解<br>

@SpringBootConfiguration表明这个类是一个配置类<br>
@EnableAutoConfiguration则表示让Spring Boot根据类路径中的jar包依赖为当前项目进行自动配置<br>
@ComponentScan告诉Spring哪个packages的用注解标识的类会被spring自动扫描并且装入bean容器<br>

如果我们使用了@SpringBootApplication注解的话，系统会去入口类的同级包以及下级包中去扫描实体类，因此我们建议入口类的位置在groupId+arctifactID组合的包名下<br>

<h1>关闭特定的自动配置</h1>  
官方文档中也提及到这一点，如果只想要@SpringBootApplication扫描特定的类而不是全部类，那么就可以关闭特定的自动配置<br>
<pre>
    @SpringBootApplication(exclude = DataSourceAutoConfiguration.class) 
</pre>

为了使Spring Boot在启动时有一些个性化的东西<br>
<h1>定制Banner</h1>  
<h2>修改Banner</h2>  
我们在启动Spring Boot项目的时候，在控制台会默认输出一个启动图案<br>
当然，这个图案如果你需要的话是可以自己修改的<br>
<pre>
1.在src/main/resources下新建一个banner.txt文档
2.通过http://patorjk.com/software/taag网站生成需要的字符，将字符拷贝到步骤1所创建的txt文档中.
</pre>

<h2>关闭Banner</h2>  
可以修改当然也可以关闭，关闭Banner需要我们稍微修改一下main方法中的代码<br>
<pre>
public static void main(String[] args) {
        SpringApplicationBuilder builder = new SpringApplicationBuilder(Test19SpringBoot2Application.class);
        //修改Banner的模式为OFF
        builder.bannerMode(Banner.Mode.OFF).run(args);
    }
</pre>  
这样修改之后启动project的时候就看不到Banner了  

<h1>Spring Boot的配置文件</h1>  
Spring Boot使用一个全局的配置文件application.properties或者application.yml

配置文件放在src/main/resources目录下<br>
properties是我们常见的一种配置文件，Spring Boot不仅支持properties这种类型的配置文件，也支持yaml语言的配置文件，我这里以properties类型的配置文件为例来看几个案例<br>
<h2>修改Tomcat默认端口和默认访问路径</h2>  
Tomcat默认端口是8080<br>
可以将之改为8081<br>
默认访问路径是http://localhost:8080<br>
可以将之改为http://localhost:8081/helloboot<br>
我们来看看这两个需求要怎么样通过简单的配置来实现<br>
很简单，在application.properties文件中添加如下代码:
<pre>
server.context-path=/helloboot
server.port=8081
</pre>
这样之后就可以使用新的链接访问了  

<h1>常规属性配置</h1>  
使用了Spring Boot，在使用Spring容器框架下注入properties文件里的值这项工作将会变得更加简单<br>
我们只需要在application.properties中定义属性，然后在代码中直接使用@Value注入即可<br>
比如:
<pre>尽量不要使用中文
book.author=罗贯中
book.name=三国演义
book.pinyin=sanguoyanyi
</pre>
这里专门设置了中文，因为中文不做特殊处理会乱码，处理方式为继续在application.properties中添加如下代码
<pre>
server.tomcat.uri-encoding=UTF-8
spring.http.encoding.charset=UTF-8
spring.http.encoding.enabled=true
spring.http.encoding.force=true
spring.messages.encoding=UTF-8
</pre>
然后 在IntelliJ IDEA中依次点击File -> Settings -> Editor -> File Encodings<br>
将Properties Files (*.properties)下的Default encoding for properties files设置为UTF-8<br>
将Transparent native-to-ascii conversion前的勾选上<br>
然后在变量中通过@Value直接注入就行了<br>
代码如下:
<pre>
@Value(value = "${book.author}")
    private String bookAuthor;
@Value("${book.name}")
    private String bookName;
@Value("${book.pinyin}")
    private String bookPinYin;
</pre>
修改index方法，使之返回这些值:
<pre>
@RequestMapping(value = "/",produces = "text/plain;charset=UTF-8")
    String index(){
        return "Hello Spring Boot! The BookName is "+bookName+";and Book Author is "+bookAuthor+";and Book PinYin is "+bookPinYin;
    }
</pre>

<h1>类型安全的配置(已废弃的例子)</h1>
刚刚说的这种方式我们在实际项目中使用的时候工作量略大，因为每个项目要注入的变量的值太多了<br>
这种时候我们可以使用基于类型安全的配置方式<br>
就是将properties属性和一个Bean关联在一起，这样使用起来会更加方便<br>
<h2><1>在src/main/resources文件夹下创建文件book.properties</h2>
文件内容如下：
<pre>尽量不要使用中文
book.name=红楼梦
book.author=曹雪芹
book.price=28
</pre>
<h2><2>创建Book Bean,并注入properties文件中的值</h2><br>
代码如下：prefix是指前缀，location指定要注入文件的位置<br>
新版本的Spring Boot已经废弃@ConfigurationProperties中的locations方法
<pre>
@Component
@ConfigurationProperties(prefix = "book",locations = "classpath:book.properties")
public class BookBean {
    private String name;
    private String author;
    private String price;

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getAuthor() {
        return author;
    }
    public void setAuthor(String author) {
        this.author = author;
    }
    public String getPrice() {
        return price;
    }
    public void setPrice(String price) {
        this.price = price;
    }
}
</pre>
<h2><3>添加路径映射</h2><br>
在Controller中添加如下代码注入Bean:
<pre>
@Autowired
    private BookBean bookBean;
</pre>
添加路径映射：
<pre>
@RequestMapping("/book")
    public String book() {
        return "Hello Spring Boot! The BookName is "+bookBean.getName()+";and Book Author is "+bookBean.getAuthor()+";and Book price is "+bookBean.getPrice();
    }
</pre>
上面的方法在最新版的Spring Boot中已经无法使用了，但只是个例子，接着往下搞<br>

<h1>日志配置</h1>
默认情况下Spring Boot使用Logback作为日志框架<br>
如果有需要我们可以手动配置日志级别以及日志输出位置，相比于我们在Spring容器中写的日志输出代码<br>
这里的配置更为简单，只需要在application.properties中添加如下代码:
<pre>上面表示配置日志输出位置，下面配置日志级别
logging.file=/home/sang/workspace/log.log
logging.level.org.springframework.web=debug
</pre>

<h1>Profile配置问题</h1>
在Spring Boot 中系统提供了更为简洁的方式<br>
全局Profile配置我们使用application-{profile}.properties来定义<br>
然后在application.properties中通过spring.profiles.active来指定使用哪个Profile<br>
接下来介绍了一个案例，例子紧接着日志配置前的那个红楼梦案例进行<br>
<pre>
在src/main/resources文件夹下定义不同环境下的Profile配置文件
文件名分别为
application-prod.properties
application-dev.properties
这两个前者表示生产环境下的配置，后者表示开发环境下的配置，均和application.properties同等级存放：
</pre>
application-prod.properties:
<pre>
server.port=8081
</pre>
application-dev.properties:
<pre>
server.port=8080
</pre>
然后在application.properties中进行简单配置，如下:
<pre>
spring.profiles.active=dev
</pre>
这个表示使用开发环境下的配置。然后运行项目，我们得通过8080端口才可以访问<br>
如果想换为生产环境，只需要把spring.profiles.active=dev改为spring.profiles.active=prod即可，当然访问端口这是也变为8081了<br>

Day2 over.......