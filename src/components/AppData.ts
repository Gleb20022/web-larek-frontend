import { Model } from './base/Model';
import {
	FormErrors,
	IAppState,
	IContactOrderForm,
	IDeliveryOrderForm,
	IOrder,
	IProductItem,
} from '../types';

export type CatalogChangeEvent = {
	catalog: IProductItem[];
};

export class AppState extends Model<IAppState> {
	catalog: IProductItem[];
	basket: IProductItem[] = [];
	order: IOrder = {
		payment: '',
		address: '',
		email: '',
		phone: '',
		total: 0,
		items: [],
	};
	preview: string | null;
	formErrors: FormErrors = {};

	addToBasket(value: IProductItem) {
		if (this.basket.indexOf(value) < 0) {
			this.basket.push(value);
			this.updateBasket();
		}
	}

	clearBasket() {
		this.basket = [];
		this.updateBasket();
	}

	setCatalog(value: IProductItem[]) {
		this.catalog = value;
		this.emitChanges('items:changed', { catalog: this.catalog });
	}

	setPreview(value: IProductItem) {
		this.preview = value.id;
		this.emitChanges('preview:changed', value);
	}

	setDeliveryField(field: keyof IDeliveryOrderForm, value: string) {
		this.order[field] = value;
		if (this.validateDeliveryOrder()) {
			this.events.emit('delivery:ready', this.order);
		}
	}

	setContactField(field: keyof IContactOrderForm, value: string) {
		this.order[field] = value;
		if (this.validateContactOrder()) {
			this.events.emit('contact:ready', this.order);
		}
	}

	removeFromBasket(value: IProductItem) {
		this.basket = this.basket.filter((item) => item !== value);
		this.updateBasket();
	}

	updateBasket() {
		this.emitChanges('basket:changed', this.basket);
	}

	validateDeliveryOrder() {
		const errors: typeof this.formErrors = {};
		if (!this.order.payment) {
			errors.payment = 'Необходимо указать способ оплаты';
		}
		if (!this.order.address) {
			errors.address = 'Необходимо указать адрес';
		}
		this.formErrors = errors;
		this.events.emit('formErrors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}

	validateContactOrder() {
		const errors: typeof this.formErrors = {};
		if (!this.order.email) {
			errors.email = 'Необходимо указать email';
		}
		if (!this.order.phone) {
			errors.phone = 'Необходимо указать телефон';
		}
		this.formErrors = errors;
		this.events.emit('formErrors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}
}
