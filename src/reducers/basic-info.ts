import * as ActionTypes from '../libs/action-types';
import { DeepReadonly } from 'utility-types';

export type BasicInfoState = DeepReadonly<{
  companyName: string;
}>;

const initialState: BasicInfoState = {
  companyName: 'Company Name'
};

export const BasicInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOAD_BASIC_INFO: {
      return action.payload;
    }

    default:
      return state;
  }
};
