import './scss/styles.scss';

import { EventEmitter } from './components/base/events';
import { ProductAPI } from './components/ProductAPI';
import { API_URL, CDN_URL } from './utils/constants';
import { AppState, CatalogChangeEvent } from './components/AppData';
import { Card } from './components/Card';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Page } from './components/Page';
import { IProductItem } from './types/index';
import { Modal } from './components/common/Modal';
import { Basket } from './components/Basket';

const events = new EventEmitter();
const api = new ProductAPI(CDN_URL, API_URL);

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');

const appData = new AppState({}, events);

const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const basket = new Basket(cloneTemplate(basketTemplate), events);

api
	.getProductItemList()
	.then(appData.setCatalog.bind(appData))
	.catch((err) => {
		console.log(err);
	});
// Изменились элементы каталога
events.on<CatalogChangeEvent>('items:changed', () => {
	page.catalog = appData.catalog.map((item) => {
		const card = new Card(cloneTemplate(cardCatalogTemplate), {
			onClick: () => events.emit('card:select', item),
		});
		return card.render({
			title: item.title,
			image: item.image,
			price: item.price,
			category: item.category,
		});
	});
});
// Открыть карточку товара
events.on('card:select', (item: IProductItem) => {
	appData.setPreview(item);
});

events.on('preview:changed', (item: IProductItem) => {
	const card = new Card(cloneTemplate(cardPreviewTemplate), {
		onClick: () => events.emit('product:add', item),
	});
	modal.render({
		content: card.render({
			title: item.title,
			image: item.image,
			price: item.price,
			category: item.category,
		}),
	});
});

events.on('modal:open', () => {
	page.locked = true;
});

events.on('modal:close', () => {
	page.locked = false;
});
