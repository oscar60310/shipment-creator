import Dexie from 'dexie';

export interface CustomerInfo {
  name: string;
  address: string;
  id?: number;
}
export interface ItemInfo {
  name: string;
  unit: string;
  price: number;
  id?: number;
}
export class ShipmentDatabase extends Dexie {
  customer: Dexie.Table<CustomerInfo, number>;
  item: Dexie.Table<ItemInfo, number>;
  constructor() {
    super('ShipMent');
    this.version(2).stores({
      customer: '++id, name',
      item: '++id, name'
    });
    this.customer = this.table('customer');
    this.item = this.table('item');
  }
}
