import { INIT_RISK_LIST, SELECT_RISK } from '../actions/types';

const INIT_STATE = {
  riskList: [],
  selectedRisk: null
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case INIT_RISK_LIST:
      return { ...state, riskList: action.payload };
    case SELECT_RISK:
      return { ...state, selectedRisk: action.payload };
    default:
      return state;
  }
}