var React = require('react');

var Timer = React.createClass({

    getInitialState: function () {
        return {secondsElapsed: new Date()}
    },
    tick: function () {
        //setState方法会在state改变时，重新渲染页面
        this.setState({secondsElapsed: new Date()});
    },
    //HTML已经加载时调用的方法(每秒执行一次this.tick)
    componentDidMount: function () {
        this.interval = setInterval(this.tick, 1000);
    },
    //HTML即将卸载时调用的方法
    componentWillUnmount: function () {
        clearInterval(this.interval);
    },

    render: function () {
        var today = this.state.secondsElapsed;
        var year = today.getFullYear();
        var month = (today.getMonth() + 1) > 9 ? (today.getMonth() + 1) : '0' + (today.getMonth() + 1);
        var date = today.getDate();
        var hours = today.getHours() > 9 ? today.getHours() : '0' + today.getHours();
        var minutes = today.getMinutes() > 9 ? today.getMinutes() : '0' + today.getMinutes();
        var seconds = today.getSeconds() > 9 ? today.getSeconds() : '0' + today.getSeconds();
        return (
            <div className="time">
                <p><strong>{hours}:{minutes}:{seconds}</strong></p>
                <p>{year}/{month}/{date}</p>
            </div>
        )
    }
});

module.exports = Timer;