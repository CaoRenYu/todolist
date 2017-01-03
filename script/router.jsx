var React = require('react');
var ReactRouter = require('react-router');

var Main = require('./components/Main.jsx');
var Test = require('./page/Test.jsx');

var routes = {
    path: '/',
    indexRoute: {component: Main},
    childRoutes: [
        {path: 'test', component: Test}
    ]
};

module.exports = routes;