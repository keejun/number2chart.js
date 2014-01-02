number2chart.js
===============

a funtion to display numbers in charts

you can follow this file named index.html , in this example, you should place the number2chart.js after the body elements,
then, remember to place to div elements which id is "displaypie" ,put it in anywhere that counld be correctly placed .
the function could get the formated dictionary data .you should not place any string which counld not be calculated in the value of the dictionary .  now ,play the function after the js reference ,and just to show charts .

1.您可以按照index.html的实例，添加一个DIV元素此id值设置为“displaypie”，以适合大小的Size放在您认为适合的位置.

2.注意您须将number2chart.js引用放在页面渲染快完成之前，即放在body元素或者上述Div元素之后.

3.您须输入如 var dictdata={"Beijing":34,"Hangzhou":22,"Shanghai":45,"Suzhou":60}的dict格式数据作为方法的接受参数，添加其方   法在引用的js脚本之后.注字典格式中的Value值需要为整数值，以便进行比例计算.

4.您可以根据此js源代码进行改变，使其适合不同业务场合。


附：
   <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
  <html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>number2chart.js</title>
   </head>
   <body>
                <div id="displaypie"></div>
  </body>
  <script  type="text/javascript" src="piechart.js" charset="utf-8"></script>
  <script type="text/javascript">
     var dictdata={"差":34,"较差":22,"还行":45,"推荐":60,"力荐":123};
    chartpie(dictdata);
</script>
</html>
demo显示：
    
