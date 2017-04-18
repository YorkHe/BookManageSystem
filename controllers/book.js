/**
 *
 * Created by 宇 on 2017/4/7.
 */

var express = require("express");


var book_route = express.Router();
var book_model= require('../model/books');

module.exports = book_route;

book_route.post('/add', function (req, res) {
    var data = req.body;
    console.log(data);
    book_model.add_book(data, (err, ret)=>{
        if (err)
        {
            res.json({
                "code": 1,
                "error" : err
            });
            return;
        }

        res.json({
            "code" : 0
        });
    });
});

book_route.post('/borrow', function (req, res) {
    var data = req.body;
    book_model.borrow_book(data, (err, ret)=>{
        if (err)
        {
            res.json({
                "code" : 1,
                "error" : err
            });
            return;
        }

        res.json({
            "code" : 0
        })
    });
});

book_route.post('/return', function (req, res) {
    var data = req.body;
    console.log(data);
    book_model.return_book(data, (err, ret)=>{
        if(err)
        {
            res.json({
                "code" : 1,
                "error": err
            });
            return;
        }
        res.json({
            "code" : 0
        })
    });
});

book_route.post("/query", function (req, res) {
    var data = req.body;
    book_model.query_book(data, (err, ret)=>{
        if (err)
        {
            res.json({
                "code" : 1,
                "error": err
            });
            return;
        }

        if (ret.length != 0)
        {
            res.json({
                "code" : 0,
                "data" : ret
            });
        }else{
            res.json({
                "code": 2,
                "error": "empty response"
            })
        }
    });
});

book_route.get('/query/:id', function (req, res) {
    var data = req.body;
    book_model.query_book_by_id(req.params.id, (err, ret)=>{
        if (err)
        {
            res.json({
                "code" : 1,
                "error" :err
            });
            return;
        }
        if (ret.length != 0)
            res.json({
                "code": 0,
                "data": ret
            });
        else
            res.json({
                "code" : 2,
                "error": "empty response"
            })
    });
});

book_route.get('/total', function (req, res) {
    book_model.get_total((err, ret)=>{
        if (err)
        {
            res.json({
                "code":1,
                "error":err
            });
            return;
        }

        res.json({
            "code" : 0,
            "data" : ret
        })
    })
});

book_route.get("/total_instorage", function (req, res) {
    book_model.get_total_instorage((err, ret)=>{
        if (err){
            res.json({
                "code" : 1,
                "error" : err
            });
            return;
        }

        res.json({
            "code" : 0,
            "data": ret
        })
    });
});