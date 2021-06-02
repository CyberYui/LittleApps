<h1>The Learning notes of ThymeLeaf</h1>
主要学习Thymeleaf官网的官方文档，并跟着做一些笔记和实践<br>
https://www.thymeleaf.org/<br>

Thymeleaf为Spring Framework的3.x和4.x版本提供了集成<br>
有两个独立的库<br>
（称为thymeleaf-spring3和thymeleaf-spring4）<br>
这些库打包在单独的.jar文件中<br>
（thymeleaf-spring3-{version}.jar和thymeleaf-spring4-{version}.jar）<br>

在使用时，需要将其添加到类路径中，以便在应用程序中使用Thymeleaf的Spring集成

教程中的代码示例和示例应用程序使用Spring 4.x及其相应的Thymeleaf集成<br>
但内容对Spring 3.x也有效<br>

<h2>关于ThymeLeaf</h2>
Thymeleaf提供了一套Spring集成，允许在Spring MVC应用程序中将其用作JSP的全功能替代品<br>
这些集成将允许你：
<ul>
<li>将Spring MVC @Controller对象中的映射方法转发给由Thymeleaf管理的模板，就像使用JSP一样</li>
<li>在模板中使用Spring表达式语言（Spring EL）而不是OGNL</li>
<li>在您的模板中创建与表单支持bean和结果绑定完全集成的表单，包括使用属性编辑器，转换服务和验证错误处理</li>
<li>从Spring管理的消息文件中显示国际化消息（通过通常的MessageSource对象）</li>
<li>使用Spring自己的资源解析机制来解析模板</li>
</ul>

<h1>Spring标准方言</h1>
Thymeleaf提供了一种方言，并在一个名为<code>org.thymeleaf.spring4.dialect.SpringStandardDialect</code>的类中实现，该类实际上从<code>org.thymeleaf.standard.StandardDialect</code>扩展而来<br>

除了标准方言中已经存在的所有功能外，Spring标准方言还引入了以下功能：
<ul>
<li>使用Spring表达式语言（Spring EL或SpEL）作为变量表达式语言，而不是OGNL<br>
因此，所有<code>${...}</code>和<code>*{...}</code>表达式都将通过Spring的表达式语言引擎进行评估</li>
<li>使用SpringEL的语法访问应用程序上下文中的任何<code>bean：${@myBean.doSomething()}</code></li>
<li>表单处理的新属性：<br><code>th:field</code>，<code>th:errors</code>和<code>th:errorclass</code><br>除了<code>th:object</code>一个新实现，它允许它用于表单命令选择</li>
<li>表达式对象和方法<br><code>#themes.code(...)</code>，它相当于<code>spring:theme</code>JSP自定义标记</li>
<li>表达式对象和方法<br><code>#mvc.uri(...)</code>，它等同于<code>spring:mvcUrl(...)</code>JSP<自定义函数（仅在Spring 4.1+中）</li>
</ul>

大多数情况下，不应该在普通的TemplateEngine对象中直接使用此方言作为其配置的一部分。<br>
除非你有非常具体的Spring集成需求，否则你应该创建一个新的模板引擎类的实例<br>
它自动执行所有必需的配置步骤：<br><code>org.thymeleaf.spring4.SpringTemplateEngine</code>
一个bean配置的例子:
<pre>
@Bean
public SpringResourceTemplateResolver templateResolver(){
    // SpringResourceTemplateResolver automatically integrates with Spring's own
    // resource resolution infrastructure, which is highly recommended.
    SpringResourceTemplateResolver templateResolver = new SpringResourceTemplateResolver();
    templateResolver.setApplicationContext(this.applicationContext);
    templateResolver.setPrefix("/WEB-INF/templates/");
    templateResolver.setSuffix(".html");
    // HTML is the default value, added here for the sake of clarity.
    templateResolver.setTemplateMode(TemplateMode.HTML);
    // Template cache is true by default. Set to false if you want
    // templates to be automatically updated when modified.
    templateResolver.setCacheable(true);
    return templateResolver;
}

@Bean
public SpringTemplateEngine templateEngine(){
    // SpringTemplateEngine automatically applies SpringStandardDialect and
    // enables Spring's own MessageSource message resolution mechanisms.
    SpringTemplateEngine templateEngine = new SpringTemplateEngine();
    templateEngine.setTemplateResolver(templateResolver());
    // Enabling the SpringEL compiler with Spring 4.2.4 or newer can
    // speed up execution in most scenarios, but might be incompatible
    // with specific cases when expressions in one template are reused
    // across different data types, so this flag is "false" by default
    // for safer backwards compatibility.
    templateEngine.setEnableSpringELCompiler(true);
    return templateEngine;
}
</pre>
或者，使用Spring的基于XML的配置:
<pre>
&#60;!-- SpringResourceTemplateResolver automatically integrates with Spring's own -->
&#60;!-- resource resolution infrastructure, which is highly recommended.          -->
&#60;bean id="templateResolver"
      class="org.thymeleaf.spring4.templateresolver.SpringResourceTemplateResolver">
  &#60;property name="prefix" value="/WEB-INF/templates/" />
  &#60;property name="suffix" value=".html" />
  &#60;!-- HTML is the default value, added here for the sake of clarity.          -->
  &#60;property name="templateMode" value="HTML" />
  &#60;!-- Template cache is true by default. Set to false if you want             -->
  &#60;!-- templates to be automatically updated when modified.                    -->
  &#60;property name="cacheable" value="true" />
&#60;/bean>
    
&#60;!-- SpringTemplateEngine automatically applies SpringStandardDialect and      -->
&#60;!-- enables Spring's own MessageSource message resolution mechanisms.         -->
&#60;bean id="templateEngine"
      class="org.thymeleaf.spring4.SpringTemplateEngine">
  &#60;property name="templateResolver" ref="templateResolver" />
  &#60;!-- Enabling the SpringEL compiler with Spring 4.2.4 or newer can speed up  -->
  &#60;!-- execution in most scenarios, but might be incompatible with specific    -->
  &#60;!-- cases when expressions in one template are reused across different data -->
  &#60;!-- ypes, so this flag is "false" by default for safer backwards            -->
  &#60;!-- compatibility.                                                          -->
  &#60;property name="enableSpringELCompiler" value="true" />
&#60;/bean>
</pre>

先到这里，之后再慢慢看，先回到学习Web项目中去。。。。