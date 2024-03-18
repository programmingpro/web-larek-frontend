import { Form } from './Form';
import { IPaymentAndAddressForm, IPaymentPhoneAndEmail, PaymentType} from '../../types';
import { IEvents } from '../base/events';
import { ensureAllElements, ensureElement } from '../../utils/utils';

export class Order extends Form<IPaymentAndAddressForm> {
  protected _alts: HTMLButtonElement[];
  protected _card: HTMLButtonElement;
  protected _cash: HTMLButtonElement;
  protected _next: HTMLButtonElement;
  protected _address: HTMLInputElement;

  private isChoosen = false;

  constructor(container: HTMLFormElement, events: IEvents) {
      super(container, events);
      
      this._alts = ensureAllElements<HTMLButtonElement>('.button_alt', container);
      this._next = this.container.querySelector('button.order__button');
      this._card = ensureElement<HTMLButtonElement>('button[name=card]', container);
      this._cash = ensureElement<HTMLButtonElement>('button[name=cash]', container);
      this._address = this.container.querySelector('input[name="address"]');

      this._alts.forEach(tab => {
          tab.addEventListener('click', () => {
            this.isChoosen = true;
            if (this.checkAddres()) {
              this._next.removeAttribute('disabled')
            } else {
              this._next.setAttribute('disabled', '');
            }
            if(this._card == tab) {
              this._card.classList.add('button_alt-active');
              this._cash.classList.remove('button_alt-active');
            } else {
              this._cash.classList.add('button_alt-active');
              this._card.classList.remove('button_alt-active');
            }
          })

      });

      this._address.addEventListener('input', () => {
        if (this.checkAddres()) {
          this._next.removeAttribute('disabled')
        } else {
          this._next.setAttribute('disabled', '');
        }
      })

      this._next.addEventListener('click', () => {
        const order: IPaymentAndAddressForm = {
          address: this._address.value,
          paymentType: 'button_alt-active' in this._card.classList.keys() ? PaymentType.Online : PaymentType.OnDelivery,
        }
        events.emit('contacts:open', order);
      })
  }

  checkAddres() {
    return (this._address.value != '') && this.isChoosen;
  }

}

export class Contacts extends Form<IPaymentPhoneAndEmail> {

  protected _button: HTMLButtonElement;
  protected _email: HTMLButtonElement;
  protected _phone: HTMLButtonElement;

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);

    this._button = this.container.querySelector('button');
    this._email = this.container.querySelector('input[name="email"]');
    this._phone = this.container.querySelector('input[name="phone"]');

    this._email.addEventListener('input', () => {
      if (this.checkAvailabilityContacts()) {
        this._button.removeAttribute('disabled')
      } else {
        this._button.setAttribute('disabled', '')
      }
    })

    this._phone.addEventListener('input', () => {
      if (this.checkAvailabilityContacts()) {
        this._button.removeAttribute('disabled')
      } else {
        this._button.setAttribute('disabled', '')
      }
    })

    this.container.addEventListener('submit', (e: Event) => {
      e.preventDefault();

      const data: IPaymentPhoneAndEmail = {
        email: this._email.value,
        phone: this._phone.value,
      }

      if (!this.checkEmail()) {
        this.errors = "Заполните корректно email";
        return 0;
      }

      if (!this.checkPhone()) {
        this.errors = "Заполните корректно номер телефона";
        return 0;
      }

      this.events.emit(`order:submit`, data);
    });

  }

  set email(email: string) {
    (this.container.elements.namedItem('email') as HTMLInputElement).value = email;
  }

  set phone(phone: string) {
    (this.container.elements.namedItem('phone') as HTMLInputElement).value = phone;
  }

  checkAvailabilityContacts() {
    return (this._phone.value != '') && (this._email.value != '');
  }

  checkPhone() {
    const phoneRegex = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
    return phoneRegex.test(this._phone.value);
  }

  checkEmail() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(this._email.value);
  }
}