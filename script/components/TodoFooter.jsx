var React = require('react');
var ReactRedux = require('react-redux');

var action = require('../action/action.js');

var TodoFooter = React.createClass({

    render: function () {
        var ClearCompleted = this.props.completedCount > 0 ?
            (
                <bottn
                    className="clear-completed"
                    onClick={this.props.onClear}
                >Clear completed</bottn>
            ) : null;
        return (
            <div className="footer">
                <span className="todo-count">
                    {this.props.activeCount}&nbsp;
                    {this.props.activeCount > 1 ? "items" : "item"}&nbsp;
                    left
                </span>
                <ul className="filters">
                    <li><a
                        href="javascript: void (0)"
                        className={this.props.show === app.AllApp ? 'selected' : ''}
                        onClick={this.props.onFilter.bind(this, 'all')}
                    >All</a></li>
                    <li><a
                        href="javascript: void (0)"
                        className={this.props.show === app.ActiveApp ? 'selected' : ''}
                        onClick={this.props.onFilter.bind(this, app.ActiveApp)}
                    >Active</a></li>
                    <li><a
                        href="javascript: void (0)"
                        className={this.props.show === app.CompletedApp ? 'selected' : ''}
                        onClick={this.props.onFilter.bind(this, app.CompletedApp)}
                    >Completed</a></li>
                </ul>
                {ClearCompleted}
            </div>
        )
    }
});

TodoFooter = ReactRedux.connect(
    function (state) {
        return {
            show: state.show
        }
    },
    function (dispatch) {
    return {
        onClear: function () {
            dispatch(action.ClearTodo())
        },
        onFilter: function (show) {
            console.log(show)
            dispatch(action.FilterTodo(show))
        }
    }
})(TodoFooter);

module.exports = TodoFooter;