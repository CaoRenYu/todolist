var React = require('react');
var Link = require('react-router').Link;

var Test = React.createClass({
    render: function () {
        //console.log(this.props);
        //console.log(this.props.location.query);
        var query = this.props.location.query;
        //console.log(typeof query.text);
        var text = null;
        if (query.text instanceof Array) {
            text = query.text.map(function (item, i) {
                return (
                    <p
                        key={i}
                    >
                        {item}
                    </p>
                )
            })
        }else{
            text = (
                <p>{query.text}</p>
            )
        }
        return (
            <div className="todoapp">
                <h1>List</h1>
                <span>This is a test page</span>
                {text}
                <div className="link">
                    <Link to={{pathname: "/", query: {abc: 1}}}>go back to App</Link>
                </div>
            </div>
        )
    }
});

module.exports = Test;