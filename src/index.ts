import './scss/styles.scss';

import { API_URL, CDN_URL } from './utils/constants';
import { LarekAPI } from './components/LarekAPI';
import { AppState } from './components/AppState';
import { EventEmitter } from './components/base/events';
import { Page } from './components/Page';
import { BasketCard, Card } from './components/Card';
import { cloneTemplate, createElement, ensureElement } from './utils/utils';
import { Modal } from './components/Modal';
import {
	IProductItem,
	PaymentType,
	IPaymentPhoneAndEmail,
	IPaymentAndAddressForm,
	IOrderStatus,
} from './types';
import { Basket } from './components/common/Basket';
import { Contacts, Order } from './components/common/Order';
import { Success } from './components/common/Success';

const api = new LarekAPI(CDN_URL, API_URL);

const catalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const previewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');

const events = new EventEmitter();

const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

const appData = new AppState({}, events);

const basket = new Basket(cloneTemplate(basketTemplate), events);
const order = new Order(cloneTemplate(orderTemplate), events);

const contacts = new Contacts(cloneTemplate(contactsTemplate), events);

api.getProductList()
	.then(appData.setProducts.bind(appData))
	.catch(err => {
		alert(err);
	});

events.on('cards:display', () => {
	page.catalog = appData.products.map(item => {
		const card = new Card('card', cloneTemplate(catalogTemplate), {
			onClick: () => {
				events.emit('cards:show', item)
			}
		});
		return card.render({
			category: item.category,
			image: item.image,
			price: item.price,
			title: item.title,
			description: item.description
		});
	});
});

events.on('cards:show', (item: IProductItem) => {
		const card = new Card('card', cloneTemplate(previewTemplate), {
			onClick: () => {
				card.button = true;
				card.addButoonAction({
					onClick: () => {
							events.emit('basket:open', item);
					}
				})
				if (!appData.basket.includes(item.id)) {
					events.emit('card:add', item);
				}
			}
		})

		if (!appData.basket.includes(item.id)) {
			card.button = false;
		} else {
			card.addButoonAction({
				onClick: () => events.emit('basket:open', item)
			})
		}

		modal.render({
			content: card.render({
				id: item.id,
				category: item.category,
				description: item.description,
				image: item.image,
				price: item.price,
				title: item.title,
			})
		})
	events.emit('modal:open', item)
})

events.on('modal:open', () => { page.locked = true})
events.on('modal:close', () => { page.locked = false})

events.on('card:add', (item: IProductItem) => {
	appData.basket.push(item.id);
	appData.order.items.push(item.id);
	page.counter = appData.getCountOfItems();
});

events.on('basket:open', () => {
	modal.render({
		content: createElement<HTMLElement>('div', {},
			basket.render()
		)
	});
	basket.total = appData.getTotal();
	basket.items = appData.getAddedProducts()
		.map((item, i) => {
			const cardBasket = new BasketCard('card', cloneTemplate(cardBasketTemplate), {
				onClick: () => events.emit('card:delete', item)
			});
			cardBasket.index = ((i + 1).toString());
			return cardBasket.render({
				title: item.title,
				price: item.price,
			})
		});
	if (appData.getCountOfItems() == 0) {
		basket.setButtonDisabled(true);
	} else {
		basket.setButtonDisabled(false);
	}
});

events.on('card:delete', (item: IProductItem) => {
	appData.basket = appData.basket.filter(
		basketItem => basketItem !== item.id
	);
	appData.order.items = appData.order.items.filter(
		orderItem => orderItem !== item.id
	)
	events.emit('basket:open');
	page.counter = appData.getCountOfItems();
});

events.on('order:open', () => {
	modal.render({
		content: order.render({
			paymentType: PaymentType.Online,
			valid: false,
			errors: []
		})
	});
});

events.on('contacts:open', (data: IPaymentAndAddressForm) => {
	appData.order.address = data.address;
	appData.order.payment = data.paymentType
	modal.render({
		content: contacts.render({
			errors: [],
			valid: false,
			email: '',
			phone: ''
		})
	});
})

events.on('order:submit', (data: IPaymentPhoneAndEmail) => {
	appData.order.email = data.email;
	appData.order.phone = data.phone;
	appData.order.total = appData.getTotal();
	api.placeOrder(appData.order).then( (res: IOrderStatus) => {
		const success = new Success(cloneTemplate(successTemplate), {
			onClick: () => {
				modal.close();
				appData.basket = [];
				appData.order.total = 0
				appData.order.items = []
				console.log(appData)
				page.counter = 0
				events.emit('cards:display')
			}
		});

		modal.render({
			content: success.render({
				total: appData.order.total
			})
		});
	});
})