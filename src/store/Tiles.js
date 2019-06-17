const CHANGE_RENDER = "CHANGE_RENDER";
const CHANGE_LAST_NAME = "CHANGE_LAST_NAME";
const CHANGE_NAME = "CHANGE_NAME";

const initialState = { render: []};

export const actionCreators = {
    changeRender: (out) => {
        return {type: CHANGE_RENDER, payload: out};
    }
}

export const reducer = (state, action) => {
    state = state || initialState;
    switch (action.type) {
        case CHANGE_RENDER: {
            return {...state, render: action.payload};
        }
        
        default: return state;
    }
}