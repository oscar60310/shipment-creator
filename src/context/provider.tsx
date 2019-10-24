import React from 'react';
import { BasicInfoProvider } from './basic-info';

export const Provider = props => {
  return <BasicInfoProvider>{props.children}</BasicInfoProvider>;
};
