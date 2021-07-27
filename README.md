# borm-marketplace

## What it does
* this application is a backend database manager for an e-commerce site
* It allows you to create, update, delete, and view data from a mySQL database named ecommerce_db

## Features
* Uses sequalize to allow javascript to manipulate MySQL data
* Uses express to cast the app on a local computer server
* Shows related tables info together.

## How to Use
* Download libraries from node with the command npm i or npm install
* add a .env file with corresponding DB_NAME, DB_USER, DB_PW for database name, MySQL username and password
* Run the command npm start
* The database can be manipulated from insomnia by tuning to http://localhost:3001
* To access Categories table use http://localhost:3001/api/categories
* To access Products table use http://localhost:3001/api/products
* To access Tag table use http://localhost:3001/api/tags
* To add a new category use the format... 
```
[{
    "category_name": "food"
}]
```
* To add a new Product...
```
[{
    "product_name": "Basket",
      "price": 20.00,
      "stock": 3,
      "tagIds": [3, 2, 5]
}]
```
* To add a new Tag
```
[{
    "tag_name": "tag"
}]
```
* Responses will ne returned in json format