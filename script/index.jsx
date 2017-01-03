var React = require('react');
var ReactDOM = require('react-dom');
var Redux = require('redux');
var ReactRedux = require('react-redux');
var ReactRouter = require('react-router');

var reducer = require('./reducer/reducer.js');
var store = Redux.createStore(reducer);

var Main = require('./components/Main.jsx');
var Test = require('./page/Test.jsx');

global.app = {
    AllApp: 'all',
    ActiveApp: 'active',
    CompletedApp: 'completed'
};

//<ReactRouter.Route path="/" component={Main} />
//<ReactRouter.Route path="/test" component={Test} />

var Provider = (
    <ReactRedux.Provider store={store}>
        <ReactRouter.Router history={ReactRouter.hashHistory}>
            <ReactRouter.Route path="/">
                <ReactRouter.IndexRoute component={Main}/>
                <ReactRouter.Route path="test" component={Test}/>
            </ReactRouter.Route>
        </ReactRouter.Router>
    </ReactRedux.Provider>
);

ReactDOM.render(Provider, document.getElementById('app'));