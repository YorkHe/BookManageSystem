/**
 *
 * Created by 宇 on 2017/4/8.
 */

$(function () {
    $("#borrow_date").datepicker();
    $("#return_date").datepicker();

    $("#borrow").click(function () {
        var data = {};
        data['b_id'] = $("#book_id").val();
        data['name'] = $("#book_name").val();
        data['r_id'] = $("#r_id").val();
        data['a_id'] = 250;
        data['borrow_date'] = $("#borrow_date").val();
        data['return_date'] = $("#return_date").val();
        $.post("/book/borrow", data, function (data, status) {
            if (data.code == 0)
            {
                alert("借阅成功")
            }else{
                alert("借阅失败， 请重试");
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

