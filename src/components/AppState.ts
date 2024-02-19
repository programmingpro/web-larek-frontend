import { IAppState, IProductItem, IOrder, IBasket, PaymentType, FormErrors } from '../types';
import {Model} from './base/Model';

class ProductItem implements IProductItem {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | string;

	constructor(product: IProductItem) {
		this.id = product.id;
		this.description = product.description;
		this.image = product.image;
		this.title = product.title;
		this.category = product.category;
		this.price = product.price;
	}
}

export class AppState extends Model<IAppState> {
	basket: [];
	products: [];
	order: IOrder = {
		phone: '',
		email: '',
		paymentType: PaymentType.Online,
		items: [],
	};
	formErrors: FormErrors = {};
}