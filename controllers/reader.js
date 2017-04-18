/**
 *
 * Created by 宇 on 2017/4/8.
 */

var express = require('express');

var reader_route = express.Router();
var reader_model= require('../model/reader');

module.exports = reader_route;

reader_route.get("/total", (req, res)=>{
    reader_model.get_total((err, ret)=>{
        if (err) {
            res.json({
                "code" : 1,
                "error" : err
            });

            return;
        }
        res.json({
            "code" : 0,
            "data" : ret
        })
    })
});


reader_route.post("/add", (req, res)=>{
    var data = req.body;
    reader_model.add_reader(data, (err, ret)=>{
        if (err){
            res.json({
                "code" : 1,
                "error" : err
            });

            return;
        }

        res.json({
            "code" : 0
        })
    })
});

reader_route.post('/delete', (req, res)=>{
    var data = req.body;
    reader_model.del_reader(data, (err, ret)=>{
        if (err){
            res.json({
                "code" : 1,
                "error" : err
            });
            return;
        }

        res.json({
            "code" : 0
        });
    })
});

reader_route.post("/query", (req, res)=>{
    var data = req.body;

    reader_model.query_one_reader(data, (err, ret)=>{
        if (err){
            res.json({
                "code" : 1,
                "error" : err
            });
            return;
        }

        res.json({
            "code" : 0,
            "data" : ret
        })
    })
});

reader_route.get("/queryall", (req, res)=>{
    reader_model.query_all_reader((err, ret)=>{
        if (err){
            res.json({
                "code" : 1,
                "error" : err
            });
            return;
        }

        res.json({
            "code" : 0,
            "data" : ret
        })
    })
});

reader_route.get("/query_history/:id", (req, res)=>{
    var id = req.params.id;
    reader_model.query_all_history(id, (err, ret)=>{
        if (err){
            res.json({
                "code" : 1,
                "error": err
            });

            return;
        }

        res.json({
            "code": 0,
            "data" : ret
        })
    });
});

