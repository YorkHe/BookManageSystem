/**
 *
 * Created by 宇 on 2017/4/7.
 */

var express = require("express");

var pool = require("./base");

module.exports = {
    "add_book": add_book,
    "borrow_book": borrow_book,
    "return_book": return_book,
    "query_book": query_book,
    "query_book_by_id": query_book_by_id,
    "get_total": get_total,
    "get_total_instorage": get_total_instorage
};

function get_total(cb) {
    pool.getConnection(function (err, connection) {
        connection.query(`SELECT COUNT(*) AS num FROM book`, (err, rows)=> {
            connection.release();
            if (err) {
                console.error(err);
                cb(new Error(err), null);
                return;
            }

            cb(null, rows[0]);
        });
    })
}

function add_book(data, cb) {
    pool.getConnection(function (err, connection) {
        connection.query(`INSERT INTO book
        (\`b_id\`, \`type\`, \`name\`, \`publisher\`, \`year\`, \`author\`, \`price\`, \`total\`, \`instorage\`) values
        ('${data.b_id}', '${data.type}', '${data.name}', '${data.publisher}', '${data.year}', '${data.author}', '${data.price}'
        ,'${data.amount}', '${data.amount}')`, (err, rows)=> {
            if (err) {
                console.error(err);
                cb(new Error(err), null);
                return;
            }
            connection.release();
            cb(null, null);
        })
    });
}

function borrow_book(data, cb) {
    pool.getConnection(function (err, connection) {
        connection.query(`SELECT instorage FROM book WHERE b_id = ${data.b_id}`, (err, rows)=> {
            if (err) {
                cosole.error(err);
            }
            console.log(rows[0]);
            if (rows.length == 0)
            {
                connection.release();
                cb(new Error("No such book"), null);
                return;
            }

            if (rows[0]['instorage'] == '0' || rows[0]['instorage'] == 0) {
                connection.release();
                cb(new Error("No books avalable"), null);
                return;
            }

            connection.query(`INSERT INTO borrow
       (\`r_id\`, \`borrow_date\`, \`return_date\`, \`a_id\`, \`b_id\`) values
       (${data.r_id}, '${data.borrow_date}', '${data.return_date}', ${data.a_id}, ${data.b_id})`
                , (err, rows)=> {
                    if (err) {
                        console.error(err);
                    }
                    connection.query(
                        `UPDATE book SET instorage=instorage-1 WHERE book.b_id = ${data.b_id}`,
                        (err, rows)=> {
                            if (err) {
                                console.error(err);
                                cb(new Error(err), null);
                                return;
                            }
                            connection.release();
                            cb(null, null);
                        }
                    );
                });
        });
    });
}

function return_book(data, cb) {
    pool.getConnection(function (err, connection) {
        console.log(data);
        connection.query(`DELETE from borrow
                        where r_id = ${data.r_id} and b_id = ${data.b_id}`, (err, rows)=> {
            if (err) {
                console.error(err);
            }
            connection.query(`UPDATE book SET instorage=instorage+1 WHERE book.b_id = ${data.b_id}`,
                (err, rows)=> {
                    if (err) {
                        console.error(err);
                        cb(new Error(err), null);
                        return;
                    }
                    connection.release();
                    cb(null, null);
                })
        })
    });
}

function query_book_by_id(data, cb) {
    pool.getConnection(function (err, connection) {
        connection.query(`SELECT * from book where b_id = ${data}`, (err, rows)=> {
            if (err) {
                console.error(err);
                cb(new Error(err), null);
                return;
            }
            connection.release();
            cb(null, rows);
        })
    });
}

function query_book(data, cb) {
    pool.getConnection(function (err, connection) {
        var q_bid = (data.b_id) ? "b_id = '" + data.b_id + "'" : "1=1";
        var q_name = (data.name) ? "name = '" + data.name + "'" : "1=1";
        var q_author = (data.author) ? "author= '" + data.author + "'" : "1=1";
        var q_publisher = (data.publisher) ? "publisher= '" + data.publisher + "'" : "1=1";
        var q_type = (data.type) ? "type= '" + data.type + "'" : "1=1";

        connection.query(`SELECT * from book where ${q_bid} and ${q_name} and ${q_author} and ${q_publisher} and ${q_type}`, (err, rows)=> {
            if (err) {
                console.error(err);
                cb(new Error(err), null);
                return;
            }
            connection.release();
            cb(null, rows);
        });

    });
}

function get_total_instorage(cb) {
    pool.getConnection(function (err, connection) {
        connection.query(`SELECT sum(instorage) AS num FROM book`, (err, rows)=> {
            if (err) {
                console.error(err);
                cb(new Error(err), null);
                return;
            }

            connection.release();
            cb(null, rows[0]);
        });
    })
}

