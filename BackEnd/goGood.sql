USE master
GO

IF EXISTS (
	SELECT [name]
	FROM sys.databases
	WHERE [name] = N'GoGood'
)
DROP DATABASE GoGood

-------------------------------------------------------

IF EXISTS (
	SELECT [name]
	FROM sys.databases
	WHERE [name] = N'GoGood'
)
-- if you are not able to drop your DB,
--   use this:
ALTER DATABASE GoGood
SET MULTI_USER
WITH ROLLBACK IMMEDIATE;
GO

-------------------------------------------------------

IF NOT EXISTS (
	SELECT [name]
	FROM sys.databases
	WHERE [name] = N'GoGood')
CREATE DATABASE GoGood
GO

USE GoGood
GO

-------------------------------------------------------
-- Drop all tables --
IF OBJECT_ID('PostPropose','U') IS NOT NULL
DROP TABLE PostPropose
GO

IF OBJECT_ID('PostGallery','U') IS NOT NULL
DROP TABLE PostGallery
GO

IF OBJECT_ID('Post','U') IS NOT NULL
DROP TABLE Post
GO

IF OBJECT_ID('ProfessionalReview','U') IS NOT NULL
DROP TABLE ProfessionalReview
GO

IF OBJECT_ID('ProfessionalField','U') IS NOT NULL
DROP TABLE ProfessionalField
GO

IF OBJECT_ID('PersonImage','U') IS NOT NULL
DROP TABLE PersonImage
GO

IF OBJECT_ID('Person','U') IS NOT NULL
DROP TABLE Person
GO

IF OBJECT_ID('Field','U') IS NOT NULL
DROP TABLE Field
GO

-------------------------------------------------------
-- Create tables

CREATE TABLE Field(
	id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	fieldName NVARCHAR(50)
)
----------------------------------------------------------

CREATE TABLE Person(
	id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	uname NVARCHAR(50),
	phone NVARCHAR(15),
	isAngel BIT,
)

----------------------------------------------------------

CREATE TABLE PersonImage(
	id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	personId INT foreign key references Person(id),
	pImage VARBINARY(max),
)

-------------------------------------------------------

CREATE TABLE Post(
	id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	postTitle NVARCHAR(50),
	postDescription NVARCHAR(200),
	postDate DATETIME DEFAULT CONVERT(DATETIME, GETDATE(),127),
	personId INT FOREIGN KEY REFERENCES Person(id),
	fieldId INT FOREIGN KEY REFERENCES Field(id),
	postLat FLOAT,
	postLng FLOAT,
	proffessionalId INT FOREIGN KEY REFERENCES Person(id),
	handleDate DATETIME,
	postStatus INT,
	isDelete BIT
)

----------------------------------------------------------

CREATE TABLE ProfessionalField(
	id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	personId INT FOREIGN KEY REFERENCES Person(id),
	fieldId INT FOREIGN KEY REferences Field(id)
)

----------------------------------------------------------

CREATE TABLE ProfessionalReview(
	id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	ProfessionalId INT FOREIGN KEY REFERENCES Person(id),
	postId INT FOREIGN KEY REFERENCES Post(id),
	reviewerId INT FOREIGN KEY REFERENCES Person(id),
	reviewDate DATETIME DEFAULT CONVERT(DATETIME, GETDATE(),127),
	review NVARCHAR(100)
)

-------------------------------------------------------

CREATE TABLE PostPropose(
	id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	proffessionalId INT FOREIGN KEY REFERENCES Person(id),
	postId INT FOREIGN KEY REFERENCES Post(id),
)

CREATE TABLE PostGallery(
	id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	postId INT FOREIGN KEY REFERENCES Post(id),
	gallery VARBINARY(max),
)

--------------------------------------------------------

INSERT INTO Field VALUES
(N'כללי'),
(N'חשמל'),
(N'תקשורת'),
(N'שיפוצים'),
(N'הובלה'),
(N'משחקים');

--------------------------------------------------------

--SELECT * FROM PersonImage

--SELECT * FROM Person

--SELECT * FROM Field

--SELECT * FROM Post

--SELECT * FROM PostGallery

--SELECT * FROM ProfessionalInfo

--SELECT * FROM ProfessionalField

--SELECT * FROM ProfessionalReview

--SELECT * FROM PostImage

--SELECT * FROM PostPropose
