import { Component } from '../base/Component';
import { ISuccess, ISuccessActions } from '../../types';
import { ensureElement } from '../../utils/utils';

export class Success extends Component<ISuccess> {
	protected _closeBtn: HTMLButtonElement;
	protected _total: HTMLElement;

	constructor(container: HTMLElement, actions: ISuccessActions) {
		super(container);

		this._closeBtn = ensureElement<HTMLButtonElement>(
			'.order-success__close',
			this.container
		);
		this._total = ensureElement<HTMLElement>(
			'.order-success__description',
			this.container
		);

		if (actions?.onClick) {
			this._closeBtn.addEventListener('click', actions.onClick);
		}
	}

	set result(value: string) {
		this._total.textContent = `Списано ${value} синапсов`;
	}
}
