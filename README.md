# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
## НА РЕВЬЮ С УЧЕТОМ ПРАВОК (АРХИТЕКТУРА)

## Базовые классы
## Класс EventEmitter implements IEvents

Этот класс `EventEmitter` реализует систему событий, которая позволяет устанавливать обработчики на определенные события и генерировать эти события с данными.

При инициализации экземпляра класса в конструкторе задается свойство _events:
`constructor() {
    this._events = new Map<EventName, Set<Subscriber>>();
}`

Он использует `Map` для хранения обработчиков событий, где ключ - это имя события, а значение - это набор функций-обработчиков.

Класс имеет следующие методы:

1. `on(eventName: EventName, callback: (event: T) => void)` - Устанавливает обработчик на событие. Если событие еще не существует, оно создается.

2. `off(eventName: EventName, callback: Subscriber)` - Удаляет обработчик с события. Если после удаления обработчиков у события не осталось обработчиков, событие удаляется.

3. `emit<T extends object>(eventName: string, data?: T)` - Инициирует событие с данными. Если имя события соответствует имени события в `Map`, то для каждого обработчика вызывается функция-обработчик с данными.

4. `onAll(callback: (event: EmitterEvent) => void)` - Устанавливает обработчик на все события.

5. `offAll()` - Удаляет все обработчики.

6. `trigger<T extends object>(eventName: string, context?: Partial<T>)` - Создает функцию-триггер, которая при вызове генерирует событие с данными. Это может быть полезно, когда необходимо создать функцию, которая будет генерировать событие при вызове.

## Component
Класс `Component` является абстрактным классом, который используется для создания компонентов пользовательского интерфейса. Он принимает контейнер `HTMLElement`, который будет использоваться для отображения компонента.

Конструктор класса принимает только один параметр - `container`, который является `HTMLElement`. Конструктор помечен как `protected`, что означает, что он не может быть вызван напрямую, но может быть вызван только из подклассов.

`protected constructor(protected readonly container: HTMLElement)`

Класс предоставляет следующие методы для работы с DOM:

1. `toggleClass(element: HTMLElement, className: string, force?: boolean)` - Переключает класс `className` у элемента `element`. Если `force` установлен в `true`, класс будет добавлен, если `false` - удален. Если `force` не указан, класс будет добавлен, если он отсутствует, и удален, если он присутствует.

2. `setText(element: HTMLElement, value: unknown)` - Устанавливает текстовое содержимое элемента `element` равным `value`, преобразованному в строку.

3. `setDisabled(element: HTMLElement, state: boolean)` - Устанавливает атрибут `disabled` элемента `element` в зависимости от значения `state`. Если `state` равен `true`, атрибут будет установлен, иначе - удален.

4. `setHidden(element: HTMLElement)` - Скрывает элемент `element`, устанавливая его свойство `display` в `none`.

5. `setVisible(element: HTMLElement)` - Делает элемент `element` видимым, удаляя свойство `display`.

6. `setImage(element: HTMLImageElement, src: string, alt?: string)` - Устанавливает источник (`src`) и альтернативный текст (`alt`) для элемента `element`, если он является элементом `HTMLImageElement`.

7. `render(data?: Partial<T>): HTMLElement` - Обновляет свойства компонента с помощью данных из `data` и возвращает корневой элемент компонента.

Этот класс предназначен для использования в качестве базового класса для создания компонентов пользовательского интерфейса, которые могут быть легко настроены.

## Api:

Класс `Api` представляет собой базовый класс для взаимодействия с API. Он содержит следующие методы и свойства:

- `baseUrl` - базовый URL для API.
- `options` - настройки для запросов к API, которые включают заголовки. По умолчанию установлен заголовок `'Content-Type': 'application/json'`.

Конструктор класса принимает `baseUrl` и `options`, которые используются для инициализации свойств класса.

`constructor(baseUrl: string, options: RequestInit = {})`

- `handleResponse(response: Response): Promise<object>` - Метод для обработки ответа от сервера. Если ответ успешный (`response.ok`), то метод возвращает промис, разрешающийся в JSON-объект ответа. Если ответ не успешный, то метод возвращает промис, отклоняющийся с текстом ошибки из ответа или статусом ответа, если ошибка не указана.

- `get(uri: string)` - Метод для отправки GET-запроса к API. Он использует `fetch` для отправки запроса и `handleResponse` для обработки ответа.

- `post(uri: string, data: object, method: ApiPostMethods = 'POST')` - Метод для отправки POST, PUT или DELETE-запроса к API. Он также использует `fetch` для отправки запроса и `handleResponse` для обработки ответа. Метод запроса определяется параметром `method`.

Этот класс предназначен для использования в качестве базового класса для создания классов, которые будут взаимодействовать с конкретным API.

## Сущности слоя модели (Model)

Данный слой хранит в себе данные, которые приложение будет использовать для дальнейшего отображения и работы с ними

## Model

Класс Model принимает два параметра в конструкторе: data и events. data является частичной версией типа T, что означает, что он может содержать любое количество свойств типа T, но не обязательно все. events является объектом, который реализует интерфейс IEvents.

В конструкторе класса Model, данные из data копируются в экземпляр класса с помощью Object.assign(this, data). Это позволяет создать новый экземпляр класса с начальными данными.

`constructor(data: Partial<T>, protected events: IEvents)`

Класс Model также содержит метод emitChanges, который используется для сообщения всем, что модель была изменена. Он принимает два параметра: event и payload. event является строкой, которая представляет собой имя события, которое должно быть сообщено. payload является объектом, который содержит дополнительные данные о событии. Если payload не указан, то используется пустой объект.

Функция isModel используется для проверки, является ли переданный объект экземпляром класса Model. Она возвращает true, если объект является экземпляром Model, и false в противном случае.

## AppState


класс AppState наследуется от Model<IAppState> и представляет собой состояние приложения, фактически из него берется информация для отображения сущностей на странице. Хранит все данные приложения и сообщает об изменениях. Он содержит следующие свойства:

    basket: string[] массив, который должен содержать товары в корзине.

    products: IProductItem[] массив, который должен содержать список товаров.

    order: IOrder Объект, представляющий заказ, который содержит следующие свойства:

        phone: string строка, для хранения номера телефона покупателя.

        email: string строка, для хранения электронной почты покупателя.
        
        address: string, строка для хранения адресса

        payment: paymentType Значение PaymentType.Online, указывающее на тип оплаты.

        items: string[] массив, для хранения товаров в заказе.

        total: number Сумма заказа

Методы:
   
    get basket(): string[] - это геттер для свойства _basket.

    set basket(value: string[]) - это сеттер для свойства _basket.

    get products(): IProductItem[] - это геттер для свойства _products.

    set products(value: IProductItem[]) - это сеттер для свойства _products.

    get order(): IOrder - это геттер для свойства _order.

    set order(value: IOrder) - это сеттер для свойства _order.

    setProducts(products: IProductItem[]) - это метод, который устанавливает значение для свойства _products и вызывает метод emitChanges.

    getAddedProducts(): IProductItem[] - это метод, который возвращает отфильтрованный список продуктов, которые есть в корзине.

    getTotal(): number - это метод, который возвращает общую сумму цен продуктов в корзине.

    getCountOfItems(): number - это метод, который возвращает количество элементов в корзине.
    
По сути, в кассе находится методы для работы с данными 

## LarekAPI

Класс `LarekAPI` является расширением класса `Api` и реализует интерфейс `ILarekAPI`. Он предоставляет методы для взаимодействия с сервером, которые связаны с продуктами и заказами.

### Методы

1. `getProductList(): Promise<IProductItem[]>` - Этот метод выполняет GET-запрос к серверу для получения списка продуктов. Он возвращает промис, который разрешается в массив объектов `IProductItem`.

2. `getProduct(id: number): Promise<IProductItem>` - Этот метод выполняет GET-запрос к серверу для получения информации о конкретном продукте, идентифицируемом по идентификатору `id`. Он возвращает промис, который разрешается в объект `IProductItem`.

3. `placeOrder(order: IOrder): Promise<IOrderStatus>` - Этот метод выполняет POST-запрос к серверу для размещения заказа. Он принимает объект `IOrder`, содержащий детали заказа, и возвращает промис, который разрешается в объект `IOrderStatus`, содержащий информацию о статусе заказа.

### Примечания

- Все методы используют асинхронные операции для взаимодействия с сервером, что позволяет избежать блокировки выполнения кода.
- Методы `getProductList` и `getProduct` выполняют GET-запросы к серверу, а метод `placeOrder` выполняет POST-запрос.
- URL для запросов определяются в модуле `apiEndpoints`, который экспортирует константы, представляющие конечные точки API.
- Методы `getProductList` и `getProduct` возвращают промисы, которые разрешаются в массивы объектов `IProductItem` и объект `IProductItem` соответственно.
- Метод `placeOrder` возвращает промис, который разрешается в объект `IOrderStatus`.

## Сущности слоя представления (Presenter)

## Page

Класс `Page` наследуется от класса `Component` содержит следующие компоненты:

1. **Конструктор**:
   `constructor(container: HTMLElement, protected events: IEvents)`
    - Инициализирует элементы страницы, такие как счетчик, каталог, обертку и корзину.
    - Настраивает обработчик события для клика по корзине, который вызывает событие `basket:open`.

2. **Свойства**:
    `_counter`: HTMLElement Хранит элемент, предоставляющий счётчик

    `_catalog`: HTMLElement Хранит элемент, предоставляющий каталог

    `_wrapper`: HTMLElement Хранит элемент, оборачивающий страницу

    `_basket`: HTMLElement Хранит элемент, предоставляющий корзину.

Класс `Page` использует интерфейс `IPage` для определения структуры данных, которая передается в базовый класс `Component`. Этот интерфейс определяет свойства `counter`, `catalog` и `locked`, которые могут быть установлены через сеттеры класса.

Класс `Page` также использует функцию `ensureElement` для получения элементов DOM по селекторам. Это может быть полезно для упрощения работы с DOM и избежания ошибок, связанных с отсутствием элементов на странице.

Класс `Page` представляет собой компонент, который управляет визуальной частью страницы, такой как счетчик, каталог и состояние блокировки. Он также обрабатывает события, такие как клик по корзине, и вызывает соответствующие события через интерфейс `IEvents`.


## Basket

Класс `Basket`  наследуется от базового класса `Component` и представляет собой представление корзины в приложении.

Основные компоненты класса:

1. **Конструктор**: В конструкторе класса инициализируются элементы представления корзины, такие как список товаров, общая сумма и кнопка для открытия заказа. Также настраивается обработчик события для клика по кнопке, который вызывает событие `order:open`.
   `constructor(container: HTMLElement, protected events: EventEmitter)`

2. **Свойства**:
   `protected _list: HTMLElement` - элементы корзины
   `protected _total: HTMLElement` - элемент суммы заказов
   `protected _button: HTMLElement` - элемент кнопки

3. **Методы**:
    - `set items(items: HTMLElement[])` - это сеттер для свойства _list
    - `set total(total: number)` - это сеттер для свойства _total. Он устанавливает текстовое содержимое узла _total в формате "<число> синапсов"
    - `setButtonDisabled(state: boolean)` - это метод, который устанавливает свойство disabled узла _button в зависимости от значения state. Если state равно true, то кнопка становится неактивной, иначе - активной.

Класс `Basket` использует интерфейс `IBasketView` для определения структуры данных, которая передается в базовый класс `Component`. Этот интерфейс определяет свойства `items: HTMLElement[]` и `total: number`, которые могут быть установлены через сеттеры класса.

Класс `Basket` также использует функции `ensureElement`, `createElement` и `formatNumber` для работы с DOM и форматирования чисел.

В целом, класс `Basket` представляет собой компонент, который управляет визуальной частью корзины, такой как список товаров, общая сумма и возможность открытия заказа. Он также обрабатывает события, такие как клик по кнопке, и вызывает соответствующие события через интерфейс `EventEmitter`.

## Modal

Класс `Modal` представляет собой компонент модального окна, который может отображать произвольный контент и управляться с помощью событий.

`constructor(container: HTMLElement, protected events: IEvents)`

Класс `Modal` наследуется от базового класса `Component` и реализует интерфейс `IModal`. Он принимает в конструкторе контейнер, в котором будет размещаться модальное окно, и объект `events` для обработки событий.

В конструкторе класса инициализируются кнопка закрытия `_closeButton`:HTMLButtonElement и контейнер контента `_content`:HTMLButtonElement . Для обработки событий используется метод `addEventListener`, который добавляет обработчики событий на кнопку закрытия, контейнер модального окна и контент.


Метод `open()` добавляет класс `modal_active` к контейнеру модального окна, чтобы отобразить его, и вызывает событие `modal:open`.

Метод `close()` удаляет класс `modal_active` из контейнера модального окна, очищает контент и вызывает событие `modal:close`.

Метод `render(data: IModalData): HTMLElement` вызывает метод `render` базового класса `Component` для рендеринга модального окна, а затем вызывает метод `open()` для отображения модального окна.

## Card

Класс `Card<T>` является подклассом `Component<ICard<T>>` и представляет собой компонент карточки, которая может отображать различный контент, такой как заголовок, изображение, описание, кнопку, категорию и цену.

`constructor(container: HTMLElement, protected data: T, protected events: IEvents)`

В классе `Card<T>` определены следующие защищенные свойства:

- `_title : HTMLButtonElement` - заголовок карточки.
- `_image : HTMLButtonElement` - изображение карточки.
- `_description : HTMLButtonElement` - описание карточки.
- `_button : HTMLButtonElement` - кнопка действия карточки.
- `_category : HTMLButtonElement` - категория карточки.
- `_price : HTMLButtonElement` - цена товара.

// Геттеры
get title(): HTMLElement;
get image(): HTMLImageElement;
get description(): HTMLElement;
get button(): HTMLButtonElement;
get category(): HTMLButtonElement;
get price(): HTMLButtonElement;

// Сеттеры
set title(title: HTMLElement);
set image(image: HTMLImageElement);
set description(description: HTMLElement);
set button(button: HTMLButtonElement);
set category(category: HTMLButtonElement);
set price(price: HTMLButtonElement);
set id(value: string)

addButoonAction(actions?: ICardActions): void - добавляет событие кнопке

## Form <T>

`constructor(protected container: HTMLFormElement, protected events: IEvents)`

Класс Form<T> является подклассом Component<IFormState> и представляет собой компонент формы.

В классе Form<T> определены следующие защищенные свойства:

_submit : HTMLButtonElement - кнопка отправки формы.

_errors : HTMLElement - контейнер для отображения ошибок валидации.

Конструктор класса принимает контейнер формы (container) и объект events для обработки событий. В конструкторе инициализируются кнопка отправки формы (_submit) и контейнер ошибок (_errors).

Класс имеет методы для установки валидности формы (valid) и ошибок валидации (errors). Метод valid управляет активностью кнопки отправки формы, а метод errors устанавливает текст ошибок в контейнере ошибок.
`set valid(value: boolean)`
`set errors(value: string)`

Метод render класса обновляет состояние формы и присваивает новые значения полям формы. Он также вызывает метод render базового класса Component для обновления состояния компонента.
`render(state: Partial<T> & IFormState)`

## Order <T> extends Form<T>

Класс содержит поля для предоставления пользователю возможности ввода данных о форме оплаты или сведений об адресе доставки.

Конструктор:

` constructor(container: HTMLFormElement, events: IEvents)`

свойства:

protected _alts: HTMLButtonElement[]; - элемент переключателей
protected _card: HTMLButtonElement; - элемент картой
protected _cash: HTMLButtonElement; - элемент наличными
protected _next: HTMLButtonElement; - элемент далее
protected _address: HTMLInputElement; - элемент адресс

private isChoosen = false; - элемент, показывающий выбран ли способ оплаты

## Contacts extends Form<IPaymentPhoneAndEmail>

Класс контактов

`constructor(container: HTMLFormElement, events: IEvents)`

Свойства:

protected _button: HTMLButtonElement - элемент/кнопка отправки;
protected _email: HTMLButtonElement - элемент/email;
protected _phone: HTMLButtonElement - элемент/телефон;

## Success


Класс `Success` является подклассом `Component<ISuccess>` и представляет собой компонент, который отображает сообщение об успешном выполнении какого-то действия, например, оформления заказа.

В классе `Success` определены следующие защищенные свойства:

- `_close: HTMLElement` - элемент, который, при клике, вызывает функцию `onClick` из объекта `actions`.
- `_total: HTMLElement` - общая сумма заказа.

Конструктор класса принимает контейнер, в котором будет размещаться сообщение об успехе, и объект `actions`, содержащий функцию `onClick`, которая будет вызываться при клике на элемент `_close`.

`constructor(container: HTMLElement, actions: ISuccessActions)`

В конструкторе класса инициализируется элемент `_close`, который представляет собой элемент, который, при клике, должен выполнять какое-то действие. Если объект `actions` содержит функцию `onClick`, то она добавляется в качестве обработчика события `click` для элемента `_close`.

Класс имеет метод `setTotal(total: number)`, который устанавливает значение итоговой суммы заказов.


## Основные типы данных:

```


export interface IProductItem {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | string;
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
	paymentType: PaymentType,
	items: string[],
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
	formErrors: FormErrors[];
}

export interface IOrderStatus { // отвечает за успешность заказа
	status: string;
	totalPrice: number;
}

interface IPage {
	counter: number;
	catalog: HTMLElement[];
	locked: boolean;
}

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

interface ISuccess {
    _total: number;
}

interface ISuccessActions {
    onClick: () => void;
}

interface IModalData {
    content: HTMLElement;
}

interface IFormState {
    valid: boolean;
    errors: string[];
}

interface IBasketView {
    items: HTMLElement[];
    total: number;
}

export interface IPaymentAndAddressForm {
	address: string,
	paymentType: PaymentType,
}

export interface IPaymentPhoneAndEmail {
	phone: string,
	email: string,
}
```


## Вызываемые события:
```

'cards:display'; // При этом событии происходит обновление каталога товаров на странице. Для каждого товар в каталоге создается новая карточка, которая отображается на странице. При вызове этого события вызывается метод render класса Catalogue для отображения товаров.
'cards:show'; //  Выбор продукта - генерируется при выборе карточки. Генерирует класс Card. При выборе товара (нажатии на карточку товара) происходит открытие модального окна, которое показвает товар. Model -> open(), а затем render()
'order:open'; // Открытие формы оформления заказа. Происходит при нажатии кнопки 'Оформить'. Открываются данные для заполнения полей
'order:submit'; // Подтверждение полей формы оформления заказа. Данные с формы Order отправляются на сервер при помощи LarekAPI. перед вызовом этого события  происходит их проверка при помощи validateOrder класса AppState, если все хорошо октрывается Success
'basket:open'; // Открытие корзины. Происходит, когда нажимаем на корзину
'modal:open'; // Блокировка прокрутки страницы при открытии модального окна
'modal:close'; // Разблокировка прокрутки страницы при закрытии модального окна
'card:add'; // Добавление элемента в корзину
'card:delete'; // Удаление элемента из корзины
'contacts:open'; // Открытие элемента контакты


```
