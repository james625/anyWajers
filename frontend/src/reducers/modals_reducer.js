import {OPEN_MODAL, CLOSE_MODAL} from '../actions/modal_actions';

let startState = {type: null, data: null};

const ModalReducer = (state = startState, action) => {
    Object.freeze(state)
    
    switch (action.type) {
        case OPEN_MODAL:
            return {type: action.modal, data: action.data};
        case CLOSE_MODAL:
            return startState;
        default:
            return state;
    }
}

export default ModalReducer;