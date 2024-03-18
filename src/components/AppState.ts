import { IAppState, IProductItem, IOrder, IBasket, PaymentType } from '../types';
import {Model} from './base/Model';


export class AppState extends Model<IAppState> {
	private _basket: string[] = [];
	private _products: IProductItem[];
	private _order: IOrder = {
		phone: '',
		address: '',
		email: '',
		payment: PaymentType.Online,
		items: [],
		total: 0
	};


	get basket(): string[] {
		return this._basket;
	}

	set basket(value: string[]) {
		this._basket = value;
	}

	get products(): IProductItem[] {
		return this._products;
	}

	set products(value: IProductItem[]) {
		this._products = value;
	}

	get order(): IOrder {
		return this._order;
	}

	set order(value: IOrder) {
		this._order = value;
	}

	setProducts(products: IProductItem[]) {
		this.products = products
		this.emitChanges('cards:display', { catalog: this._products });
	}

	getAddedProducts(): IProductItem[] {
		return this._products
			.filter(item => this.basket.includes(item.id));
	}

	getTotal(): number {
		const arrayOfItems = this.products.filter(item => this.basket.includes(item.id))
		return arrayOfItems.reduce((sum: number, item: IProductItem) => sum + (item.price), 0);
	}

	getCountOfItems(): number {
		return this.basket.length
	}
}