/**
 * Created by cry on 2016/12/30.
 */
var constants = require('../constants.js');

var reducer = function (state, action) {
    if (state.todos == undefined) state.todos =[];
    if (state.show == undefined) state.show = '';
    console.log(state);
    switch (action.type) {
        case constants.ADD_TODO:
            state.todos.push({title: action.title, completed: false, id: action.id});
            break;
        case constants.TOGGLE_TODO:
            for (var i = 0; i < state.todos.length; i++) {
                var item = state.todos[i];
                if (item.id === action.id) {
                    item.completed = !item.completed;
                    break;
                }
            }
            break;
        case constants.TOGGLE_ALL_TODO:
            for (var i = state.todos.length - 1; i >= 0; i--) {
                var item = state.todos[i];
                item.completed = action.evt;
            }
            break;
        case constants.DESTROY_TODO:
            for (var i = 0; i < state.todos.length; i++) {
                var item = state.todos[i];
                if (item.id === action.id) {
                    state.todos.splice(i, 1);
                    break;
                }
            }
            break;
        case constants.CLEAR_TODO:
            for (var i = state.todos.length - 1; i >= 0; i--) {
                var item = state.todos[i];
                if (item.completed) {
                    state.todos.splice(i, 1);
                }
            }
            break;
        case  constants.FILTER_TODO:
            state.show = action.show;
            break;
    }
    console.log(state);
    return Object.assign({}, state);
};

module.exports = reducer;