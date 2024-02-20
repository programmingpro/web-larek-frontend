import {Component} from "./base/Component";
import {ensureElement} from "../utils/utils";

interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

export interface ICard<T> {
	id: string;
	image: string;
	price: number | string;
	title: string;
	button: boolean;
	category: string;
	description: string;
	onClick: () => void;
}

export class Card<T> extends Component<ICard<T>> {
	protected _title: HTMLElement;
	protected _image: HTMLImageElement;
	protected _description: HTMLElement;
	protected _button: HTMLButtonElement;
	protected _category: HTMLButtonElement;
	protected _price: HTMLButtonElement;
}

export class CardShow<T> extends Card<T> {

}