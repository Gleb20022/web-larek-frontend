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

export interface IFormState {
  valid: boolean;
  errors: string[];
}

export interface IModalData {
  content: HTMLElement;
}

export interface IPage {
  counter: number;
  catalog: HTMLElement[];
}

export interface ICard {
  id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

export interface IBasketView {
  items: HTMLElement[];
  total: number;
}

export interface IDeliveryOrderForm {
  payment: string;
	address: string;
}

export interface IContactOrderForm {
  email: string;
	phone: string;
}

export interface ISuccess {
  total: number;
}

export interface ICardActions {
  onClick: (event: MouseEvent) => void;
}

export interface ISuccessActions {
  onClick: () => void;
}