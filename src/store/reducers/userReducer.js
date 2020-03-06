import { createReducer } from '../../util/createReducer';
import { GET_USER_EVENTS } from '../actionTypes';

const initialState = {
  events: []
};

const getUserEvents = (state, payload) => {
  return {
    ...state,
    events: payload.events
  };
};

export default createReducer(initialState, {
  [GET_USER_EVENTS]: getUserEvents
});
