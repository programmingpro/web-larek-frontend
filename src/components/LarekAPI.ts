import { IProductItem, ILarekAPI, IOrder, IOrderStatus } from '../types';
import * as apiEndpoints from '../types/constants';
import { Api } from "./base/api";


export class LarekAPI extends Api implements ILarekAPI{

	async getProductList(): Promise<IProductItem[]> {
			const response = await this.get(apiEndpoints.PRODUCT_LIST_ENDPOINT);
			return response as IProductItem[];
	}

	async getProduct(id: number): Promise<IProductItem> {
		const response = await this.get(apiEndpoints.SINGLE_PRODUCT_ENDPOINT(id.toString()));
		return response as IProductItem;
	}

	async placeOrder(order: IOrder): Promise<IOrderStatus> {
		const response = await this.post(
				apiEndpoints.ORDER_ENDPOINT,
				order
		);
		return response as IOrderStatus;
	}
}