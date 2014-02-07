number2chart.js
=============== 

![alt tag](https://github.com/keejun/number2chart.js/blob/master/sample.png?raw=true)

a plugin to display numbers in charts

you can follow this file named index.html , in this example, you should place the number2chart.js after the jquery elements,
then, remember to place to div elements which id is "displaypie" or other,put it in anywhere that counld be correctly placed .
the function could get the formated dictionary data .you should not place any string which counld not be calculated in the value of the dictionary .  now ,play the function after the js reference ,and just to show charts .

1.您可以按照index.html的实例，添加一个DIV元素此id值设置为“displaypie”，以适合大小的Size放在您认为适合的位置.

2.您须输入如 var dictdata={"Beijing":34,"Hangzhou":22,"Shanghai":45,"Suzhou":60}的dict格式数据作为方法的接受参数，添加其方   法在引用的js脚本之后.注字典格式中的Value值需要为整数值，以便进行比例计算. 您可以指定某个元素添加如chartbar(dictdata)或者chartpie(dictdata)方法.

3.为了图表的美观，在设置字典的key值长度时尽量设置为合适的需要,设置过长会导致部分字体遮挡.注意您须将number2chart.js引用放在页面jquery之后.

4.您可以根据此js进行改变，使其适合不同业务场合。
