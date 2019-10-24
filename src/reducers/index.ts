import { BasicInfoState, BasicInfoReducer } from './basic-info';
import { combineReducers } from 'redux';

export interface RootState {
  BasicInfo: BasicInfoState;
}
export const RootReducer = combineReducers({
  BasicInfo: BasicInfoReducer
});
