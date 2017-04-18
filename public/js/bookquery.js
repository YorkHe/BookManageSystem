/**
 *
 * Created by 宇 on 2017/4/8.
 */

$(function () {
       $("#book_query").click(function () {

        var data = {};
        data['b_id'] = $("#book_id").val();
        data['name'] = $("#book_name").val();
        data['author'] = $("#book_author").val();
        data['publisher'] = $("#book_publisher").val();
        data['type'] = $("#book_type").val();
        var title = $("<tr>"+
            "<th>序号</th>"+
            "<th>书号</th>"+
            "<th>书名</th>"+
            "<th>类别</th>"+
            "<th>作者</th>"+
            "<th>出版社</th>"+
            "<th>年份</th>"+
            "<th>价格</th>"+
            "<th>总量</th>"+
            "<th>在库数量</th>"+
            "</tr>");

        $("#book_res").empty();
        $("#book_res").append(title);

        $.post("/book/query", data, function (ret, status) {
            console.log(ret);
            if (ret.code == 0)
            {
                var ret_data = ret.data;

                for (var i = 0; i<ret_data.length; i++) {


                    var r1 = $('<tr>' +
                        '<td>' + (i + 1) + '</td>' +
                        '<td>' + (ret_data[i].b_id) + '</td>' +
                        '<td>' + (ret_data[i].name) + '</td>' +
                        '<td>' + (ret_data[i].type) + '</td>' +
                        '<td>' + (ret_data[i].author) + '</td>' +
                        '<td>' + (ret_data[i].publisher) + '</td>' +
                        '<td>' + (ret_data[i].year) + '</td>' +
                        '<td>' + (ret_data[i].price) + '</td>' +
                        '<td>' + (ret_data[i].total) + '</td>' +
                        '<td>' + (ret_data[i].instorage) + '</td>' +
                        '</tr>');

                    console.log(r1);

                    $("#book_res").append(r1[0]);
                }

            }else{
                alert("查询失败， 请重试！")
            }
        });
    }
    );

});