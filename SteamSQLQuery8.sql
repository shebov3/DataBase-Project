CREATE DATABASE steam;
USE steam
CREATE TABLE Category(
	CategoryId INT IDENTITY(1,1) PRIMARY KEY,
	[Name] VARCHAR(50) UNIQUE NOT NULL,
	Description VARCHAR(1000) NOT NULL,
);

CREATE TABLE Product(
	ProductId INT IDENTITY(1,1) PRIMARY KEY,
	[Name] varchar(100) UNIQUE NOT NULL,
	Brand varchar(100) NOT NULL,
	[Description] varchar(1000) NOT NULL,
	Rating FLOAT,
	Price INT,
	StockQuantity INT,
	CategoryId INT,
	--CHANGE VARCHAR(MAX) TO VARBINARY(MAX)
	Img VARCHAR(MAX) NOT NULL,
	[Platform] VARCHAR(50) NOT NULL CHECK ([Platform] IN ('PS3', 'PS4', 'PS5', 'PC', 'NINTENDO SWITCH')),
	ReleaseDate DATE NOT NULL,
	FOREIGN KEY (CategoryId) REFERENCES Category(CategoryId)
);

CREATE TABLE Review(
	ReviewId INT IDENTITY(1,1) PRIMARY KEY,
	ProductId INT,
	Rating FLOAT,
	Comment VARCHAR(1000),
	DatePosted DATETIME DEFAULT GETDATE(),
	FOREIGN KEY (ProductId) REFERENCES Product(ProductId)
	ON DELETE CASCADE
);

CREATE TABLE Customer(
	CustomerId INT IDENTITY(1,1) PRIMARY KEY,
	[Password] VARCHAR(1000) NOT NULL,
	[Name] VARCHAR(50) NOT NULL,
	Email VARCHAR(100) UNIQUE NOT NULL,
	DateOfBirth DATE NOT NULL,
	DateOfRegisteration DATETIME DEFAULT GETDATE(),
	Country VARCHAR(20) NOT NULL,
	City VARCHAR(20) NOT NULL,
	Street VARCHAR(20),
	[State] VARCHAR(100),
	ZIP INT,
	AdminState INT DEFAULT 0
);

CREATE TABLE Cart(
	CartId INT IDENTITY(1,1) PRIMARY KEY,
	CustomerId INT,
	FOREIGN KEY (CustomerId) REFERENCES Customer(CustomerId)
	ON DELETE CASCADE
);

CREATE TABLE CartItem(
	CartItemId INT IDENTITY(1,1) PRIMARY KEY,
	Quantity INT,
	CartId INT,
	ProductId INT,
	FOREIGN KEY (ProductId) REFERENCES Product(ProductId)
	ON DELETE CASCADE,
	FOREIGN KEY (CartId) REFERENCES Cart(CartId)
	ON DELETE CASCADE
);


CREATE TABLE TheOrder(
	OrderId INT IDENTITY(1,1) PRIMARY KEY,
	CustomerId INT,
	[Status] VARCHAR(20),
	PaymentStatus VARCHAR(20),
	OrderDate DATETIME DEFAULT GETDATE(),
	TotalAmount INT,
	AmountPaid INT,
	PaymentMethod INT NOT NULL,
	FOREIGN KEY (CustomerId) REFERENCES Customer(CustomerId)
	ON DELETE CASCADE
);

CREATE TABLE OrderItem(
	OrderItemId INT IDENTITY(1,1) PRIMARY KEY,
	Price INT,
	OrderId INT,
	FOREIGN KEY (OrderId) REFERENCES TheOrder(OrderId)
	ON DELETE CASCADE
);

CREATE TABLE OrderItemProducts(
	OrderItemId INT,
	ProductId INT,
	Quantity INT,
	FOREIGN KEY (OrderItemId) REFERENCES OrderItem(OrderItemId)
	ON DELETE CASCADE,
	FOREIGN KEY (ProductId) REFERENCES Product(ProductId)
	ON DELETE CASCADE,
	PRIMARY KEY (OrderItemId, ProductId)
);

CREATE TABLE CPhone(
	CustomerId INT,
	Phone INT,
	FOREIGN KEY (CustomerId) REFERENCES Customer(CustomerId)
	ON DELETE CASCADE,
	PRIMARY KEY (CustomerId, Phone)
);


SELECT *
FROM Customer