import { ShipmentDatabase, CustomerInfo } from './db';
import { MenuItem } from '@blueprintjs/core';
import React from 'react';
import { ItemPredicate } from '@blueprintjs/select';

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
export const renderCustomerMenuItem = (
  item: CustomerInfo,
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
export const filterCustomer: ItemPredicate<CustomerInfo> = (
  query,
  customer,
  _index,
  exactMatch
) => {
  const normalizedTitle = customer.name.toLowerCase();
  const normalizedQuery = query.toLowerCase();

  if (exactMatch) {
    return normalizedTitle === normalizedQuery;
  } else {
    return `${customer.id}. ${normalizedTitle}`.indexOf(normalizedQuery) >= 0;
  }
};
