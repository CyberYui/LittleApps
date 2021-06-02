<h1>Day3</h1>
学习链接https://blog.csdn.net/u012702547/article/details/53750449<br>
该博客写于2016年12月,虽然Spring Boot版本较低，但学习足够(应该吧φ(>ω<*) )<br>
在对Spring Boot实现自动配置的问题上，想要追根究底<br>
首先讲解了如何自己实现一个简单的Spring Boot 自动配置的案例<br>
假设我的需求是这样的：<br>
当我的项目中存在某个类的时候，系统自动为我配置该类的Bean<br>
同时，我这个Bean的属性还可以在application.properties中进行配置<br>
<h3><1>新建starter的Maven项目</h3>
以IntelliJ IDEA创建Project为例，其实很简单，创建一个Maven项目，但是注意创建的时候选择quickstart<br>
具体的：在选择时使用Maven-archetype-quickstart创建<br>
关于包名之类的细节自行查看教程<br>
https://blog.csdn.net/u012702547/article/details/53750449<br>
创建好工程后进入下一步
<h3><2>添加依赖</h3>
由于我们要使用Spring Boot的自动配置功能，所以在工程创建成功之后首先要添加Spring Boot自身的自动配置作为依赖，如下:
<pre>
&#60;dependency>
  &#60;groupId>org.springframework.boot&#60;/groupId>
  &#60;artifactId>spring-boot-autoconfigure&#60;/artifactId>
  &#60;version>1.4.2.RELEASE&#60;/version>
&#60;/dependency>
</pre>
<h3><3>属性配置</h3>
<pre>
@ConfigurationProperties(prefix = "hello")
public class HelloServiceProperties {
    private static final String MSG = "world";
    private String msg = MSG;
    public String getMsg() {
        return msg;
    }
    public void setMsg(String msg) {
        this.msg = msg;
    }
}
</pre>
这里就是一个简单的类，和上篇中提到的<u>类型安全的属性</u>获取是一致的<br>
这里属性的值我们可以在application.properties中来直接设置，如果不设置的话默认为world<br>
<h3><4>判断依据类</h3>
<pre>
public class HelloService {
  private String msg;
  public String sayHello(){
      return "hello " + msg;
  }
  public String getMsg() {
      return msg;
  }
  public void setMsg(String msg) {
      this.msg = msg;
  }
}</pre>
一会儿的例子就是根据这个类是否存在来创建这个类的Bean，当然这个类也可以是第三方类库
<h3><5>自动配置类</h3>
<pre>
@Configuration
@EnableConfigurationProperties(HelloServiceProperties.class)
@ConditionalOnClass(HelloService.class)
@ConditionalOnProperty(prefix = "hello",value = "enable",matchIfMissing = true)
public class HelloServiceAutoConfiguration {
    @Autowired
    private HelloServiceProperties helloServiceProperties;
    @Bean
    public HelloService helloService() {
        HelloService helloService = new HelloService();
        helloService.setMsg(helloServiceProperties.getMsg());
        return helloService;
    }
}
</pre>
这里@ConditionalOnClass注解主要是用来判断HelloService这个类在路径中是否存在<br>
在存在且容器中没有该类的Bean的情况下系统会自动配置需要的Bean<br>
@ConditionalOnProperty注解则表示指定的属性要满足的条件<br>
在helloService方法中我们则使用了HelloServiceProperties提供的参数<br>
<h3><6>注册配置</h3>
在resources目录下新建META-INF目录<br>
然后在META-INF目录下创建spring.factories文件<br>
文件内容如下，表示设置自动配置类的位置，若有多个配置类用”,”隔开即可
<pre>org.springframework.boot.autoconfigure.EnableAutoConfiguration=org.sang.HelloServiceAutoConfiguration</pre>
正常情况下我们按步骤一创建出来的Project是没有resources这个文件夹的<br>
在IntelliJ IDEA这个工具中，我们需要先创建一个directory，然后将之设置为resources root即可<br>
设置方式如下：选中resources目录右键单击-->Mark Directory as-->Resource Root
<h3><7>在项目中使用</h3>
经过上面几个步骤我们的自动配置功能就算是写好了<br>
接下来我们要在自己的项目中来使用它<br>
正常情况下做好自动配置类之后我们需要将之上传到 maven 私服上然后直接在项目中引用<br>
也可以将之安装到本地库<br>
这里我选择后者的一个简化方式，直接创建Module来引用这个自动配置Module（如果小伙伴是用STS或者MyEclipse之类的开发工具直接创建新工程然后添加引用类库即可）<br>

创建Module方式很简单<br>
选中刚才的Project右键单击，New一个Module<br>
这个Module是一个SpringBoot项目<br>
创建成功之后选择新建的Module按F4打开Module设置，然后选择右边的加号添加依赖<br>
具体的细节操作可以参照教程<br>
https://blog.csdn.net/u012702547/article/details/53750449<br>

然后在新建Module的pom.xml文件中添加如下依赖：
<pre>
&#60;dependency>
  &#60;groupId>org.sang&#60;/groupId>
  &#60;artifactId>org.sang.mystarter&#60;/artifactId>
  &#60;version>1.0-SNAPSHOT&#60;/version>
&#60;/dependency>
</pre>
实际上就是刚刚创建的自动配置文件的坐标。然后新Module的入口类中添加如下代码
<pre>
@Autowired
private HelloService helloService;
@RequestMapping("/")
public String index(){
  return helloService.sayHello();
}
</pre>
使用刚刚创建的HelloService，如果需要我们可以在application.properties中添加如下配置<br>
<pre>
hello.msg = 卖花担上看桃李, 拍酒楼头听管弦。
</pre>
运行项目，浏览器上显示"hello 卖花担上看桃李, 拍酒楼头听管弦",项目完成，这就是一个简单的自定义自动配置类

Day3 over......