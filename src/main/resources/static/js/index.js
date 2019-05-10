
function findVarietyByType(type,id) {
    $.ajax({
        //几个参数需要注意一下
        type: "post",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        async : false,
        url: "/YqLook/varietyByType" ,//url
        data: {
            type:type
        },
        success: function (result) {
            console.log(result);//打印服务端返回的数据(调试用)
            if(result.code==1){
                var el="";
                for (var n = 0; n < result.data.pageSize; n++)
                {

                    //   console.log(result.data.list[n].name)

                    el =el+ "<div class=\"mod-vd-i \">\n" +
                        "\t\t\t\t\t\t<div class=\"pic\">\n" +
                        "\t\t\t\t\t\t\t<a  href=\"/VarietyDetails.html?name="+ result.data.list[n].name+ "&varietyId="+result.data.list[n].id +  "\" title="+ result.data.list[n].name+">\n" +
                        "\t\t\t\t\t\t\t\t<img src="+ result.data.list[n].picurl+"  class=\"lazy-alpha-start\"/><span class=\"shadow\"><i class=\"tip\"> "+result.data.list[n].update+"</i></span><span class=\"mask\">\n" +
                        "\t\t\t\t\t\t<i class=\"play-btn\"></i>\n" +
                        "\t\t\t\t\t\t</span>\n" +
                        "\t\t\t\t\t\t\t</a>\n" +
                        "\t\t\t\t\t\t</div>\n" +
                        "\t\t\t\t\t\t<div class=\"info\">\n" +
                        "\t\t\t\t\t\t\t<h3 class=\"tit\"><a  href=\"\"  title=\"+ result.data.list[n].name+\">"+ result.data.list[n].name+"</a>\n" +
                        "\t\t\t\t\t\t\t</h3>\n" +
                        "\t\t\t\t\t\t</div>\n" +
                        "\t\t\t\t\t</div>";
                }

                el=el+"<div id=\"page\" class=\"page_div\"></div>"
                var div = document.getElementById(id);
                div.innerHTML=el;
            }
            else{
                swal("哎呀出错了", "", "error");



            }
        },
        error : function(e) {
            // alert("异常！");
            // window.location.href = '/404.html';
            // window.location.href = '/404.html';
            swal("哎呀出错了，要不你稍后再试试？", "", "error");


            // check= "-1";
        }

    });

}


function findCommentByUserid(data) {
    var el="";
    for (var i=0;i<data.length;i++)
    {
        el =el+" <div class=\"comment-list id="+data[i].id+"\">\n" +
            "        <!--<div class=\"comment-info\"><header><img src=\"undefined\"></header><div class=\"comment-right\"><h3 style=\"font-size: 33px\">yang</h3><div class=\"comment-content-header\"><span><i class=\"glyphicon glyphicon-time\"></i>2019-05-1 10:14:51</span></div><p class=\"content\" style=\"font-size: 23px\">555</p><div class=\"comment-content-footer\"><div class=\"row\"><div class=\"col-md-10\"> </div></div><div class=\"reply-list\"></div> </div></div></div>-->\n" +
            "            <div class=\"comment-info\">\n" +
            "            <header>\n" +
            "                <img  style=\"width:90px;height:90px;\" src="+ data[i].picurl+">\n" +
            "            </header>\n" +
            "\n" +
            "            <div class=\"comment-right\">\n" +
            // "            <h3 style=\"font-size: 33px\">"+ data[i].name+"</h3>\n" +
            "            <h3 style=\"font-size: 33px\"><a href='VarietyDetails.html?name="+ data[i].name+"&varietyId="+ data[i].varietyId+" '>"+ data[i].name+"</a></h3>\n" +
            "            <div class=\"comment-content-header\">\n" +
            "            <span><i class=\"glyphicon glyphicon-time\"></i>"+ longTodate(data[i].commentDate)+"<a href=\"javascript:deleteComment('"+data[i].id+" ')\" style=\" left: 96%; position: absolute;\">删除</a></span>\n" +
            "            </div>\n" +
            "            <p class=\"content\" style=\"font-size: 23px\">"+data[i].comment+"</p>\n" +
            "            <div class=\"comment-content-footer\">\n" +
            "            <div class=\"row\">\n" +
            "            <div class=\"col-md-10\">\n" +
            "            </div>\n" +
            "            </div>\n" +
            "            <div class='reply-list'></div>\n" +
            "            </div>\n" +
            "            </div>\n" +
            "            </div>\n" +
            "\n" +
            "\n" +
            "        </div>"
    }
    var div = document.getElementById("mycomment");
    div.innerHTML=el;
}
//<a style='font-size: 20px'   href='VarietyDetails.html?name="+ data[i].varietyName+ "&varietyId="+data[i].varietyId+"'>"+ data[i].varietyName+"</a>

function RatingsByUserid(data) {
    var el="";
    for (var i=0;i<data.length;i++)
    {
        el =el+" <div class=\"comment-list id="+data[i].id+"\">\n" +
            "        <!--<div class=\"comment-info\"><header><img src=\"undefined\"></header><div class=\"comment-right\"><h3 style=\"font-size: 33px\">yang</h3><div class=\"comment-content-header\"><span><i class=\"glyphicon glyphicon-time\"></i>2019-05-1 10:14:51</span></div><p class=\"content\" style=\"font-size: 23px\">555</p><div class=\"comment-content-footer\"><div class=\"row\"><div class=\"col-md-10\"> </div></div><div class=\"reply-list\"></div> </div></div></div>-->\n" +
            "            <div class=\"comment-info\">\n" +
            "            <header>\n" +
            "                <img  style=\"width:90px;height:90px;\" src="+ data[i].picurl+">\n" +
            "            </header>\n" +
            "\n" +
            "            <div class=\"comment-right\">\n" +
            // "            <h3 style=\"font-size: 33px\">"+ data[i].name+"</h3>\n" +
            "            <h3 style=\"font-size: 33px\"><a href='VarietyDetails.html?name="+ data[i].varietyName+"&varietyId="+ data[i].varietyId+" '>"+ data[i].varietyName+"</a></h3>\n" +
            "            <div class=\"comment-content-header\">\n" +
            "            <span><i class=\"glyphicon glyphicon-time\"></i>"+ longTodate(data[i].time)+"<a href=\"javascript:deleteRatings('"+data[i].id+" ')\" style=\" left: 96%; position: absolute;\">删除</a></span>\n" +
            "            </div>\n" +
            "            <p class=\"content\" style=\"font-size: 28px\">&nbsp;<img src=\"images/xing.png\">X"+ data[i].ratings+"</p>\n" +
            "            <div class=\"comment-content-footer\">\n" +
            "            <div class=\"row\">\n" +
            "            <div class=\"col-md-10\">\n" +
            "            </div>\n" +
            "            </div>\n" +
            "            <div class='reply-list'></div>\n" +
            "            </div>\n" +
            "            </div>\n" +
            "            </div>\n" +
            "\n" +
            "\n" +
            "        </div>"
    }
    var div = document.getElementById("mycomment");
    div.innerHTML=el;
}

//搜索
function Searcherall(data) {
    var el="";

        for (var i = 0; i < data.length; i++) {
            el = el + "<div class=\"subject-head fix z-2\">\n" +
                "\n" +
                "\n" +
                "            <div >\n" +
                "                <div>\n" +
                "                    <div class=\"pic\" style=\"float: left;margin-right: 20px\">\n" +
                "                        <img src=" + data[i].picurl + " alt=\"\" class=\"\"  style=\"width: 200px;height: 300px\">                    \t</a>\n" +
                "\n" +
                "                    </div>\n" +
                "                    <div class=\"info\" style=\"float: left;\">\n" +
                "                        <h3 class=\"tit\">\n" +
                "                            <a style=\"font-size: 30px;line-height: 40px\"  target=\"_blank\" class=\"seedplay play-btn-b\" href=\"\" >" + data[i].name + "</a>\n" +
                "                        </h3>\n" +
                "\n" +
                "                        <div class=\"rating fix\"  style=\"margin: 15px 0 10px\">\n" +
                "\n" +
                "                        </div>\n" +
                "                        <div class=\"desc\" style=\"margin: 10px 0;font-size: 14px\">\n" +
                "                            <i>更新时间：</i>\n" +
                "                            <span>\n" +
                "            " + data[i].update + "    \n" +
                "                </span>\n" +
                "                        </div>\n" +
                "                        <div class=\"desc\" style=\"margin: 10px 0;font-size: 14px\">\n" +
                "                            <i>地区：</i>\n";
            for (var j in data[i].area) {
                el = el + "<a href=\"\">" + data[i].area[j] + "</a>&nbsp;\n";
            }

            el = el + "                        </div>\n" +
                "                        <div class=\"desc\" style=\"margin: 10px 0;font-size: 14px\" id=\"type2\">\n" +
                "                            <i>类型：</i>\n";
            for (var j in data[i].type) {
                el = el + "<a href=\"\"  target=\"_blank\" >" + data[i].type[j] + " </a>&nbsp;\n";
            }

            el = el + "                     </div>\n" +
                "\n" +
                "                        <div class=\"desc\" style=\"margin: 10px 0;font-size: 14px\" id=\"fromtvdiv2\">\n" +
                "                            <i>播出频道：</i>\n" +
                "                        \n";
            for (var j in data[i].fromtv) {
                el = el + "<a href=\"\"  target=\"_blank\"> " + data[i].fromtv[j] + "</a>&nbsp;\n";
            }


            el = el + "</div>\n" +
                "                        \n" +
                "                        <div  class=\"btngroup \" style=\"margin: 30px 0 0 0\">\n" +
                "                            <div style=\"position:relative;\" class=\"fix\">\n" +
                "                                <div class=\"op-group fix\">\n" +
                "                                    <button style=\"float: left;width: 120px;height: 35px;background-color: #5FB878;cursor: pointer;color: #fff;border: none;border-radius: 5px\" onclick=\"showTV('" + data[i].btn + "')\" >立即播放</button>\n" +
                "\n" +
                "                                    <div class=\"inner fix\">\n" +
                "\n" +
                "                                        <div class=\"clear\"></div>\n" +
                "                                        <i></i>\n" +
                "\n" +
                "                                    </div>\n" +
                "                                </div>\n" +
                "\n" +
                "                                <div class=\"inner fix\">\n" +
                "\n" +
                "                                    <div class=\"line\">\n" +
                "\n" +
                "                                    </div>\n" +
                "                                    <div class=\"bottom fix\">\n" +
                "                                        <div class=\"qrcode\">\n" +
                "\n" +
                "                                        </div>\n" +
                "\n" +
                "                                    </div>\n" +
                "                                    <i></i>\n" +
                "\n" +
                "                                </div>\n" +
                "                            </div>\n" +
                "                        </div>\n" +
                "                    </div>\n" +
                "                    <div style=\"width: 60%;border-top: 1px solid #ddd;margin: 33px 0\"></div>\n" +
                "\n" +
                "\n" +
                "                </div>\n" +
                "\n" +
                "            </div><br>\n" +
                "        </div>"

    }
    var div = document.getElementById("search");
    div.innerHTML=el;
}


//添加所有名字到下拉列表框
function addAllVariety(data) {
    var el="";
    for (var i = 0; i < data.length; i++) {
        el=el+"<li  class=\"on\"id='"+ data[i].id+"' >    "+data[i].name+" </li>"
    }
    el=el+"<p>无匹配项</p>"

        var div = document.getElementById("allList1");
        div.innerHTML=el;


    }

//显示轮播图
function manageConfigPic(data){
    var el="";
    var n=["item z-1 1","item z-1 2","item z-1 3","item z-1 4","item z-1 5","item z-1 6"];
    for (var i = 0; i < data.length; i++) {
        var j=i+1;
        //\"/VarietyDetails.html?name="+ result.data.list[n].name+ "&varietyId="+result.data.list[n].id +  "\"
        el=el+"<li class='"+n[i]+"' style=\"opacity:1;display:block;\"><a   data-priority='"+j+"'  href='/VarietyDetails.html?name="+data[i].name+"&varietyId="+data[i].varietyId+"' class=\"foc-inner-list\">\n" +
            "\t\t\t\t\t\t\t<img class=\"pic\"  src="+data[i].picurl+"><span class=\"foc-text\">\n" +
            "\t\t\t\t\t\t\t<div class=\"foc-text-wrap\">\n" +
            "\t\t\t\t\t\t\t\t<em class=\"playBtn\"></em>\n" +
            "\t\t\t\t\t\t\t\t<b class=\"tit \">"+data[i].name+"</b><b class=\"info\">"+data[i].detail+"</b>\n" +
            "\t\t\t\t\t\t\t</div>\n" +
            "\t\t\t\t\t\t\t<i class=\"foc-cl\"></i>\n" +
            "\t\t\t\t\t\t\t<i class=\"foc-cr\"></i>\n" +
            "\t\t\t\t\t\t\t</span></a></li>";
    }



    var div = document.getElementById("focusConInner");
    div.innerHTML=el;
    }


//显示爬虫配置表到表格
function showConfigpy(data) {
    var el=" <thead>\n" +
        "                    <tr >\n" +
        "                        <th>视频来源</th>\n" +
        "                        <th>爬取周期</th>\n" +
        "                        <th>爬取状态</th>\n" +
        "                    </tr>\n" +
        "                    </thead>";

    for (var i = 0; i < data.length; i++) {
        if(data[i].id==1) {
            el = el + "<tr>\n" +
                "                        <td>优酷</td>\n";
        }
        if(data[i].id==2){
            el = el + "<tr>\n" +
                "                        <td>芒果TV</td>\n";
        }
        if(data[i].actiontime==1000*60*10)
        {
            el=el+ "                        <td>间隔10分钟</td>\n"
        }
        if(data[i].actiontime==1000*60*30)
        {
            el=el+ "                        <td>间隔30分钟</td>\n"
        }
        if(data[i].actiontime==0)
        {
            el=el+ "                        <td>立即执行（只执行一次）</td>\n"
        }
        if(data[i].actiontime==1000*60*60)
        {
            el=el+ "                        <td>间隔1小时</td>\n"
        }
        if(data[i].actiontime==1000*60*60*12)
        {
            el=el+ "                        <td>间隔12小时</td>\n"
        }
        if(data[i].actiontime==1000*60*60*24)
        {
            el=el+ "                        <td>间隔24小时</td>\n"
        }

        if(data[i].status==1)
        {
            el=el+ "<td>正在执行</td>\n" +
                "\n" +
                "                    </tr>";
        }
        if(data[i].status==0)
        {
            el=el+ "<td>待执行</td>\n" +
                "\n" +
                "                    </tr>";
        }
        if(data[i].status==-1)
        {
            el=el+ "<td>无执行任务</td>\n" +
                "\n" +
                "                    </tr>";
        }
        if(data[i].status==2)
        {
            el=el+ "<td>执行成功</td>\n" +
                "\n" +
                "                    </tr>";
        }

    }

    var div = document.getElementById("table");
    div.innerHTML=el;


}


//显示根据地区、类型查询的结果

function showVarietyByTypeOrArea(data) {
    var el="";
    for (var i = 0; i < data.length; i++) {
    el=el+"<div class=\"mod-vd-i  \">\n" +
        "                    <div class=\"pic\">\n" +
        "                        <a data-gtype=\"variety\" href='/VarietyDetails.html?name="+data[i].name+"&varietyId="+data[i].id+"' title="+data[i].name+" target=\"_blank\" >\n" +
        "                            <img src="+data[i].picurl+" alt="+data[i].name+" class=\"\">\n" +
        "                            <span class=\"shadow\"><i class=\"tip\">"+data[i].update+"</i></span>\n" +
        "                            <span class=\"mask\">\n" +
        "\t\t\t\t\t<i class=\"play-btn\"></i>\n" +
        "\t\t\t\t</span>\n" +
        "                        </a>\n" +
        "                    </div><div class=\"info\">\n" +
        "                    <h3 class=\"tit\">\n" +
        "                        <a href='/VarietyDetails.html?name="+data[i].name+"&varietyId="+data[i].id+"'  title="+ data[i].name+" target=\"_blank\">"+data[i].name+"</a>\n" +
        "                    </h3></div></div>";
    }
    var div = document.getElementById("areaOrtype");
    div.innerHTML=el;
}




