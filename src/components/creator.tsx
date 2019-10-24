import * as React from 'react';
import { Select } from '@blueprintjs/select';
import { CustomerInfo } from '@libs/db';
import { Button, MenuItem, Label } from '@blueprintjs/core';
import {
  getAllCustomer,
  renderCustomerMenuItem,
  filterCustomer
} from '@libs/customer-db';

const CustomerSelect = Select.ofType<CustomerInfo>();

export class Creator extends React.Component<
  {},
  {
    customerList: CustomerInfo[];
    targetCustomer: CustomerInfo | null;
  }
> {
  constructor(props) {
    super(props);
    this.state = {
      customerList: [],
      targetCustomer: null
    };
  }
  public componentDidMount() {
    this.loadData();
  }
  public async loadData() {
    const customer = await getAllCustomer();
    this.setState({ customerList: customer });
    if (customer.length > 0) {
      this.setState({ targetCustomer: customer[0] });
    }
  }

  public render() {
    const { customerList, targetCustomer } = this.state;
    return (
      <div>
        <h2 className="bp3-heading">建立出貨單</h2>
        <div style={{ display: 'flex', width: '100%' }}>
          <Label style={{ flex: '1 1 0' }}>
            客戶
            {customerList.length > 0 ? (
              <CustomerSelect
                items={customerList}
                itemRenderer={renderCustomerMenuItem}
                onItemSelect={item => {
                  this.setState({ targetCustomer: item });
                }}
                itemPredicate={filterCustomer}
              >
                <Button
                  text={targetCustomer ? targetCustomer.name : ''}
                  rightIcon="double-caret-vertical"
                />
              </CustomerSelect>
            ) : (
              <div>沒有建立客戶資料</div>
            )}
          </Label>
        </div>
      </div>
    );
  }
}
