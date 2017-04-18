/**
 * Created by 宇 on 2017/4/7.
 */

var express = require('express');

var pool = require('./base');

module.exports = {
    "add_reader" : add_reader,
    "del_reader" : del_reader,
    "query_one_reader" : query_one_reader,
    "query_all_reader" : query_all_reader,
    "get_total" : get_total,
    "query_all_history": query_all_history
};

function get_total(cb)
{
    pool.getConnection((err, connection)=>{
        connection.query(`SELECT COUNT(*) AS num from reader`, (err, rows)=>{
            if (err)
            {
                console.error(err);
                cb(new Error(err), null);
                return;
            }
            connection.release();
            cb(null, rows[0]);
        })
    })
}

function del_reader(data, cb)
{
    pool.getConnection((err, connection)=>{
        connection.query(`SELECT * FROM borrow where r_id = '${data.r_id}'`, (err, rows)=>{
            if (err)
            {
                console.error(err);
                return;
            }

            if (rows.length != 0)
            {
                cb(new Error("Still Books Unreturned"), null);
                return;
            }

            connection.query(`DELETE FROM reader where r_id = '${data.r_id}'`, (err, rows)=>{
                if (err)
                {
                    console.error(err);
                    cb(new Error(err), null);
                    return;
                }
                connection.release();
                cb(null, rows[0]);
            });
        });
    });
}


function add_reader(data, cb)
{
    pool.getConnection((err, connection)=>{
        connection.query(`INSERT INTO reader
        (\`r_id\`,\`name\`, \`organization\`, \`type\`) values
        ('${data.r_id}', '${data.name}', '${data.organization}', '${data.type}')`, (err, rows)=>{
            if (err)
            {
                console.error(err);
                cb(new Error(err), null);
                return;
            }
            connection.release();
            cb(null, null);
        });
    })
}

function query_one_reader(data, cb)
{

    var q_rid = (data.r_id)?"r_id = '" + data.r_id+"'":"1=1";
    var q_name= (data.name)?"name = '" + data.name+"'":"1=1";
    var q_type= (data.type)?"type= '" + data.type+"'":"1=1";
    var q_organization= (data.organization)?"organization= '" + data.organization+"'":"1=1";


    pool.getConnection((err, connection)=>{
        connection.query(`SELECT * FROM reader where ${q_rid} and ${q_name} and ${q_type} and ${q_organization}`, (err, rows)=>{
            if (err)
            {
                console.error(err);
                cb(new Error(err), null);
                return;
            }
            connection.release();
            cb(null, rows);
        })
    })
}

function query_all_reader(cb)
{
    pool.getConnection((err, connection)=>{
        connection.query(`SELECT * FROM reader`, (err, rows)=>{
            if (err)
            {
                console.error(err);
                cb(new Error(err), null);
                return;
            }
            connection.release();
            cb(null, rows);
        });
    });
}

function query_all_history(data, cb)
{
    pool.getConnection((err, connection)=>{
        connection.query(`SELECT r_id, name, borrow_date, return_date, a_id FROM book, borrow WHERE book.b_id = borrow.b_id and borrow.r_id = ${data}`, (err, rows)=>{
            if (err)
            {
                console.error(err);
                cb(new Error(err), null);
                return;
            }

            connection.release();
            cb(null, rows);
        })
    });
}

