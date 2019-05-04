
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