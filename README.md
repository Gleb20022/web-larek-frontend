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
export interface IProductItem {
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
export interface IAppState {
  catalog: IProductItem[]; //все товары в каталоге
  basket: IProductItem[]; //корзина с товарами
  preview: string | null; //id товара в окне просмотра
  order: IOrder | null; //данные о заказе
}
```

Интерфейс для описания данных формы достваки

```TypeScript
export interface IDeliveryOrderForm {
  payment: string; //способ оплаты
  address: string; //адрес доставки
}
```

Интерфейс для описания данных формы контакты

```TypeScript
export interface IContactOrderForm {
  email: string; //электронная почта
  phone: string; //телефон
}
```

Интерфейс для описания данных всего заказа

```TypeScript
export interface IOrder extends IDeliveryOrderForm, IContactOrderForm {
  total: number; //сумма заказа
  items: string[]; //id всех товаров в заказе
}
```

Тип ошибок форм

```TypeScript
export type FormErrors = Partial<Record<keyof IOrder, string>>;
```

Интерфейс для описания данных ответа сервера на заказ

```TypeScript
export interface IOrderResult {
	id: string; //id заказа
	total: number; //сумма заказа
}
```
## Модели данных 

## Компоненты представления 

## Описание событий 
