/**
 * Created by 宇 on 2016/4/28.
 */

var express = require("express");

var admin_route = express.Router();
var admin_model = require('../model/admin');

module.exports = admin_route;

admin_route.post("/add", (req, res) => {
    var data = req.body;

    admin_model.add_admin(data, (err, ret) => {
        if (err) {
            res.json({
                "code": 1,
                "error": err
            });

            return;
        }

        res.json({
            "code": 0
        });
    })
});

admin_route.post("/modify", (req, res) => {
    var data = req.body;

    admin_model.modify_admin(data, (err, ret) => {
        if (err) {
            res.json({
                "code": 1,
                "error": err
            });

            return;
        }

        res.json({
            "code": 0
        });
    });
});

admin_route.post('/login', (req, res) => {
    var data = req.body;
    admin_model.login(data, (err, ret) => {
        if (err) {
            res.json({
                "code": 1,
                "error": err
            });
        }
        if (ret.code == 0) {
            res.cookie("user", ret.name, {});
            res.redirect("/");
        } else {
            res.render("login", {error: "用户名或密码错误"})
        }
    });
});