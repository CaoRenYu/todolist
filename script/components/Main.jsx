var React = require('react');
var ReactRedux = require('react-redux');
var Link = require('react-router').Link;

var TodoList = require('./TodoList.jsx');
var Cry = require('./cry.jsx');
var Timer = require('./Timer.jsx');

var action = require('../action/action.js');

var Main = React.createClass({
    getInitialState: function () {
        return {
            title: ''
        }
    },

    onKeyDown: function (evt) {
        if (evt.keyCode !== 13) return;
        evt.preventDefault();
        var title = this.state.title.trim();
        if (title) {
            this.props.onAdd(title);
            this.setState({title: ''});
        }
    },

    handleChange: function (evt) {
        this.setState({title: evt.target.value})
    },

    render: function () {
        return (
            <div className="todoapp">
                <header className="header">
                    <Timer/>
                    <h1>todos</h1>
                    <input
                        type="text"
                        className="new-todo"
                        placeholder="What need to do now?"
                        value={this.state.title}
                        onChange={this.handleChange}
                        onKeyDown={this.onKeyDown}
                    />
                    <TodoList/>
                    <Cry/>
                </header>
                <div className="link">
                    <Link to={{pathname: "/test", query: {text: this.props.text, name: 'cry'}}}>go to test page</Link>
                </div>
            </div>
        )
    }
});

Main = ReactRedux.connect(
    function (state) {
        var text = state.todos.map(function (item) {
            if (item.completed) return ("todo" + item.id + ": " + "completed!");
            return ("todo" + item.id + ": " + item.title);
        });
        //console.log(state.todos);
        return {
            text: text
        }
    },
    function (dispatch) {
    return {
        onAdd: function (title) {
            dispatch(action.AddTodo(title))
        }
    }
})(Main);

module.exports = Main;