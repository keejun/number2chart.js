/**
 * Created by keejun on 13-12-31.
 */
var number2chart=new Object();
    number2chart.chartbar=function(numberlist){
        var regrex=/\{(\"?[\w|\d|\[\u4e00-\u9fa5\]]{1,}\"?\:\d{1,}\,?){1,}[^\W]\}/;
        function obj2string(o){
            var r=[];
            if(typeof o=="string"){
                return "\""+o.replace(/([\'\"\\])/g,"\\$1").replace(/(\n)/g,"\\n").replace(/(\r)/g,"\\r").replace(/(\t)/g,"\\t")+"\"";
            }
            if(typeof o=="object"){
                if(!o.sort){
                    for(var i in o){
                        r.push(i+":"+obj2string(o[i]));
                    }
                    if(!!document.all&&!/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)){
                        r.push("toString:"+o.toString.toString());
                    }
                    r="{"+r.join()+"}";
                }else{
                    for(var i=0;i<o.length;i++){
                        r.push(obj2string(o[i]))
                    }
                    r="["+r.join()+"]";
                }
                return r;
            }
            return o.toString();
        }
        var boolnumber=regrex.test(obj2string(numberlist));
        if(!numberlist||typeof numberlist!="object"||boolnumber==false){
            return false;
        }
        var numberpush = Object.keys(numberlist).map(function(key){
            return numberlist[key];
        });
        var numberindex=Object.keys(numberlist).map(function(key){
            return key;
        })
        var numbers=(numberpush).toString();//变量
        //判断是否数字
        var judgenumber=function(){
            var number=numbers.replace(/[\ |\，|\[a-zA-Z\]+|\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g,"");
            var num=parseFloat(number);
            if(!isNaN(num)){
                return 1;
            }
            else{
                return -1;
            }
        }
        //过滤出数字数组
        var arraynumber=function(){
            var arrnumberfir=numbers.replace(/[\ |\，|\[a-zA-Z\]+|\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g,":");
            var arrnumbersec=arrnumberfir.replace(/\:{1,}/g,":");
            var arrnumberres=arrnumbersec.split(":");
            if (arrnumberres[arrnumberres.length-1]==""){
                arrnumberres.pop();
            }
            if(arrnumberres[0]==""){
                arrnumberres=arrnumberres.slice(1);
            }
            return arrnumberres;
        }
        //对数组进行排序计算
        var sumcount;
        var countarry=function(arraynumber){
            sumcount=arraynumber;
            var percentarray={};
            var sum =0;
            for(var j=0;j<sumcount.length;j++){
                sum=sum+parseInt(sumcount[j]);
            }
            for(var i=0;i<sumcount.length;i++){
                percentarray["number"+i+":"+sumcount[i]]=(sumcount[i]/sum).toFixed(3);

            }
            // console.log(percentarray);
            return percentarray;
        }
        //颜色库
        var colorlib={
            "mblue":"#1C86EE",
            "dgreen":"#32CD32",
            "dorange":"#DB570C",
            "sblue":"#54FF9F",
            "dpurple":"#9400D3",
            "yellow":"#FFA500",
            "scyan":"#00F5FF",
            "lred":"#86173B",
            "mgreen":"#90EE90",
            "lblue":"#AEEEEE",
            "lgreen":"#7FC712",
            "lpurple":"#FF00FF",
            "lblound":"#CDAD00",
            "mgreenin":"#7CFC00",
            "dblack":"#545454",
            "bgray":"gray"
        }
        /////////////////////////////////
        //创建canvas
        var canvas=document.createElement("canvas");
        canvas.height=320;
        canvas.width=520;
        var circlex=canvas.width/10;
        var circley=canvas.height*5/6;
        var displaycanvas=document.getElementById("displaybar");
        if(displaycanvas.hasChildNodes()){
            displaycanvas.innerHTML="";
        }
        displaycanvas.appendChild(canvas);
        var context=canvas.getContext("2d");
        var drawxy=function(){
            context.beginPath();
            context.moveTo(circlex,circley);
            context.lineTo(canvas.width,circley);
            context.moveTo(circlex,circley);
            context.lineTo(circlex,0);
            context.lineWidth=1;
            context.strokeStyle="#ECC8C8";
            context.stroke();
            for(var i=0;i<10;i++){
                context.font="12px Microsoft YaHei";
                context.fillText(i*10+"%",circlex-30,circley*(1-i/10));
            }
                context.fillText("100%",circlex-34,10);
                context.closePath();
        }
        var trangle={};
        var colorindex=0;
        var colors = Object.keys(colorlib).map(function(key){
            return colorlib[key];
        });
        //划出各块百分比
        var fontx=10;
        var inum=0;
        var drawtrangle=function(trangle){
            context.beginPath();
            context.fillText(sumcount[inum],circlex+fontx,circley*(1-trangle)-10);
            context.fillRect(circlex+fontx,circley*(1-trangle),25,circley*trangle);
            context.fillStyle=colors[colorindex];
            context.fill();
            colorindex++;
            inum++;
            fontx=fontx+50;
        }
        //将每个数目的百分比推入字典
        var drawpercent=function(percentarray){
            var fonty=10;
            var li=0;
            for(var index in percentarray){
                trangle[index]=percentarray[index];
                var intextpercent=(trangle[index]*100).toFixed(1);
                context.font="12px Microsoft YaHei";
                context.fillStyle=colors[colorindex];
                context.fillText(numberindex[li],circlex+fonty,circley+20);
                context.fillText(intextpercent+"%",circlex+fonty,circley+40);
                fonty=fonty+50;
                li=li+1;
                drawtrangle(trangle[index]);
            }
        }
        if(judgenumber()){
            var percentdict=countarry(arraynumber());
            drawxy();
            drawpercent(percentdict);
        }
        else{
            return  "" ;
        }
    }
//////////////////////////////////////////////////////////////////////////////
    number2chart.chartpie=function (numberlist){
    var regrex=/\{(\"?[\w|\d|\[\u4e00-\u9fa5\]]{1,}\"?\:\d{1,}\,?){1,}[^\W]\}/;
    function obj2string(o){
        var r=[];
        if(typeof o=="string"){
            return "\""+o.replace(/([\'\"\\])/g,"\\$1").replace(/(\n)/g,"\\n").replace(/(\r)/g,"\\r").replace(/(\t)/g,"\\t")+"\"";
        }
        if(typeof o=="object"){
            if(!o.sort){
                for(var i in o){
                    r.push(i+":"+obj2string(o[i]));
                }
                if(!!document.all&&!/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)){
                    r.push("toString:"+o.toString.toString());
                }
                r="{"+r.join()+"}";
            }else{
                for(var i=0;i<o.length;i++){
                    r.push(obj2string(o[i]))
                }
                r="["+r.join()+"]";
            }
            return r;
        }
        return o.toString();
    }
    var boolnumber=regrex.test(obj2string(numberlist));
    if(!numberlist||typeof numberlist!="object"||boolnumber==false){
        return false;
    }
    var numberpush = Object.keys(numberlist).map(function(key){
        return numberlist[key];
    });
    var numberindex=Object.keys(numberlist).map(function(key){
        return key;
    })
    var numbers=(numberpush).toString();//变量
    //判断是否数字
    var judgenumber=function(){
        var number=numbers.replace(/[\ |\，|\[a-zA-Z\]+|\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g,"");
        var num=parseFloat(number);
        if(!isNaN(num)){
            return 1;
        }
        else{
            return -1;
        }
    }
    //过滤出数字数组
    var arraynumber=function(){
        var arrnumberfir=numbers.replace(/[\ |\，|\[a-zA-Z\]+|\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g,":");
        var arrnumbersec=arrnumberfir.replace(/\:{1,}/g,":");
        var arrnumberres=arrnumbersec.split(":");
        if (arrnumberres[arrnumberres.length-1]==""){
            arrnumberres.pop();
        }
        if(arrnumberres[0]==""){
            arrnumberres=arrnumberres.slice(1);
        }
        return arrnumberres;
    }
    //对数组进行排序计算
    var sumcount;
    var countarry=function(arraynumber){
         sumcount=arraynumber;
        var percentarray={};
        var sum =0;
        for(var j=0;j<sumcount.length;j++){
            sum=sum+parseInt(sumcount[j]);
        }
        for(var i=0;i<sumcount.length;i++){
            percentarray["number"+i+":"+sumcount[i]]=(sumcount[i]/sum).toFixed(3);

        }

        return percentarray;
    }
    //颜色库
    var colorlib={
        "mblue":"#1C86EE",
        "dgreen":"#32CD32",
        "dorange":"#DB570C",
        "sblue":"#54FF9F",
        "dpurple":"#9400D3",
        "yellow":"#FFA500",
        "scyan":"#00F5FF",
        "lred":"#86173B",
        "mgreen":"#90EE90",
        "lblue":"#AEEEEE",
        "lgreen":"#7FC712",
        "lpurple":"#FF00FF",
        "lblound":"#CDAD00",
        "mgreenin":"#7CFC00",
        "dblack":"#545454",
        "bgray":"gray"
    }
    //创建canvas
    var canvas=document.createElement("canvas");
    canvas.height=320;
    canvas.width=420;
    var circlex=canvas.width/1.5;
    var circley=canvas.height/2;
    var displaycanvas=document.getElementById("displaypie");
    if(displaycanvas.hasChildNodes()){
        displaycanvas.innerHTML="";
    }
    displaycanvas.appendChild(canvas);
    //
    var context=canvas.getContext("2d");
    var radius=120;
    var drawcircle=function(){
        context.beginPath();
        context.arc(circlex,circley,radius,0,Math.PI*2,true);
        context.lineWidth=1;
        context.strokeStyle="#ECC8C8";
        context.stroke();
        context.closePath();
    }
    var trangle={};
    var startrangle=0;
    var colorindex=0;
    var colors = Object.keys(colorlib).map(function(key){
        return colorlib[key];
    });
    //划出各块百分比
    var drawtrangle=function(trangle){
        context.beginPath();
        context.moveTo(circlex,circley);
        context.arc(circlex,circley,radius,parseFloat(startrangle)*Math.PI*2,2*Math.PI*(parseFloat(startrangle)+parseFloat(trangle)).toFixed(4),false);

        context.moveTo(circlex,circley);
        context.closePath();
        context.fillStyle=colors[colorindex];
        context.fill();
        startrangle=parseFloat(startrangle)+parseFloat(trangle);
        colorindex++;
    }
    //将每个数目的百分比推入字典
    var drawpercent=function(percentarray){
        var fonty=10;
        var li=0;
        for(var index in percentarray){
            trangle[index]=percentarray[index];
            context.font="12px Microsoft YaHei";
            context.fillStyle=colors[colorindex];
            var fontpencent=parseFloat(trangle[index]).toFixed(5);

            context.fillText(numberindex[li]+":"+parseFloat(fontpencent*100).toFixed(1)+"%("+sumcount[li]+")",circlex/16,circlex/3+fonty);
            fonty=fonty+25;
            li=li+1;
            drawtrangle(trangle[index]);
        }
    }
    if(judgenumber()){
        var percentdict=countarry(arraynumber());
        drawcircle();
        drawpercent(percentdict);
    }
    else{
        return  "" ;
    }
} ;


