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
- src/styles/styles.scss — корневой файл стилей
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

## Описание Данных

Интерфейс для описания данных товара

```TypeScript
interface IProductItem {
	id: string; //id товара
	description: string; //описание товара
	image: string; //изображение товара
	title: string; //название товара
	category: string; //категория товара
	price: number | null; //цена товара
  inBasket: boolean; //наличие в корзине
}
```

Интерфейс для описания данных состояния приложения

```TypeScript
interface IAppState {
  catalog: IProductItem[]; //все товары в каталоге
  basket: IProductItem[]; //корзина с товарами
  preview: string | null; //id товара в окне просмотра
  order: IOrder | null; //данные о заказе
}
```

Интерфейс для описания данных формы достваки

```TypeScript
interface IDeliveryOrderForm {
  payment: string; //способ оплаты
  address: string; //адрес доставки
}
```

Интерфейс для описания данных формы контакты

```TypeScript
interface IContactOrderForm {
  email: string; //электронная почта
  phone: string; //телефон
}
```

Интерфейс для описания данных всего заказа

```TypeScript
interface IOrder extends IDeliveryOrderForm, IContactOrderForm {
  total: number; //сумма заказа
  items: string[]; //id всех товаров в заказе
}
```

Тип ошибок форм.

```TypeScript
type FormErrors = Partial<Record<keyof IOrder, string>>;
```

Интерфейс для описания данных ответа сервера на заказ

```TypeScript
interface IOrderResult {
	id: string; //id заказа
	total: number; //сумма заказа
}
```

Интерфейс для описания данных обработчика валидности формы

```TypeScript
interface IFormState {
  valid: boolean; //указывает является ли форма допустимой
  errors: string[]; //массив ошибкок валидации формы
}
```

Интерфейс для описания данных модального окна

```TypeScript
interface IModalData {
  content: HTMLElement; //элемент отображаемый внутри модального окна
}
```

Интерфейс для описания данных главной страницы

```TypeScript
interface IPage {
  counter: number; //счетчик корзины
  catalog: HTMLElement[]; //массив карточек
}
```

Интерфейс для описания данных карточки

```TypeScript
interface ICard {
  title: string; //название товара
  image: string; //изображение товара
	description: string; //описание товара
	category: string; //категория товара
	price: number | null; //цена товара
  index: string; //порядковый номер в корзине
  inBasket: boolean; //наличие в корзине
}
```

Интерфейс для описания данных корзины

```TypeScript
interface IBasketView {
  items: HTMLElement[]; //массив карточек
  total: number; //сумма товаров
}
```

Интерфейс для описания данных спосба оплаты и доставки

```TypeScript
interface IDeliveryOrderForm {
  payment: string; //способ оплаты
	address: string; //адрес доставки
}
```

Интерфейс для описания данных контакты

```TypeScript
interface IContactOrderForm {
  email: string; //электронная почта
	phone: string; // номер телефона
}
```

Интерфейс для описания данных успешного заказа

```TypeScript
interface ISuccess {
  total: number; //сумма заказа
}
```

Интерфейс для описания действия в конструктор карты

```TypeScript
interface ICardActions {
  onClick: (event: MouseEvent) => void; //нажатие мыши
}
```

Интерфейс для описания действия в конструктор успешного заказа

```TypeScript
interface ISuccessActions {
  onClick: () => void; //любое действие
}
```

## Базовые классы

### Класс API

Предоставляет удобный интерфейс для выполнения HTTP-запросов к указанному базовому URL-адресу

Свойства:

- readonly baseUrl: string; - базовый URL, который используется для всех запросов API
- protected options: RequestInit; - объект опций, который содержит настройки для HTTP-запросов

Конструктор:

- constructor(baseUrl: string, options: RequestInit = {})

Методы:

- protected handleResponse(response: Response) - защищенный метод, обрабатывает ответ от HTTP-запроса, проверяет успешность ответа и разрешает или отклоняет Promise в зависимости от статуса ответа
- get(uri: string) - отправляет GET-запрос по указанному uri, используя базовый URL и опции, заданные при создании класса
- post(uri: string, data: object, method: ApiPostMethods = 'POST') - отправляет POST-запрос по указанному uri с переданными данными в теле запроса

### Класс ProductAPI

Дополнительный класс взаимодействия с API для получения информации о товарах и оформления заказов

Свойства:

- readonly cdn: string; - URL для обработки изображений

Методы:

- getProductItemList() - получение списка продуктов
- getProductItem() - получение продукта
- orderProducts() - отправляет информацию о заказе на сервер, возвращает результат заказа

### Класс Component

Абстрактный класс, который является основой для всех компонентов пользовательского интерфейса и используется в их создании

Конструктор:

- constructor(container: HTMLElement) - контейнер в который будет помещен компонент

Методы:

- toggleClass(element: HTMLElement, className: string, force?: boolean) - переключает класс указанного элемента
- protected setText(element: HTMLElement, value: unknown) - устанавливает текстовое содержимое
- setDisabled(element: HTMLElement, state: boolean) - устанавливает состояние блокировки
- protected setHidden(element: HTMLElement) - скрывает указанный элемент
- protected setVisible(element: HTMLElement) - показывает указанный элемент
- protected setImage(element: HTMLImageElement, src: string, alt?: string) - установить изображение с алтернативным текстом
- render(data?: Partial<T>) - возвращает корневой DOM-элемент

### Класс EventEmitter

Предоставляет механизм для управления событиями

Свойства:

- \_events: Map - хранилище событий

Конструктор:

- constructor() - конструктор не принимает никаких параметров. Он инициализирует внутреннюю структуру \_events, представляющую собой карту событий и их подписчиков

Методы:

- on() - устанавливает обработчик для указанного события
- off() - удаляет обработчик для указанного события
- emit() - инициирует событие с указанными данными
- onAll() - устанавливает обработчик для всех событий
- offAll() - удаляет все обработчики событий
- trigger() - создает функцию-триггер, которая инициирует указанное событие при вызове

### Класс Model

Абстрактный класс базовой модели данных.

Конструктор:

- constructor(data: Partial<T>, events: IEvents) - конструктор принимает данные модели и объект событий для уведомления об изменениях в модели

Методы:

- emitChanges(event: string, payload?: object) - уведомляет подписчиков о изменении модели с указанным событием и данными

## Модели данных

### Класс AppState

```
class AppState extends Model<IAppState>
```

Используется для управления состоянием приложения, хранения данных и выполнения операций с ними

Конструктор:

- constructor() - наследуется от Model

Свойства:

- catalog: IProductItem[] - массив товаров
- basket: string[] - массив товаров в корзине
- order: IOrder - объект данных о заказе
- preview: string | null - id товара
- formErrors: FormErrors - объект с ошибками форм

Методы:

- addToBasket() - добавляет товар в корзину
- clearBasket() - очищает корзину
- setCatalog() - устанавливает каталог товаров и уведомляет об изменении каталога
- setPreview() - устанавливает предпросмотр товара и уведомляет об изменении предпросмотра
- setDeliveryField() - устанавливает значения в данные доставки
- setContactField() - устанавливает значения в данные контактов заказа
- removeFromBasket() - удаляет товар из корзины
- updateBasket() - обновляет состояние корзины
- validateDeliveryOrder() - проверяет корректность заполнения полей формы доставки и способа оплаты и уведомляет об ошибках валидации
- validateContactOrder() - проверяет корректность заполнения полей контактные данные и уведомляет об ошибках валидации

## Компоненты представления

### Класс Form

```
class Form<T> extends Component<IFormState>
```

Представляет собой компонент формы, расширяющий базовый Component. Обеспечивает функционал для работы с формами, включая управление состоянием, валидацию и обработку событий

Конструктор:

- constructor(container: HTMLFormElement, events: IEvents) - конструктор принимает контейнер формы и объект событий, используемый для управления событиями формы

Методы:

- protected onInputChange() - обработчик изменения значения поля ввода
- set valid(value: boolean) - устанавливает состояние валидности формы
- set errors(value: string) - устанавливает сообщения об ошибках формы
- render() - рендерит состояние формы

### Класс Modal

```
class Modal extends Component<IModalData>
```

Представляет собой компонент модального окна, расширяющий базовый Component. Обеспечивает функционал для открытия, закрытия и управления содержимым модального окна

Конструктор:

- constructor(container: HTMLElement, events: IEvents) - конструктор принимает контейнер модального окна и объект событий, используемый для управления событиями модального окна

Методы:

- set content(value: HTMLElement) - устанавливает содержимое модального окна
- open() - открывает модальное окно
- close() - закрывает модальное окно
- render(data: IModalData) - подготавливает размётку (content) и открывает модальное окно

### Класс Page

```
class Page extends Component<IPage>
```

Представляет собой компонент страницы, расширяющий базовый Component. Используется для управления содержимым и состоянием страницы

Свойства:

- \_counter - счетчик корзины
- \_catalog - каталог товаров
- \_wrapper - обертка страницы
- \_basket - корзина

Конструктор:

- constructor(container: HTMLElement, events: IEvents) - конструктор принимает контейнер элемента страницы и объект событий, используемый для управления событиями страницы

Методы:

- set counter() - устанавливает значение счетчика корзины
- set catalog() - устанавливает содержимое каталога товаров
- set locked() - управляет состоянием блокировки страницы

### Класс Card

```
class Card extends Component<ICard>
```

Представляет собой компонент для отображения и управления карточками товара, расширяющий базовый Component

Свойства:

- \_title - название продукта
- \_image - изображение продукта
- \_description - описание продукта
- \_button - кнопка действия на карточке продукта
- \_price - цена товара
- \_category - категория товара
- \_index - порядковый номер в корзине

Конструктор:

- constructor(container: HTMLElement, actions?: ICardActions) - конструктор принимает контейнер карточки и объект событий, используемый для управления кнопкой

Методы:

- set id() - устанавливает идентификатор карточки товара
- get id() - получает идентификатор карточки товара
- set title() - устанавливает название товара
- get title() - получает название товара
- set price() - устанавливает цену товара и переключает доступ к кнопке действия на карточке продукта
- get price() - получает цену товара
- set category() - устанавливает категорию товара
- get category() - получает категорию товара
- set image - устанавливает изображение товара
- set description() - устанавливает описание товара
- set index() - устанавливает порядковый номер в корзине
- get index() - получает порядковый номер в корзине
- set inBasket() - устанавливает наличие в корзине

### Класс Basket

```
class Basket extends Component<IBasketView>
```

Представляет компонент корзины, расширяющий базовый Component. Используется для отображения и управления корзиной

Свойства:

- \_list - список товаров в корзине
- \_total - сумма товаров в корзине
- \_button - кнопка оформить заказ

Конструктор:

- constructor(container: HTMLElement, events: EventEmitter) - конструктор принимает контейнер корзины и объект событий, используемый для управления событиями корзины

Методы:

- set items() - устанавливает товары в корзину
- set total() - устанавливает полную сумму заказа в корзине

### Класс DeliveryOrderForm

```
class DeliveryOrderForm extends Form<IDeliveryOrderForm>
```

Представляет класс управления формой доставки и способа оплаты

Свойства:

- \_payOn - кнопка оплаты при получении
- \_online - кнопка оплаты онлайн

Конструктор:

- constructor(container: HTMLFormElement, events: IEvents, actions?: ICardActions) - конструктор принимает контейнер формы доставки и способа оплаты и объект событий, используемый для управления событиями формы доставки и способа оплаты

Методы:

- paymentButton() - выбор способа оплаты
- set address() - устанавливает адрес доставки

### Класс ContactOrderForm

```
class ContactOrderForm extends Form<IContactOrderForm>
```

Представляет класс управления формой контактные данные. Наследует класс Form

Конструктор:

- constructor(container: HTMLFormElement, events: IEvents) - конструктор принимает контейнер формы контактные данные и объект событий, используемый для управления событиями формы контактные данные

Методы:

- set phone() - устанавливает номер телеыфона
- set email() - устанавливает электронную почту

### Класс Success

```
class Success extends Component<ISuccess>
```

Представляет компонент успешная оплата, расширяющий базовый Component

Свойства:

- \_closeBtn - кнопка зыкрыть
- \_total - информация об успешной оплате

Конструктор:

- constructor(container: HTMLElement, actions: ISuccessActions) - конструктор принимает контейнер успешной оплаты и назначает обработчики событий

Методы:

- set result() - устанавливает сообщение об успешной оплате

## Описание событий

### items:changed

Событие срабатывает при изменении товаров каталога

### card:select

Событие срабатывает при открытии карточки товара

### preview:changed

Событие вызываемое при изменении открытого выбранного товара

### product:add

Событие вызываемое при добавлении открытого выбранного товара в корзину

### product:delete

Событие вызываемое при удалении открытого выбранного товара в корзину

### basket:changed

Событие вызываемое при изменение корзины

### basket:open

Событие вызываемое при открытии корзины

### deliveryOrder:open

Событие вызываемое при открытии формы способа оплаты и достваки

### payment:toggle

Событие вызываемое при изменении способа оплаты

### formErrors:change

Событие возникающее при изменении состояния валидации формы

### /^deliveryOrder\..\*:change/

Событие срабатывающее при изменении полей способа оплаты и доставки

### delivery:ready

Событие срабатывающее при готовности перехода полей способа оплаты и доставки

### /^orderContacts\..\*:change/

Событие срабатывающее при изменении полей контактов

### contact:ready

Событие срабатывающее при готовности перехода полей контактов

### deliveryOrder:submit

Событие перехода к форме полей полей способа оплаты и доставки

### contactOrder:submit

Событие перехода к форме полей полей контактов

### modal:open

Событие происходящее при открытии модального окна

### modal:close

Событие срабатывающее при закрытии модального окна
