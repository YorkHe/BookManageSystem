/**
 *
 * Created by 宇 on 2016/4/27.
 */

var mysql = require("mysql");
var config = require("../config/config");


var pool = mysql.createPool({
    host: config.db_host,
    database: config.db_name,
    user: config.db_username,
    password: config.db_userpass
});


module.exports = pool;