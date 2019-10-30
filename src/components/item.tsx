import * as React from 'react';
import * as db from '@libs/items-db';
import {
  Button,
  ControlGroup,
  InputGroup,
  FormGroup,
  Card,
  Elevation
} from '@blueprintjs/core';
import { ItemInfo } from '@libs/db';

export class ItemManager extends React.Component<{}, { itemList: ItemInfo[] }> {
  constructor(props) {
    super(props);
    this.state = {
      itemList: []
    };
  }
  private async loadItem() {
    const list = await db.getAllItem();
    this.setState({ itemList: list });
  }
  public componentDidMount() {
    this.loadItem();
  }
  public async addItem() {
    await db.addNewItem();
    await this.loadItem();
  }
  public async deleteItem(id: number | undefined) {
    if (id == undefined) return;
    await db.deleteItem(id);
    await this.loadItem();
  }
  public async updateItem(data: ItemInfo) {
    await db.updateItem(data);
    await this.loadItem();
  }
  public render() {
    const itemDisplay = (data: ItemInfo) => {
      return (
        <div key={data.id} style={{ margin: 5, width: 'calc(50% - 10px)' }}>
          <Card elevation={Elevation.TWO}>
            <div>編號: {data.id}</div>
            <ControlGroup fill vertical={false}>
              <FormGroup label="名稱" labelFor={`Item-${data.id}-name`}>
                <InputGroup
                  id={`Item-${data.id}-name`}
                  placeholder="胡蘿蔔"
                  onChange={e =>
                    this.updateItem({ ...data, name: e.target.value })
                  }
                  defaultValue={data.name}
                />
              </FormGroup>
              <FormGroup
                label="單位"
                labelFor={`Item-${data.id}-unit`}
                style={{ flexBasis: 60, flexShrink: 0 }}
              >
                <InputGroup
                  id={`Item-${data.id}-unit`}
                  placeholder="斤"
                  onChange={e =>
                    this.updateItem({ ...data, unit: e.target.value })
                  }
                  defaultValue={data.unit}
                />
              </FormGroup>
              <FormGroup
                label="參考價格"
                labelFor={`Item-${data.id}-price`}
                style={{ flexBasis: 60, flexShrink: 0 }}
              >
                <InputGroup
                  id={`Item-${data.id}-price`}
                  placeholder="100"
                  onChange={e =>
                    this.updateItem({
                      ...data,
                      price: parseFloat(e.target.value)
                    })
                  }
                  defaultValue={data.price.toString()}
                  type="number"
                />
              </FormGroup>
            </ControlGroup>
            <Button intent="danger" onClick={() => this.deleteItem(data.id)}>
              刪除
            </Button>
          </Card>
        </div>
      );
    };
    return (
      <div>
        <h2 className="bp3-heading">商品列表</h2>
        <Button icon="plus" onClick={this.addItem.bind(this)}>
          新增
        </Button>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {this.state.itemList.map(x => itemDisplay(x))}
        </div>
      </div>
    );
  }
}
