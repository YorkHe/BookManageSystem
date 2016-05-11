/**
 * Created by 宇 on 2016/4/28.
 */


$(function(){
    $.get("/reader/total", function(data, status){
        if (data.code != null && data.code == 0)
        {
            var reader_num = parseInt(data["data"].num);
            $("#user_total").text(reader_num);
        }
    });

    $.get("/book/total", function (data, status) {
        if (data.code != null && data.code == 0)
        {
            console.log(data['data'].num);
            var book_num = parseInt(data["data"].num);
            $("#book_total").text(book_num);
        }
    });

    $.get("/book/total_instorage", function (data, status) {
        if (data.code != null && data.code == 0)
        {
            var book_instorage = parseInt(data["data"].num);
            $("#instorage_total").text(book_instorage);
        }
    });
});


setInterval(function(){
    $("#current_time").text(moment().format('LTS'));
}, 1000);