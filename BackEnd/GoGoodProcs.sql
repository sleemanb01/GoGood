
USE [GoGood]
GO

--------------------------------------------------------

CREATE PROCEDURE getProposes
@List NVARCHAR(MAX)

AS
BEGIN
	SELECT *
	FROM PostPropose
	WHERE PostPropose.postId IN( SELECT postId = Item FROM SplitInts(@List, ',')); 
END
GO

--DROP Procedure getProposes
--GO

--exec getProposes '1,5'
--GO

--------------------------------------------------------

CREATE PROCEDURE getGallery
@List NVARCHAR(MAX)

AS
BEGIN
	SELECT *
	FROM PostGallery
	WHERE PostGallery.postId IN( SELECT postId = Item FROM SplitInts(@List, ',')); 
END
GO

--DROP Procedure getGallery
--GO

--exec getGallery '2,5'
--GO

---------------------------------

CREATE PROCEDURE deleteAllPropose
@postId INT

AS
BEGIN
	DELETE FROM PostPropose
	WHERE @postId = postId
END
GO

--DROP Procedure deleteAllPropose
--GO

--exec deleteAllPropose 3
--GO

--------------------------------------------------------

CREATE PROCEDURE putDPerson
@id INT,
@uname NVARCHAR(50),
@phone NVARCHAR(10),
@image VARBINARY(MAX) = NULL,
@isAngel BIT

AS
BEGIN
	DECLARE @targetId INT
	SET @targetId = (SELECT Person.id FROM Person WHERE Person.id = @id)
	IF @targetId IS NOT NuLL
	BEGIN
		UPDATE Person
		SET uname = @uname, phone = @phone, isAngel = @isAngel
		WHERE id = @targetId
		IF @image IS NOT NULL
		BEGIN
			DECLARE @imageId INT
			SET @imageId = (SELECT PersonImage.id FROM PersonImage WHERE PersonImage.personId = @targetId)
			IF @imageId IS NOT NULL
			BEGIN
				UPDATE PersonImage
				SET pImage = @image
				WHERE personId = @targetId
			END
			ELSE
			BEGIN
				INSERT INTO PersonImage VALUES(@targetId, @image)
			END
		END

		SELECT Person.*, PersonImage.pImage
		FROM Person left join PersonImage
		ON Person.id = PersonImage.personId
		WHERE Person.id = @targetId
	END
END
GO

--exec putDPerson 1, 'dd3 ddd', '1233211230', NULL

--DROP Procedure putDPerson
--GO

--SELECT * FROM Person

------------------------------------------------------------------

CREATE PROCEDURE getFieldsByPersonId
@personId INT

AS
BEGIN

		SELECT Field.* FROM Field
		INNER JOIN ProfessionalField ON 
		ProfessionalField.fieldId = Field.id
		WHERE ProfessionalField.personId = @personId
END
GO

--exec getFieldsByPersonId 1

--DROP Procedure getFieldsByPersonId
--GO

------------------------------------------------------------------

CREATE PROCEDURE signInUp
@uname NVARCHAR(50),
@phone NVARCHAR(10)

AS
BEGIN
	DECLARE @temp AS NVARCHAR(50)
	SET @temp = (SELECT id FROM Person WHERE @phone = phone)
	IF @temp is null
		BEGIN
			INSERT INTO Person VALUES 
			(@uname, @phone,null)
			SET @temp = (SELECT id FROM Person WHERE @phone = phone)
		END
	ELSE
		BEGIN
			DECLARE @tmpUname AS NVARCHAR(50)
			SET @tmpUname = (SELECT uname FROM Person WHERE @temp = id)
			IF(@tmpUname != @uname)
				BEGIN
					UPDATE Person
					SET uname = @uname
					WHERE id = @temp
				END
		END

		SELECT Person.*, PersonImage.pImage
		FROM Person left join PersonImage
		ON Person.id = personImage.personId
		WHERE Person.id = @temp
END
GO

--exec signInUp 'dd3 ddd', '0548879522'

--DROP Procedure signInUp
--GO

--SELECT * FROM Person

------------------------------------------------------------------

CREATE PROCEDURE getPostsByPerson
@PersonId INT

AS
BEGIN
	SELECT Post.id, Post.postTitle, Post.postDescription, postDate, Post.personId, Post.postLng, Post.postLat, Post.proffessionalId, Post.handleDate , Post.postStatus, Post.fieldId
	  FROM Post
	  WHERE Post.isDelete = 0 AND Post.personId = @PersonId
end
GO

--exec getPostsByPerson 2
--GO

--DROP Procedure getPostsByPerson
--GO

------------------------------------------------------------------

CREATE PROCEDURE getPostsByPro
@proId int

AS
BEGIN
	SELECT Post.id, Post.postTitle, Post.postDescription, postDate, Post.personId, Post.postLng, Post.postLat, Post.proffessionalId, Post.handleDate, Post.postStatus, Post.fieldId
	FROM Post LEFT JOIN Field 
	ON Field.id = Post.fieldId 
	WHERE Post.isDelete = 0 AND Post.proffessionalId = @proId

end
GO

--exec getPostsByPro 3
--GO

--DROP Procedure getPostsByPro
--GO

------------------------------------------------------------------

 CREATE PROCEDURE GetPostsByFields
 @List NVARCHAR(MAX)
 AS
 BEGIN
      
      SELECT Post.id, Post.postTitle, Post.postDescription, postDate, Post.personId, Post.postLng, Post.postLat, Post.proffessionalId, Post.handleDate, Post.postStatus, Post.fieldId
	  FROM Post LEFT JOIN Field 
	  ON Field.id = Post.fieldId 
	  WHERE Post.isDelete = 0 AND Post.postStatus !=0 AND
	  fieldId IN( SELECT fieldId = Item FROM SplitInts(@List, ',')); 

 END
 GO

-- exec GetPostsByFields '3,0'

--DROP Procedure GetPostsByFields
--GO

------------------------------------------------------------------

 CREATE PROCEDURE getReviews
 @id INT
 AS
 BEGIN
      
      SELECT *
	  FROM ProfessionalReview 
	  WHERE ProfessionalReview.ProfessionalId=@id 
 END
 GO

--DROP Procedure getReviews
--GO

--exec getReviews 1
--GO

------------------------------------------------------------------


 CREATE PROCEDURE getDPeople
 @List NVARCHAR(MAX)
 AS
 BEGIN
      
	SELECT Person.*, PersonImage.pImage
	FROM Person LEFT JOIN PersonImage 
	ON Person.id = PersonImage.personId 
	WHERE Person.id IN( SELECT id = Item FROM SplitInts(@List, ',')); 

 END
 GO

--DROP Procedure getDPeople
--GO

--exec getDPeople '1,'
--GO

------------------------------------------------------------------
--------------------------- FUNCTIONS ---------------------------

CREATE FUNCTION SplitInts
(
   @List      VARCHAR(MAX),
   @Delimiter VARCHAR(255)
)
RETURNS TABLE
AS
  RETURN ( SELECT Item = CONVERT(INT, Item) FROM
      ( SELECT Item = x.i.value('(./text())[1]', 'varchar(max)')
        FROM ( SELECT [XML] = CONVERT(XML, '<i>'
        + REPLACE(@List, @Delimiter, '</i><i>') + '</i>').query('.')
          ) AS a CROSS APPLY [XML].nodes('i') AS x(i) ) AS y
      WHERE Item IS NOT NULL
  );
GO

--DROP FUNCTION SplitInts
--GO

