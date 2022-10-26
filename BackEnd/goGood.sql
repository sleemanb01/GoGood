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

IF OBJECT_ID('Post','U') IS NOT NULL
DROP TABLE Post
GO

IF OBJECT_ID('ProfessionalReview','U') IS NOT NULL
DROP TABLE ProfessionalReview
GO

IF OBJECT_ID('PersonRating','U') IS NOT NULL
DROP TABLE PersonRating
GO

IF OBJECT_ID('ProfessionalInfo','U') IS NOT NULL
DROP TABLE ProfessionalInfo
GO

IF OBJECT_ID('ProfessionalField','U') IS NOT NULL
DROP TABLE ProfessionalField
GO

IF OBJECT_ID('PersonImage','U') IS NOT NULL
DROP TABLE PersonImage
GO

IF OBJECT_ID('PostGallery','U') IS NOT NULL
DROP TABLE PostGallery
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
	id int IDENTITY(1,1) NOT NULL PRIMARY KEY,
	fieldName nvarchar(50)
)
----------------------------------------------------------

CREATE TABLE Person(
	id int IDENTITY(1,1) NOT NULL PRIMARY KEY,
	uname nvarchar(50),
	phone nvarchar(15),
)

----------------------------------------------------------

CREATE TABLE PersonImage(
	id int IDENTITY(1,1) NOT NULL PRIMARY KEY,
	personId int foreign key references Person(id),
	pImage varbinary(max),
)

-------------------------------------------------------

CREATE TABLE Post(
	id int IDENTITY(1,1) NOT NULL PRIMARY KEY,
	postTitle nvarchar(50),
	postDescription nvarchar(200),
	postDate date DEFAULT CONVERT(DATE, GETDATE(),105),
	personId int FOREIGN KEY REFERENCES Person(id),
	fieldId int FOREIGN KEY REFERENCES Field(id),
	postLat FLOAT NOT NULL,
	postLng FLOAT NOT NULL,
	proffessionalId INT FOREIGN KEY REFERENCES Person(id),
	postStatus int,
	isDelete int
)

-------------------------------------------------------

CREATE TABLE ProfessionalInfo(
	id int IDENTITY(1,1) NOT NULL PRIMARY KEY,
	personId int FOREIGN KEY REFERENCES Person(id),
	formalImage varbinary(max),
	rating float,
	numberOfRaters int
)

----------------------------------------------------------

CREATE TABLE ProfessionalField(
	id int IDENTITY(1,1) NOT NULL PRIMARY KEY,
	personId int FOREIGN KEY REFERENCES Person(id),
	fieldId int FOREIGN KEY REferences Field(id)
)

----------------------------------------------------------

CREATE TABLE ProfessionalReview(
	id int IDENTITY(1,1) NOT NULL PRIMARY KEY,
	ProfessionalId int FOREIGN KEY REFERENCES ProfessionalInfo(id),
	reviewer int FOREIGN KEY REFERENCES Person(id),
	reviewDate date DEFAULT CONVERT(DATE, GETDATE(),105),
	review nvarchar(100)
	
)

-------------------------------------------------------

CREATE TABLE PostPropose(
	id int IDENTITY(1,1) NOT NULL PRIMARY KEY,
	proffessionalId INT FOREIGN KEY REFERENCES Person(id),
	postId INT FOREIGN KEY REFERENCES Post(id)
)

CREATE TABLE PostGallery(
	id int IDENTITY(1,1) NOT NULL PRIMARY KEY,
	postId INT FOREIGN KEY REFERENCES Post(id),
	gallery varbinary(max),
)

--------------------------------------------------------


INSERT INTO Field VALUES
(N'כללי'),
(N'מזון ומוצרי בסיס'),
(N'ציוד לבית'),
(N'תיקונים'),
(N'טרמפ והובלה'),
(N'בגדים ומשחקים');


INSERT INTO Person VALUES
(N'אבי מלכה', '1111111111'),
(N'איציק כהן', '2221111111'),
(N'מיקה שובל', '3331111111' ),
(N'דני אבודבול', '4441111111'),
(N'דורון חיים', '5551111111'),
(N'שחר חסון', '6661111111' );


INSERT INTO Post VALUES
(N'ניקוי גינה', N'אם יש פה מישהו שמוכן לעזור לי לנקות את הגינה', '1998-03-21',1,1,31.964506306707936, 34.77783014153068,3,0,0),
(N'תיקון אלקטרוניקה', N'יש לי בעיה במזגן', '2001-05-15',1,2,32.00504574325504, 34.76568276544381,4,0,0),
(N'עזרה בתרופות', N'אני מבקשת תרופות...',  '2002-07-21' ,2,3,32.03982836595897, 34.750881801295776,5,1,0),
(N'עזרה בעוד תרופות', N'מבקשת שמישהו יעזור לי עם תרופות***', '1999-09-30',2,3,32.065451711573175, 34.777286518503125,6,2,0);


--CREATE TABLE ProfessionalFields(
--	id int IDENTITY(1,1) NOT NULL PRIMARY KEY,
--	professionaInfoId int FOREIGN KEY REFERENCES ProfessionalInfo(id),
--	fieldId int FOREIGN KEY REferences Field(id)
--)


INSERT INTO ProfessionalInfo VALUES
(3, 000000, 1,0),
(4 ,000000,2,5),
(5, 000000, 3 ,10),
(5, 000000, 3 ,0);

INSERT INTO ProfessionalField VALUES
(1,3),
(1,2),
(2,1),
(3,1)


INSERT INTO ProfessionalReview VALUES
(1, 5, '2022-03-1',N'תותח'),
(1, 2,'2022-03-2',N'יפה מאוד'),
(2 ,1,'2022-03-3',N'לא רע'),
(3, 1, '2022-03-4' ,N'מעולה');

----------------------------------------------------------


INSERT INTO PostPropose VALUES
(3, 1),
(4, 2),
(5, 3),
(6, 3),
(5, 4),
(6, 4);


select * from PersonImage

select * from Person

--select * from Field

select * from Post

select * from PostGallery

--select * from ProfessionalInfo

select * from ProfessionalField

--select * from ProfessionalReview

--select * from PostImage

select * from PostPropose
