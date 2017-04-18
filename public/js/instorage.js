/**
 *
 * Created by 宇 on 2017/4/7.
 */

$(function () {
    $("#instorage").click(function () {
        var data = {};
        data['b_id'] = parseInt($("#book_id").val());
        data['type'] = $("#book_type").val();
        data['name'] = $("#book_name").val();
        data['author'] = $("#book_author").val();
        data['publisher'] = $("#book_publisher").val();
        data['year'] = $("#book_year").val();
        data['price'] = parseFloat($("#book_price").val());
        data['amount'] = parseInt($("#book_amount").val());

        console.log(data);
        $.post("/book/add", data, function (data, status) {
            if (data['code'] == 1)
            {
                alert(data.error.toString());
            }
            else if (data['code'] == 0)
            {
                alert("图书入库成功");
            }
        }, "json");
    });
});

function handleFiles(file)
{
    var fileReader = new FileReader();
    fileReader.readAsText(file[0]);
    var file_content = fileReader.result;
    fileReader.onload = function () {
        parseInput(fileReader.result);
    };
}

function parseInput(content)
{
    var books = content.split('\r\n');
    books.forEach(function (book, index) {
        var data = {};
        console.log(book);
        var book_property = book.split(' ');
        data['b_id'] = book_property[0];
        data['type'] = book_property[1];
        data['name'] = book_property[2];
        data['publisher'] = book_property[3];
        data['year'] = book_property[4];
        data['author'] = book_property[5];
        data['price'] = book_property[6];
        data['amount'] = book_property[7];

        var r1 = $('<tr>' +
                        '<td>' + (index + 1) + '</td>' +
                        '<td>' + (data.b_id) + '</td>' +
                        '<td>' + (data.name) + '</td>' +
                        '<td>' + (data.type) + '</td>' +
                        '<td>' + (data.author) + '</td>' +
                        '<td>' + (data.publisher) + '</td>' +
                        '<td>' + (data.year) + '</td>' +
                        '<td>' + (data.price) + '</td>' +
                        '<td>' + (data.amount) + '</td>' +
                        '</tr>');

                    console.log(r1);

                    $("#file_res").append(r1[0]);

        $.post("/book/add", data, function (data, status) {
            if (index == books.length - 1) {
                if (data['code'] == 1) {
                    alert("图书入库失败");
                }
                else if (data['code'] == 0) {
                    alert("图书入库成功");
                }
            }
        }, "json");
    });
}


