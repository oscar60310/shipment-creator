import * as React from 'react';
import { Select } from '@blueprintjs/select';
import { CustomerInfo, ItemInfo } from '@libs/db';
import {
  Button,
  MenuItem,
  Label,
  Divider,
  InputGroup
} from '@blueprintjs/core';
import { DateInput } from '@blueprintjs/datetime';
import {
  getAllCustomer,
  renderCustomerMenuItem,
  filterCustomer
} from '@libs/customer-db';
import dayjs from 'dayjs';
import { OrderItem } from '@libs/order';
import { renderItemMenuItem, filterItem, getAllItem } from '@libs/items-db';
const tableMiddle = {
  verticalAlign: 'middle'
};
const CustomerSelect = Select.ofType<CustomerInfo>();
const ItemSelect = Select.ofType<ItemInfo>();

export class Creator extends React.Component<
  {},
  {
    customerList: CustomerInfo[];
    itemList: ItemInfo[];
    targetCustomer: CustomerInfo | null;
    date: Date;
    orderItemList: OrderItem[];
  }
> {
  constructor(props) {
    super(props);
    this.state = {
      customerList: [],
      itemList: [],
      targetCustomer: null,
      date: new Date(),
      orderItemList: []
    };
  }
  public componentDidMount() {
    this.loadData();
  }
  public async loadData() {
    const customerList = await getAllCustomer();
    const itemList = await getAllItem();
    this.setState({ customerList, itemList });
    if (customerList.length > 0) {
      this.setState({ targetCustomer: customerList[0] });
    }
  }
  private addItem() {
    this.setState({
      orderItemList: [...this.state.orderItemList, { quantity: 0 }]
    });
  }
  private updateOrderByItemInfo(item: ItemInfo, index: number) {
    const newOrder = [...this.state.orderItemList];
    newOrder[index] = {
      name: item.name,
      unit: item.unit,
      unitPrice: item.price,
      quantity: 0
    };
    this.setState({ orderItemList: newOrder });
  }
  private updateOrder(orderItem: OrderItem, index: number) {
    const newOrder = [...this.state.orderItemList];
    if (newOrder[index].name !== orderItem.name) {
      throw 'Order item name should not change';
    }
    if (newOrder[index].unit !== orderItem.unit) {
      throw 'Order item unit should not change';
    }

    newOrder[index] = {
      ...newOrder[index],
      unitPrice: orderItem.unitPrice,
      quantity: orderItem.quantity
    };
    this.setState({ orderItemList: newOrder });
  }
  private deleteItem(i: number) {
    const newOrder = [...this.state.orderItemList];
    newOrder.splice(i, 1);
    this.setState({ orderItemList: newOrder });
  }
  public render() {
    const {
      customerList,
      targetCustomer,
      date,
      orderItemList,
      itemList
    } = this.state;
    const itemTableList = orderItemList.map((item, i) => {
      return (
        <tr key={i}>
          <td style={tableMiddle}>{i + 1}</td>
          <td>
            {itemList.length > 0 ? (
              <ItemSelect
                items={itemList}
                itemRenderer={renderItemMenuItem}
                onItemSelect={item => this.updateOrderByItemInfo(item, i)}
                itemPredicate={filterItem}
              >
                <Button
                  text={item.name || '請選擇'}
                  rightIcon="double-caret-vertical"
                  style={{ width: '100%' }}
                />
              </ItemSelect>
            ) : (
              <div>沒有建立產品資料</div>
            )}
          </td>
          <td style={tableMiddle}>{item.unit}</td>
          <td style={tableMiddle}>{item.unitPrice}</td>
          <td>
            <InputGroup
              value={item.quantity.toString()}
              type="number"
              onChange={e => {
                this.updateOrder(
                  { ...item, quantity: parseFloat(e.target.value) },
                  i
                );
              }}
            />
          </td>
          <td style={tableMiddle}>
            {item.unitPrice && item.quantity
              ? (item.unitPrice * item.quantity).toFixed(2)
              : '-'}
          </td>
          <td>
            <Button
              intent="danger"
              icon="trash"
              onClick={() => this.deleteItem(i)}
            />
          </td>
        </tr>
      );
    });
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
                  style={{ width: '100%' }}
                />
              </CustomerSelect>
            ) : (
              <div>沒有建立客戶資料</div>
            )}
          </Label>
          <Label style={{ flex: '0 0 200px' }}>
            出貨日期
            <DateInput
              formatDate={date => dayjs(date).format('YYYY/MM/DD')}
              parseDate={str => new Date(str)}
              onChange={e => this.setState({ date: e })}
              value={date}
            />
          </Label>
        </div>
        <Divider />
        <div>
          <Button icon="plus" onClick={this.addItem.bind(this)}>
            新增
          </Button>
          <table
            className="bp3-html-table bp3-html-table-striped"
            style={{ width: '100%' }}
          >
            <thead>
              <tr>
                <th>編號</th>
                <th>品項</th>
                <th>單位</th>
                <th>單價</th>
                <th>數量</th>
                <th>小計</th>
                <th>刪除</th>
              </tr>
            </thead>
            <tbody>{itemTableList}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
