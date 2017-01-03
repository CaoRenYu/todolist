/**
 * Created by cry on 2016/12/30.
 */
var constants = require('../constants.js');
var axios = require('axios');

var action = {
    AddTodo: function (title) {
        return function (dispatch) {
            //向服务器发送请求
            axios({
                //请求类型
                method: 'post',
                //请求地址
                url: '/api/add',
                //发送数据
                data: {
                    title: title
                }
            }).then(function (res) {//.then会在前面方法执行完后再执行
                if (res.status == 200) {
                    dispatch({
                        type: constants.ADD_TODO,
                        title: title,
                        id: res.data.id
                    })
                }
            })
        };
    },
    ToggleTodo: function (id) {
        return function (dispatch) {
            axios({
                method: 'post',
                url: '/api/toggle',
                data: {
                    id: id
                }
            }).then(function (res) {
                dispatch({
                    type: constants.TOGGLE_TODO,
                    id: id
                })
            })
        };
    },
    ToggleALlTodo: function (evt) {
        console.log(evt.target);
        var state = evt.target.checked;
        return function (dispatch) {
            axios({
                method: 'post',
                url: '/api/toggleAll',
                data: {
                    evt: state
                }
            }).then(function (res) {
                dispatch({
                    type: constants.TOGGLE_ALL_TODO,
                    evt: state
                })
            })
        };
    },
    DestroyTodo: function (id) {
        return function (dispatch) {
            axios({
                method: 'post',
                url: '/api/destroy',
                data: {
                    id: id
                }
            }).then(function (res) {
                dispatch({
                    type: constants.DESTROY_TODO,
                    id: id
                })
            })
        };
    },
    ClearTodo: function () {
        return function (dispatch) {
            axios({
                method: 'post',
                url: '/api/clear'
            }).then(function (res) {
                dispatch({
                    type: constants.CLEAR_TODO
                })
            })
        }
    },
    FilterTodo: function (show) {
        return function (dispatch) {
            axios({
                method: 'post',
                url: '/api/filter',
                data: {
                    show: show
                }
            }).then(function (res) {
                dispatch({
                    type: constants.FILTER_TODO,
                    show: res.data.show
                })
            })
        }
    }
};

module.exports = action;