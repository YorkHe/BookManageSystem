/**
 *
 * Created by 宇 on 2016/4/28.
 *
 */

$(function () {
    $.get("/reader/queryall", function (data, status) {
        if (data.code == 0)
        {
            var ret_data = data["data"];

            for (var i = 0; i < ret_data.length; i++){
                var r1 = $('<tr>'+
                   '<td>'+(i+1)+'</td>'+
                   '<td>'+(ret_data[i].r_id)+'</td>'+
                   '<td>'+(ret_data[i].name)+'</td>'+
                   '<td>'+(ret_data[i].organization)+'</td>'+
                   '<td>'+(ret_data[i].type)+'</td>'+
                    '</tr>');

                $("#user_table").append(r1);
            }
        }else{
            alert("与服务器通信失败");
        }
    });

    $("#add_new").click(function () {
        $("#add_new_modal").modal("show");
    });

    $("#delete_old").click(function () {
        $("#delete_old_modal").modal("show");
    });

    $("#add_new_btn").click(function () {
        var post_data = {};
        post_data['r_id'] = $("#r_id").val();
        post_data['name'] = $("#r_name").val();
        post_data['organization'] = $("#r_organization").val();
        post_data['type'] = $("#r_type").val();

        $.post("/reader/add", post_data, function (data, status) {
            if (data.code == 0)
            {
                alert("新读者添加成功");
                window.location.reload();
            }else{
                alert("新读者添加失败， 请重试");
            }
        });
    });

    $("#delete_old_btn").click(function () {
        var post_data = {};
        post_data['r_id'] = $("#delete_rid").val();
        $.post("/reader/delete", post_data, function (data,status) {
            if (data.code == 0)
            {
                alert("读者删除成功");
                window.location.reload();
            }else{
                alert("读者删除失败， 请重试");
            }
        });
    });

});

