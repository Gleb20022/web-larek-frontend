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
		onClick: () => {
			events.emit('product:add', item),
				(item.inBasket = true),
				appData.addToBasket(item),
				(page.counter = appData.basket.length);
			modal.close();
		},
	});
	modal.render({
		content: card.render({
			title: item.title,
			image: item.image,
			price: item.price,
			category: item.category,
			inBasket: item.inBasket,
		}),
	});
});

events.on('basket:changed', (items: IProductItem[]) => {
	basket.items = items.map((item, index) => {
		const card = new Card(cloneTemplate(cardBasketTemplate), {
			onClick: () => {
				events.emit('product:delete', item),
					(item.inBasket = false),
					appData.removeFromBasket(item);
				page.counter = appData.basket.length;
			},
		});
		return card.render({
			title: item.title,
			price: item.price,
			index: `${index + 1}`,
		});
	});
	let total = 0;
	items.forEach((item) => {
		total += item.price;
	});
	basket.total = total;
	appData.order.total = total;
});

events.on('basket:open', () => {
	modal.render({
		content: basket.render({}),
	});
});

events.on('modal:open', () => {
	page.locked = true;
});

events.on('modal:close', () => {
	page.locked = false;
});
