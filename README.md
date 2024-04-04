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

## Базовые классы 

### Класс API

Предоставляет удобный интерфейс для выполнения HTTP-запросов к указанному базовому URL-адресу

Свойства:
- readonly baseUrl: string; - базовый URL, который используется для всех запросов API
- protected options: RequestInit; - объект опций, который содержит настройки для HTTP-запросов

Методы:
- protected handleResponse(response: Response) - защищенный метод, обрабатывает ответ от HTTP-запроса, проверяет успешность ответа и разрешает или отклоняет Promise в зависимости от статуса ответа
- get(uri: string) - отправляет GET-запрос по указанному uri, используя базовый URL и опции, заданные при создании класса
- post(uri: string, data: object, method: ApiPostMethods = 'POST') - отправляет POST-запрос по указанному uri с переданными данными в теле запроса

### Класс Component

Абстрактный класс, который является основой для всех компонентов пользовательского интерфейса и используется в их создании

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
- _events: Map - хранилище событий

Методы:
- on() - устанавливает обработчик для указанного события
- off() - удаляет обработчик для указанного события
- emit() - инициирует событие с указанными данными
- onAll() - устанавливает обработчик для всех событий
- offAll() - удаляет все обработчики событий
- trigger() - создает функцию-триггер, которая инициирует указанное событие при вызове

### Класс Model

Абстрактный класс базовой модели данных.

Методы:
- emitChanges(event: string, payload?: object) - уведомляет подписчиков о изменении модели с указанным событием и данными

## Модели данных 

### Класс AppState

Используется для управления состоянием приложения, хранения данных и выполнения операций с ними

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
- validateOrder() - проверяет корректность заполнения полей заказа и уведомляет об ошибках валидации

## Компоненты представления 

### Класс Form

Представляет собой компонент формы, расширяющий базовый Component. Обеспечивает функционал для работы с формами, включая управление состоянием, валидацию и обработку событий

Методы:
- protected onInputChange() - обработчик изменения значения поля ввода
- set valid(value: boolean) - устанавливает состояние валидности формы
- set errors(value: string) - устанавливает сообщения об ошибках формы
- render() - рендерит состояние формы

### Класс Modal

Представляет собой компонент модального окна, расширяющий базовый Component. Обеспечивает функционал для открытия, закрытия и управления содержимым модального окна

Методы:
- set content(value: HTMLElement) - устанавливает содержимое модального окна
- open() - открывает модальное окно
- close() - закрывает модальное окно
- render(data: IModalData) - рендерит модальное окно с переданным содержимым и открывает его



## Описание событий 