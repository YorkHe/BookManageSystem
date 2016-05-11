/**
 *
 * Created by 宇 on 2016/4/28.
 */

$(function () {
    $("#return").click(function () {
        var data = {};
        data['b_id'] = $("#book_id").val();
        data['r_id'] = $("#r_id").val();
        $.post("/book/return", data, function (data, status) {
            if (data.code == 0)
            {
                alert("归还成功")
            }else{
                alert("归还失败， 请重试");
            }
        });
    });

    $("#history").click(function () {
        var data = {};
        data['r_id'] = $("#query_id").val();
        console.log(data['r_id']);
        var title = $("<tr>"+
            "<th>序号</th>"+
            "<th>流水号</th>"+
            "<th>书名</th>"+
            "<th>借阅日期</th>"+
            "<th>归还日期</th>"+
            "<th>经办人</th>"+
            "</tr>");

        $("#query_result").empty();
        $("#query_result").append(title);


        $.get("/reader/query_history/"+data['r_id'], function (data, status) {
            if (data.code == 0)
            {
                res = data.data;
                console.log(res);
                for (var i = 0; i < res.length; i++)
                {
                    var r1 = $('<tr>'+
                        '<td>'+(i+1)+'</td>'+
                        '<td>'+(res[i].c_id)+'</td>'+
                        '<td>'+(res[i].name)+'</td>'+
                        '<td>'+(res[i].borrow_date)+'</td>'+
                        '<td>'+(res[i].return_date)+'</td>'+
                        '<td>'+(res[i].a_id)+'</td>'+
                                    '</tr>');

                    $("#query_result").append(r1);
                }

                $("#user_query_result").modal("show");
                console.log(data);
            }else{
                alert("查询失败, 请重试");
            }
        })
    });
});

