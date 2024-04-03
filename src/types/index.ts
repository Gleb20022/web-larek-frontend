export interface IProductItem {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

export interface IAppState {
  catalog: IProductItem[];
  basket: IProductItem[];
  preview: string | null;
  order: IOrder | null;
}

export interface IDeliveryOrderForm {
  payment: string;
  address: string;
}

export interface IContactOrderForm {
  email: string;
  phone: string;
}

export interface IOrder extends IDeliveryOrderForm, IContactOrderForm {
  total: number;
  items: string[];
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;

export interface IOrderResult {
	id: string;
	total: number;
}