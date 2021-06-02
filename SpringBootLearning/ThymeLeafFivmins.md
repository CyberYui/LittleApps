<h1>五分钟内开始使用标准标记语言</h1>

官方文档<br>
https://www.thymeleaf.org/doc/articles/standarddialect5minutes.html<br>

Thymeleaf非常具有可扩展性，它允许您使用所需的名称定义自己的一组模板属性（甚至标记）<br>
根据需要的语法评估所需的表达式并应用所需的逻辑。它更像是一个模板引擎框架<br>

不仅如此，它还带有一些称为标准方言（称为Standard和SpringStandard）的东西，它们定义了一组功能<br>
这些功能应该足以满足大多数情况。 您可以识别这些标准方言在模板中的使用时间，因为它将包含以th前缀开头的属性，如&#60;span th:text="..."><br>

注意，Standard和SpringStandard方言几乎完全相同<br>
只是SpringStandard包含了集成到Spring MVC应用程序中的特定功能<br>
（例如，使用Spring表达式语言进行表达式评估而不是OGNL）<br>

<h2>●标准表达式语法●</h2>

大多数Thymeleaf属性允许将它们的值设置为或包含表达式<br>
表达式可以有五种类型：<br>
<ul>
<li>${...} ：变量表达式</li>
<li>*{...} ：选择表达式</li>
<li>#{...} ：消息（i18n）表达式</li>
<li>@{...} ：链接（URL）表达式</li>
<li>~{...} ：片段表达式</li>
</ul>

<h3>●变量表达式●</h3>
变量表达式是OGNL表达式，如果您将Thymeleaf与Spring-集成在上下文变量上执行，也可以称为Spring术语中的模型属性，则为Spring EL。<br>
他们看起来像这样
<pre>变量表达式
${session.user.name}
</pre>
你会发现他们作为属性值或作为他们的一部分，取决于属性
<pre>
&#60;span th:text="${book.author.name}">
</pre>
上面的代码(两种代码一起)会有下面这一行代码的效果：
<pre>
((Book)context.getVariable("book")).getAuthor().getName()
</pre>
但是我们可以在不仅涉及输出的场景中找到变量表达式，而且还可以使用更复杂的处理，如条件，迭代....
<pre>
&#60;li th:each="book : ${books}">
</pre>
这里<code>${books}</code>从上下文中选择名为<code>books</code>的变量，并将其评估为在<code>th:each</code>循环中使用的迭代器<br>

<h3>●选择表达式●</h3>
选择表达式就像变量表达式一样
它们将在先前选择的对象上执行而不是整个上下文变量映射。
他们看起来像这样:
<pre>
*{customer.name}
</pre>
它们所作用的对象由<code>th:object</code>属性指定:
<pre>
&#60;div th:object="${book}"> 
  ...... ......
&#60;span th:text="*{title}">...&#60;/span>
  ...... ...... 
&#60;/div>
</pre>
所以这相当于:
<pre>
{
  // th:object="${book}" 
  final Book selection=(Book) context.getVariable("book"); 
  // th:text="*{title}" 
  output(selection.getTitle()); 
}
</pre>

<h3>●消息表达式●</h3>
消息表达式（通常称为文本外部化，国际化或i18n）允许我们从外部源<code>（.properties文件）</code>中检索特定于语言环境的消息，并通过键引用它们（可选地）应用一组参数。<br>

在Spring应用程序中，它将自动与Spring的MessageSource机制集成<br>
<pre>#{main.title}</pre>
<pre>#{message.entrycreated(${entryId})}</pre>
你可以在模板中找到它们：
<pre>
 &#60;table>
  ... 
  &#60;th th:text="#{header.address.city}">...&#60;/th> 
  &#60;th th:text="#{header.address.country}">...&#60;/th>
  ... 
 &#60;/table> 
</pre>
请注意，如果希望消息键由上下文变量的值确定，或者希望将变量指定为参数，则可以在消息表达式中使用变量表达式：
<pre>
#{${config.adminWelcomeKey}(${session.user.name})}
</pre>

<h3>●链接表达式●</h3>
链接表达式旨在构建URL并向其添加有用的上下文和会话信息（通常称为URL重写的过程）<br>
因此，对于部署在Web服务器的<code>/myapp</code>上下文中的Web应用程序，可以使用以下表达式：
<pre>
&#60;a th:href="@{/order/list}">...&#60;/a> 
</pre>
可以转换成这样的东西：
<pre>
&#60;a href="/myapp/order/list">...&#60;/a> 
</pre>
或者，即使这样，如果我们需要保持会话和cookie没有启用<br>
（或者服务器还不知道）：
<pre>
&#60;a href="/myapp/order/list;jsessionid=23fa31abd41ea093">...&#60;/a> 
</pre>
网址也可以带参数：
<pre>
&#60;a th:href="@{/order/details(id=${orderId},type=${orderType})}">...&#60;/a> 
</pre>
导致这样的事情：
<pre>
&#60;!-- Note ampersands (&) should be HTML-escaped in tag attributes... -->
&#60;a href="/myapp/order/details?id=23&amp;type=online">...&#60;/a>
</pre>
链接表达式可以是相对的<br>
在这种情况下，应用程序上下文将不会加到URL的前面：
<pre>
&#60;a th:href="@{../documents/report}">...&#60;/a>
</pre>
也是与服务器相关的（同样，没有应用程序上下文加以前缀）:
<pre>
&#60;a th:href="@{~/contents/main}">...&#60;/a> 
</pre>
和协议相关（就像绝对URL一样，但浏览器将使用与正在显示的页面相同的HTTP或HTTPS协议）：
<pre>
&#60;a th:href="@{//static.mycompany.com/res/initial}">...&#60;/a>
</pre>
当然，链接表达式可以是绝对的：
<pre>
&#60;a th:href="@{http://www.mycompany.com/main}">...&#60;/a> 
</pre>
但是等一下,在一个绝对(或相对协议)的URL中…Thymeleaf Link Expression添加了什么值呢?<br>

简单地说：由响应过滤器定义URL重写的可能性:在基于Servlet的Web应用程序中，对于每个输出的URL（上下文相对，相对，绝对......），Thymeleaf将始终调用HttpServletResponse.encodeUrl(...)机制在显示URL之前。<br> 
这意味着过滤器可以通过包装HttpServletResponse对象（一种常用的机制）为应用程序执行自定义的URL重写。<br>

<h3>●文字和操作●</h3>
有很多类型的文字和操作可用：
<ul>
<h3>文字</h3>
<li>文字文字：'one text','Another one!'...</li>
<li>数字文字：0,34,3.0,12.3, ...</li>
<li>布尔文字：true,false</li>
<li>空文字：null</li>
<li>文字标记：one,sometext,main, ...</li>

<h3>文字操作</h3>
<li>字符串连接：+</li>
<li>文字替换： |The name is ${name}| </li>

<h3>算术运算</h3>
<li>二元运算符：+,-,*,/,%</li>
<li>减号（一元运算符）：-</li>

<h3>布尔运算</h3>
<li>二元运算符：and , or</li>
<li>布尔否定（一元运算符）：！, not</li>

<h3>比较和平等</h3>
<li>比较器：>, <, >=, <= (gt, lt, ge, le)</li>
<li>平等操作符：==, != (eq, ne)</li>

<h3>有条件的操作符</h3>
<li>If-then: (if) ? (then)</li>
<li>If-then-else: (if) ? (then) : (else)</li>
<li>Default: (value) ?: (defaultvalue)</li>
</ul>

<h3>●表达式预处理●</h3>
关于表达式的最后一件事是知道表达式预处理 ，在__之间指定，如下所示：
<pre>
#{selection.__${sel.code}__} 
</pre>
我们所看到的有一个变量表达式<code>（${sel.code}）</code><br>
它将被首先执行，并且结果---比方说“ALL”---将被用作事后执行的真实表达式的一部分<br>
在这个案例中是一个国际化的（它将通过关键selection.ALL查找消息<code>selection.ALL</code>）

<h2>●一些基本属性●</h2>
让我们来看看标准方言中的几个最基本的属性。<br>
从<code>th:text</code>开始，它只是替换标签的主体（再次注意这里的原型设计能力）：
<pre>
&#60;p th:text="#{msg.welcome}">Welcome everyone!&#60;/p>
</pre>
现在，<code>th:each</code>元素都会重复它所处元素的次数，这与它的表达式返回的数组或列表所指定的次数相同，同时为迭代元素创建一个内部变量，其语法与Java的foreach表达式相同：
<pre>
 &#60;li th:each="book : ${books}" th:text="${book.title}">En las Orillas del Sar&#60;/li> 
</pre>
最后，Thymeleaf为特定的XHTML和HTML5属性提供了许多th属性<br>
这些属性只评估它们的表达式并将这些属性的值设置为结果。<br>
他们的名字模仿那些他们设定的属性：
<pre>
&#60;form th:action="@{/createOrder}"> 

&#60;input type="button" th:value="#{form.submit}" /> 

&#60;a th:href="@{/admin/users}"> 
</pre>

Article over.....
之后的教程是关于如何使用Thymeleaf的，可以回到SpringBoot的学习了....
