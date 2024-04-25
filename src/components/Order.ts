import { Form } from './common/Form';
import { IDeliveryOrderForm, IContactOrderForm } from '../types';
import { IEvents } from './base/events';
import { ensureElement } from '../utils/utils';

export class DeliveryOrderForm extends Form<IDeliveryOrderForm> {
	protected _online: HTMLButtonElement;
	protected _payOn: HTMLButtonElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this._online = ensureElement<HTMLButtonElement>(
			'.button.button_alt[name="card"]',
			this.container
		);
		this._payOn = ensureElement<HTMLButtonElement>(
			'.button.button_alt[name="cash"]',
			this.container
		);

		if (this._payOn) {
			this._payOn.addEventListener('click', () => {
				this._payOn.classList.add('button_alt-active');
				this._online.classList.remove('button_alt-active');
				this.onInputChange('payment', 'cash');
			});
		}
		if (this._online) {
			this._online.addEventListener('click', () => {
				this._online.classList.add('button_alt-active');
				this._payOn.classList.remove('button_alt-active');
				this.onInputChange('payment', 'card');
			});
		}
	}

	set address(value: string) {
		(this.container.elements.namedItem('address') as HTMLInputElement).value =
			value;
	}
}

export class ContactOrderForm extends Form<IContactOrderForm> {
	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
	}

	set email(value: string) {
		(this.container.elements.namedItem('email') as HTMLInputElement).value =
			value;
	}

	set phone(value: string) {
		(this.container.elements.namedItem('phone') as HTMLInputElement).value =
			value;
	}
}
