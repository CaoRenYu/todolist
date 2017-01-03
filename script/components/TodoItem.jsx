var React = require('react');
var ReactRedux = require('react-redux');

var action = require('../action/action.js');

var TodoItem = React.createClass({
    render: function () {
        return (
            <li className={this.props.completed ? "completed" : ""}>
                <div className="view">
                    <input
                        type="checkbox"
                        className="toggle"
                        onChange={this.props.onToggle}
                        checked={this.props.completed}
                    />
                    <label>{this.props.title}</label>
                    <button
                        className="destroy"
                        onClick={this.props.onDestroy}
                    />
                </div>
            </li>
        )
    }
});

TodoItem = ReactRedux.connect(null, function (dispatch, props) {
    //console.log(arguments);
    return {
        onToggle: function () {
            //console.log(props.id);
            dispatch(action.ToggleTodo(props.id));
        },
        onDestroy: function () {
            dispatch(action.DestroyTodo(props.id));
        }
    }
})(TodoItem);

module.exports = TodoItem;