/**
 * Created by 宇 on 2016/4/27.
 */

var express = require('express');

var pool = require('./base');

module.exports = {
    "add_admin" : add_admin,
    "modify_admin" : modify_admin
};

function add_admin(data, cb)
{
    pool.getConnection(function(err, connection){
        connection.query(`INSERT INTO admin
        ('pwd', 'name', 'contact') values (${data.pwd}, ${data.name}, ${data.contact})`,(err, rows)=>{
            if (err)
            {
                console.error(err);
                cb(new Error(err), null);
                return;
            }
            connection.release();
            cb(null, null);
        })
    });
}

function modify_admin(data, cb)
{
    pool.getConnection(function(err, connection){
        connection.query(`UPDATE admin SET pwd = ${data.pwd}, name = ${data.name},
        contact = ${data.contact} WHERE a_id = ${data.a_id}`, (err, rows)=>{
            if (err)
            {
                console.error(err);
                cb(new Error(err), null);
                return;
            }
            connection.release();
            cb(null, null);
        })
    })
}