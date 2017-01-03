/**
 * Created by cry on 2016/12/30.
 */
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = 3000;

var React = require('react');
var ReactRouter = require('react-router');
var ReactDOMServer = require('react-dom/server');

//从index.js里获取template.jsx中的routes和template
var Application = require('./www/dest/index.js');

var DB = [];
var id = 0;
global.DB = DB;
global.show = '';

//中间件
app.use(require('connect-livereload')());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//根目录
app.use('/', express.static('www'));

/*api start*/
//向服务器添加数据,并返回id，客户端发送的数据都在req.body中存储
app.post('/api/add', function (req, res) {
    var item = {title: req.body.title, completed: false, id: ++id};
    DB.push(item);
    res.send(JSON.stringify({state: 'success', id: id}))
});

//向服务器发送id
app.post('/api/toggle', function (req, res) {
    for (var i = 0; i < DB.length; i++) {
        var item = DB[i];
        if (item.id === req.body.id) {
            item.completed = !item.completed;
            break;
        }
    }
    res.send(JSON.stringify({state: 'success'}));
});

//向服务器发送触发事件
app.post('/api/toggleAll', function (req, res) {
    for (var i = DB.length - 1; i >= 0; i--) {
        var item = DB[i];
        item.completed = req.body.evt;
    }
    res.send(JSON.stringify({state: 'success'}));
});

//
app.post('/api/destroy', function (req, res) {
    for (var i = 0; i < DB.length; i++) {
        var item = DB[i];
        if (item.id === req.body.id) {
            DB.splice(i, 1);
            break;
        }
    }
    res.send(JSON.stringify({state: 'success'}));
});

//
app.post('/api/clear', function (req, res) {
    for (var i = DB.length - 1; i >= 0; i--) {
        var item = DB[i];
        if (item.completed) {
         DB.splice(i, 1);
        }
    }
    res.send(JSON.stringify({state: 'success'}));
});

//
app.post('/api/filter', function (req, res) {
    show = req.body.show;
    res.send(JSON.stringify({state: 'success', show: show}));
});


//api end



//处理所有请求
app.get('/*', function (req, res) {
    //match 在渲染之前根据 location 匹配 route
    ReactRouter.match({routes: Application.routes, location: req.url}, function (error, redirectLocation, renderProps) {
        if (error) {//报错
            res.status(500).send(error.message)
        } else if (redirectLocation) {// route 重定向
            res.redirect(302, redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {//当匹配到 route 时 props 应该通过路由的 context
            //html页面
            var html = "<!DOCTYPE html>";
            html += ReactDOMServer.renderToStaticMarkup(React.createElement(Application.template, {URl: req.url, DB: DB, show: show, renderProps: renderProps}));
            res.status(200).send(html);
        } else {
            res.status(404).send('Not found');
        }
    });
});

app.listen(port);
console.log('app start at : ', port);