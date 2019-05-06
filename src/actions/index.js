import {
  INIT_RISK_LIST,
  SELECT_RISK
} from './types';

export const initRiskList = riskList => {
  return {
    type: INIT_RISK_LIST,
    payload: riskList 
  }
}

export const selectRisk = risk => {
  return {
    type: SELECT_RISK,
    payload: risk
  }
}