import * as React from 'react';
import { useBasicInfo } from 'src/context/basic-info';
import { FormGroup, InputGroup } from '@blueprintjs/core';

export const Setting = () => {
  const { state, dispatch } = useBasicInfo();
  if (!dispatch) {
    return <div>Loading</div>;
  }
  return (
    <div>
      <h2 className="bp3-heading">設定</h2>
      <FormGroup
        helperText="公司名稱會顯示在出貨單上方"
        label="公司名稱"
        labelFor="company-name"
      >
        <InputGroup
          id="company-name"
          placeholder="xx 有限公司"
          value={state.companyName}
          onChange={e =>
            dispatch({ type: 'CHANGE_COMPANY_NAME', payload: e.target.value })
          }
          required
          maxLength={15}
        />
      </FormGroup>
      <FormGroup label="公司地址" labelFor="company-addr">
        <InputGroup
          id="company-addr"
          placeholder="台南市中區...."
          value={state.address}
          onChange={e =>
            dispatch({ type: 'CHANGE_COMPANY_ADDR', payload: e.target.value })
          }
          maxLength={50}
        />
      </FormGroup>
      <FormGroup label="公司電話" labelFor="company-phone">
        <InputGroup
          id="company-phone"
          placeholder="06-545xxxx"
          value={state.phone}
          onChange={e =>
            dispatch({ type: 'CHANGE_COMPANY_PHONE', payload: e.target.value })
          }
          maxLength={50}
        />
      </FormGroup>
    </div>
  );
};
