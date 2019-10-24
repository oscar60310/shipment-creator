import React from 'react';

export interface BasicInfo {
  companyName: string;
  phone: string;
  address: string;
}
const configString = localStorage.getItem('basic-config');
const initState: BasicInfo = configString
  ? JSON.parse(configString)
  : {
      companyName: 'Company Name',
      phone: '',
      address: ''
    };

const reducer = (state: BasicInfo, action) => {
  let newState = state;
  switch (action.type) {
    case 'CHANGE_COMPANY_NAME':
      newState = { ...state, companyName: action.payload };
      break;
    case 'CHANGE_COMPANY_PHONE':
      newState = { ...state, phone: action.payload };
      break;
    case 'CHANGE_COMPANY_ADDR':
      newState = { ...state, address: action.payload };
      break;
    case 'LOAD_CONFIG':
      const s = localStorage.getItem('basic-config');
      if (s) {
        newState = JSON.parse(s);
      }
      break;
  }
  localStorage.setItem('basic-config', JSON.stringify(newState));
  return newState;
};
const BasicInfoContext = React.createContext<{
  state: BasicInfo;
  dispatch?: React.Dispatch<{ type: string; payload: any }>;
}>({
  state: initState
});
export const BasicInfoProvider = props => {
  const [state, dispatch] = React.useReducer(reducer, initState);
  return (
    <BasicInfoContext.Provider value={{ state, dispatch }}>
      {props.children}
    </BasicInfoContext.Provider>
  );
};

export const useBasicInfo = () => {
  const contextValue = React.useContext(BasicInfoContext);
  return contextValue;
};
