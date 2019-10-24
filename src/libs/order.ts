export interface OrderItem {
  name?: string;
  unit?: string;
  unitPrice: number;
  quantity: number;
}
export interface Order {
  companyName: string;
  companyAddress?: string;
  companyPhone?: string;
  date: Date;
  customerName: string;
  customerAddress?: string;
  items: OrderItem[];
}
