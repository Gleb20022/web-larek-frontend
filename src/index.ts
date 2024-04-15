import './scss/styles.scss';

import { EventEmitter } from './components/base/events';
import { ProductAPI } from './components/ProductAPI';
import { API_URL, CDN_URL } from './utils/constants';
import { AppState, CatalogChangeEvent } from './components/AppData';
import { Card } from './components/Card';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Page } from './components/Page';

const events = new EventEmitter();
const api = new ProductAPI(CDN_URL, API_URL);

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');

const appData = new AppState({}, events);

const page = new Page(document.body, events);

api
	.getProductItemList()
	.then(appData.setCatalog.bind(appData))
	.catch((err) => {
		console.log(err);
	});

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
