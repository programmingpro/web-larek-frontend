import { IProductItem, ILarekAPI, IOrder, IOrderStatus } from '../types';
import * as apiEndpoints from '../types/constants';
import { Api, ApiListResponse } from './base/api';


export class LarekAPI extends Api implements ILarekAPI{

	cdnURL: string;

	constructor(cdnURL: string, baseURL: string, options?: RequestInit) {
		super(baseURL, options);
		this.cdnURL = cdnURL;
	}

	async getProductList(): Promise<IProductItem[]> {
			const response = await this.get(apiEndpoints.PRODUCT_LIST_ENDPOINT);
			const apiResponse = response as ApiListResponse<IProductItem>
			return apiResponse.items.map((item) => ({...item, image: this.cdnURL + item.image}))
	}

	async getProduct(id: number): Promise<IProductItem> {
		const response = await this.get(apiEndpoints.SINGLE_PRODUCT_ENDPOINT(id.toString()));
		return response as IProductItem;
	}

	async placeOrder(order: IOrder): Promise<IOrderStatus> {
		console.log(order);
		const response = await this.post(
				apiEndpoints.ORDER_ENDPOINT,
				order
		);
		return response as IOrderStatus;
	}
}