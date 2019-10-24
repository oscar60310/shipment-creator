import * as React from 'react';
import * as db from '@libs/customer-db';
import {
  Button,
  ControlGroup,
  InputGroup,
  FormGroup,
  Card,
  Elevation
} from '@blueprintjs/core';
import { CustomerInfo } from '@libs/db';

export class Customer extends React.Component<
  {},
  { customerList: CustomerInfo[] }
> {
  constructor(props) {
    super(props);
    this.state = {
      customerList: []
    };
  }
  private async loadCustomer() {
    const list = await db.getAllCustomer();
    this.setState({ customerList: list });
  }
  public componentDidMount() {
    this.loadCustomer();
  }
  public async addCustomer() {
    await db.addNewCustomer();
    await this.loadCustomer();
  }
  public async deleteCustomer(id: number | undefined) {
    if (id == undefined) return;
    await db.deleteCustomer(id);
    await this.loadCustomer();
  }
  public async updateCustomer(data: CustomerInfo) {
    await db.updateCustomer(data);
    await this.loadCustomer();
  }
  public render() {
    const customerDisplay = (data: CustomerInfo) => {
      return (
        <div key={data.id} style={{ margin: '10px 0' }}>
          <Card elevation={Elevation.TWO}>
            <div>
              客戶編號: {data.id} 客戶名稱: {data.name}
            </div>
            <ControlGroup fill vertical={false}>
              <FormGroup label="名稱" labelFor={`customer-${data.id}-name`}>
                <InputGroup
                  id={`customer-${data.id}-name`}
                  placeholder="xx餐廳"
                  onChange={e =>
                    this.updateCustomer({ ...data, name: e.target.value })
                  }
                  defaultValue={data.name}
                />
              </FormGroup>
              <FormGroup label="地址" labelFor={`customer-${data.id}-address`}>
                <InputGroup
                  id={`customer-${data.id}-address`}
                  placeholder="台南市中區xxxxx"
                  onChange={e =>
                    this.updateCustomer({ ...data, address: e.target.value })
                  }
                  defaultValue={data.address}
                />
              </FormGroup>
            </ControlGroup>
            <Button
              intent="danger"
              onClick={() => this.deleteCustomer(data.id)}
            >
              刪除
            </Button>
          </Card>
        </div>
      );
    };
    return (
      <div>
        <h2 className="bp3-heading">客戶列表</h2>
        <Button icon="plus" onClick={this.addCustomer.bind(this)}>
          新增
        </Button>
        <div>{this.state.customerList.map(x => customerDisplay(x))}</div>
      </div>
    );
  }
}
