import Dexie from 'dexie';

export interface CustomerInfo {
  name: string;
  address: string;
  id?: number;
}
class CustomerDatabase extends Dexie {
  customer: Dexie.Table<CustomerInfo, number>;
  constructor() {
    super('ShipMent');
    this.version(1).stores({
      customer: '++id, name'
    });
    this.customer = this.table('customer');
  }
}

export const getAllCustomer = async () => {
  const db = new CustomerDatabase();
  return await db.customer.toArray();
};

export const addNewCustomer = async () => {
  const db = new CustomerDatabase();
  const re = await db.customer.add({ address: '', name: '' });
  return re;
};

export const updateCustomer = async (data: CustomerInfo) => {
  if (data.id == null) throw 'Data id must be define';
  const db = new CustomerDatabase();
  await db.customer.update(data.id, data);
};

export const deleteCustomer = async (id: number) => {
  const db = new CustomerDatabase();
  await db.customer.delete(id);
};
