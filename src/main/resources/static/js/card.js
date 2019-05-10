function getMonth(date){
    var month = "";
    month = date.getMonth() + 1; //getMonth()得到的月份是0-11
    if(month<10){
        month = "0" + month;
    }
    return month;
}
//返回01-30的日期
function getDay(date){
    var day = "";
    day = date.getDate();
    if(day<10){
        day = "0" + day;
    }
    return day;
}
//删除cookies
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = this.getCookie(name);
    if(cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

//取cookies
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if(arr = document.cookie.match(reg)) {
        return unescape(arr[2]);
    } else {
        return null;
    }
}
// 输入long 时间类型返回yyyy-MM-dd格式日期
function dateFormat_2(longTypeDate){
    var dateType = "";
    var date = new Date();
    date.setTime(longTypeDate);
    dateType = date.getFullYear()+"-"+getMonth(date)+"-"+getDay(date);//yyyy-MM-dd格式日期
    return dateType;
}
//将yyyy-MM-dd格式日期转为long
function dateTolong(date) {
    var moveInArray = date.split('-');
    var d = new Date();
    d.setYear(moveInArray[0]);
    d.setMonth(moveInArray[1]-1);
    d.setDate(moveInArray[2]);
    var moveIn = d.getTime();
    return moveIn;
}

//将long转为时间
function longTodate(date1) {
    var dateType = "";
    var date = new Date(date1);
    dateType = date.getFullYear() + "-" +getMonth(date)+ "-" + getDay(date)+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();//yyyy-MM-dd格式日期
    return dateType;
}
//从url上获取参数
function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}

//退出登录到index
function exitlogin(){
    var userid=getCookie("userid");
    // console.log(getCookie("token"));
    $.ajax({
        //几个参数需要注意一下
        type: "post",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: "/API/exit" ,//url
        data: {
            userid:userid
        },
        success: function (result) {
            console.log(result);//打印服务端返回的数据(调试用)
            if (result.code == 1) {
                delCookie("token");
                delCookie("name");
                delCookie("userid");

                // window.history.back(-1);
                window.location.href = '/index.html';
            }
            if(result.code==-1){
                window.location.href = '/index.html';
            }
            ;
        },
        error : function(e) {
            alert("异常！");
            window.location.href = '/index.html';
        }
    });

    // location.replace(document.referrer);返回上一个页面并刷新
    // window.location.href = '/index.html';
}


function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();

}


//退出登录到登录页
function exitTologin(){
    var userid=getCookie("userid");
    // console.log(getCookie("token"));
    $.ajax({
        //几个参数需要注意一下
        type: "post",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: "/API/exit" ,//url
        data: {
            userid:userid
        },
        success: function (result) {
            console.log(result);//打印服务端返回的数据(调试用)
            if (result.code == 1) {
                delCookie("token");
                delCookie("name");
                delCookie("userid");
                // window.location.href = '/login.html';
                window.history.back(-1);
            }
            if(result.code==-1){
                window.location.href = '/login.html';
            }
            ;
        },
        error : function(e) {

            window.location.href = '/login.html';
        }
    });

    // location.replace(document.referrer);返回上一个页面并刷新
    // window.location.href = '/index.html';
}

//根据类型猜你喜欢
function guessBytype(type) {


}