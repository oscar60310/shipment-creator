import { ShipmentDatabase, CustomerInfo } from './db';

export const getAllCustomer = async () => {
  const db = new ShipmentDatabase();
  return await db.customer.toArray();
};

export const addNewCustomer = async () => {
  const db = new ShipmentDatabase();
  const re = await db.customer.add({ address: '', name: '' });
  return re;
};

export const updateCustomer = async (data: CustomerInfo) => {
  if (data.id == null) throw 'Data id must be define';
  const db = new ShipmentDatabase();
  await db.customer.update(data.id, data);
};

export const deleteCustomer = async (id: number) => {
  const db = new ShipmentDatabase();
  await db.customer.delete(id);
};
