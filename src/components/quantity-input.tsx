import React from 'react';
import { InputGroup } from '@blueprintjs/core';
const tableMiddle = {
  verticalAlign: 'middle'
};
export const QuantityInput = (props: {
  value: string;
  unit: string | undefined;
  onFinish: (args: string) => void;
}) => {
  if (props.unit === '斤') {
    let u1 = '0';
    let u2 = '0';
    const pattern = /(\d+)斤(\d+)兩/;
    if (pattern.test(props.value)) {
      const re = pattern.exec(props.value);
      if (!re) throw 'parse error';
      u1 = re[1];
      u2 = re[2];
    }
    return (
      <div style={{ display: 'flex' }}>
        <InputGroup
          value={u1}
          type="number"
          onChange={e => {
            if (isNaN(e.target.value) || e.target.value.length === 0) return;
            props.onFinish(`${e.target.value}斤${u2}兩`);
          }}
        />
        <div style={{ ...tableMiddle, margin: 'auto 5px' }}>斤</div>
        <InputGroup
          value={u2}
          type="number"
          onChange={e => {
            if (isNaN(e.target.value) || e.target.value.length === 0) return;
            props.onFinish(`${u1}斤${e.target.value}兩`);
          }}
        />
        <div style={{ ...tableMiddle, margin: 'auto 5px' }}>兩</div>
      </div>
    );
  }
  return (
    <InputGroup
      defaultValue={props.value}
      type="number"
      onChange={e => {
        props.onFinish(e.target.value);
      }}
    />
  );
};
