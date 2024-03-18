export interface IProductItem {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number;
}

export interface IBasket {
	items: IProductItem[];
	totalPrice: number;
	addItem(item: IProductItem): void;
	removeItem(itemId: IProductItem): void;
	calculateTotalPrice(): number;
}

export enum PaymentType {
	Online = 'Онлайн',
	OnDelivery = 'При получении'
}

export interface IOrder {
	phone: string,
	email: string,
	address: string,
	payment: PaymentType,
	items: string[],
	total: number
}

export interface IPaymentAndAddressForm {
	address: string,
	paymentType: PaymentType,
}

export interface IPaymentPhoneAndEmail {
	phone: string,
	email: string,
}


interface Basket {
	items: IProductItem[];
	totalPrice: number;
	addItem(product: IProductItem): void;
	removeItem(itemId: string): void;
	calculateTotalPrice(): number;
}

export interface ILarekAPI {
	// Получить список товаров
	getProductList(): Promise<IProductItem[]>;
	// Получить товар по идентификатору
	getProduct(id: number): Promise<IProductItem>;
	// Отправить заказ
	placeOrder(order: IOrder): Promise<IOrderStatus>;
}

export interface IAppState {
	products: IProductItem[];
	basket: string[];
	order: IOrder | null;
}

export interface IOrderStatus { // отвечает за успешность заказа
	status: string;
	totalPrice: number;
}
