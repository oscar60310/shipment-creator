import { ShipmentDatabase, ItemInfo } from './db';
import { MenuItem } from '@blueprintjs/core';
import { ItemPredicate } from '@blueprintjs/select';
import React from 'react';

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
export const renderItemMenuItem = (
  item: ItemInfo,
  { handleClick, modifiers, query }
) => {
  if (!modifiers.matchesPredicate) {
    return null;
  }
  return (
    <MenuItem
      active={modifiers.active}
      disabled={modifiers.disabled}
      key={item.id}
      onClick={handleClick}
      text={`[${item.id}] ${item.name}`}
    />
  );
};
export const filterItem: ItemPredicate<ItemInfo> = (
  query,
  item,
  _index,
  exactMatch
) => {
  const normalizedTitle = item.name.toLowerCase();
  const normalizedQuery = query.toLowerCase();

  if (exactMatch) {
    return normalizedTitle === normalizedQuery;
  } else {
    return `${item.id}. ${normalizedTitle}`.indexOf(normalizedQuery) >= 0;
  }
};
