import { Component } from '../components/base/Component';
import { IBasketView } from '../types/index';
import { EventEmitter } from '../components/base/events';
import { ensureElement, createElement } from '../utils/utils';

export class Basket extends Component<IBasketView> {
	protected _list: HTMLElement;
	protected _total: HTMLElement;
	protected _button: HTMLElement;

	constructor(container: HTMLElement, events: EventEmitter) {
		super(container);

		this._list = ensureElement<HTMLElement>('.basket__list', this.container);
		this._total = this.container.querySelector('.basket__price')!;

		if (this._button) {
			this._button.addEventListener('click', () => {
				events.emit('deliveryOrder:open');
			});
		}
		this.items = [];
	}

	set items(items: HTMLElement[]) {
		if (items.length) {
			this._list.replaceChildren(...items);
		} else {
			this._list.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: 'Корзина пуста',
				})
			);
		}
	}

	set total(total: number) {
		this.setText(this._total, `${total.toString()} синапсов`);
	}
}
