import { ShipmentDatabase, ItemInfo } from './db';

export const getAllItem = async () => {
  const db = new ShipmentDatabase();
  return await db.item.toArray();
};

export const addNewItem = async () => {
  const db = new ShipmentDatabase();
  const re = await db.item.add({ unit: '單位', name: '', price: 0 });
  return re;
};

export const updateItem = async (data: ItemInfo) => {
  if (data.id == null) throw 'Data id must be define';
  const db = new ShipmentDatabase();
  await db.item.update(data.id, data);
};

export const deleteItem = async (id: number) => {
  const db = new ShipmentDatabase();
  await db.item.delete(id);
};
