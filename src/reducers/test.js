import { Map } from "immutable";
import { INCREMENT, DECREMENT } from "../actions/test";

const initialState = Map({
    counter: 0
});

const actions = {
    [INCREMENT]: (state, action) => {
        let prevCounter = state.get('counter');
        return state.merge(Map({
            counter: ++prevCounter
        }));
    },
    [DECREMENT]: (state, action) => {
        let prevCounter = state.get('counter');
        return state.merge(Map({
            counter: --prevCounter
        }));
    }
};

export default function reducer(state = initialState, action) {
    const fn = actions[action.type];
    return fn ? fn(state, action) : state;
}