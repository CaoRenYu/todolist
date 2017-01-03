var React = require('react');
var ReactDOM = require('react-dom');
var Redux = require('redux');
var ReactRedux = require('react-redux');
var ReactRouter = require('react-router');
var Thunk = require('redux-thunk').default;

var window = window || global;
var containerID = 'app';

global.app = {
    AllApp: 'all',
    ActiveApp: 'active',
    CompletedApp: 'completed'
};

var routes = require('./router.jsx');

if (window.document) {
    //浏览器渲染页面
    var reducer = require('./reducer/reducer.js');
    var store = Redux.createStore(reducer, window.__INITIAL_STORE__, Redux.applyMiddleware(Thunk));
    ReactDOM.render(
        <ReactRedux.Provider store={store}>
            <ReactRouter.Router routes={routes} history={ReactRouter.browserHistory}/>
        </ReactRedux.Provider>,
        document.getElementById(containerID)
    );
}else {
    //用于服务器端渲染页面 RouterContext同步渲染route组件
    var Template = React.createClass({
        render: function () {
            var reducer = require('./reducer/reducer.js');
            var store = Redux.createStore(reducer, {todos: this.props.DB, show: this.props.show}, Redux.applyMiddleware(Thunk));
            return (
                <html lang="en">
                <head>
                    <meta charset="UTF-8"/>
                    <title>Title</title>
                    <link rel="stylesheet" href="dest/index.css"/>
                </head>
                <body>
                <div id={containerID}>
                    <ReactRedux.Provider store={store}>
                        <ReactRouter.RouterContext {...this.props.renderProps} />
                    </ReactRedux.Provider>
                </div>
                <script type="text/javascript" dangerouslySetInnerHTML={{__html:'window.__INITIAL_STORE__ = ' + JSON.stringify(store.getState()) + ';'}}></script>
                <script src="dest/index.js"></script>
                </body>
                </html>
            )
        }
    });
}


module.exports = {
    routes: routes,
    template: Template
};