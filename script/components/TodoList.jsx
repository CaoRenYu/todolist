var React = require('react');
var ReactRedux = require('react-redux');

var action = require('../action/action.js');

var TodoItem = require('./TodoItem.jsx');
var TodoFooter = require('./TodoFooter.jsx');

var id = 0;

var TodoList = React.createClass({

    render: function () {
        var todos = this.props.db.filter(function (item) {
            //console.log(this.props.db,this.props.show);
            switch (this.props.show) {
                case app.ActiveApp:
                    return !item.completed;
                case app.CompletedApp:
                    return item.completed;
                default:
                    return true;
            }
        }.bind(this));
        todos = todos.map(function (item) {
            //console.log(item.completed);
            return (
                <TodoItem
                    key={item.id}
                    title={item.title}
                    completed={item.completed}
                    id={item.id}
                />
            );
        });



        var footer = this.props.db.length > 0 ?
            (
                <TodoFooter
                    activeCount={this.props.activeCount}
                    completedCount={this.props.completedCount}
                />
            ) : null;

        return (
            <section className="todo-main">
                <input
                    type="checkbox"
                    className="toggle-all"
                    onChange={this.props.onToggleAll}
                />
                <ul className="todo-list">
                    {todos}
                </ul>
                {footer}
            </section>
        )
    }
});

TodoList = ReactRedux.connect(
    function (state) {
        var activeCount = state.todos.reduce(function (count, todo) {
            return todo.completed ? count : (count + 1);
        }, 0);
        var completedCount = state.todos.length - activeCount;
        console.log(state)
        return {
            db: state.todos,
            count: state.todos.length,
            show: state.show,
            activeCount: activeCount,
            completedCount: completedCount
        }
    },
    function (dispatch) {
        return {
            onToggleAll: function (evt) {
                dispatch(action.ToggleALlTodo(evt));
            }
        }
    }
)(TodoList);

module.exports = TodoList;