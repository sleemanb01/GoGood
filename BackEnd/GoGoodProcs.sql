
USE [GoGood]
GO

--------------------------------------------------------

CREATE PROCEDURE getProposes
@List nvarchar(max)

as
begin
	--SELECT *
	--FROM PostPropose
	--WHERE @postId = postId

	select *
	  from PostPropose
	  WHERE PostPropose.postId IN( SELECT postId = Item FROM SplitInts(@List, ',')); 
end
GO

DROP Procedure getProposes
GO

exec getProposes '2,5'
GO

--------------------------------------------------------

CREATE PROCEDURE getGallery
@List nvarchar(max)

as
begin
	--SELECT *
	--FROM PostPropose
	--WHERE @postId = postId

	select *
	  from PostGallery
	  WHERE PostGallery.postId IN( SELECT postId = Item FROM SplitInts(@List, ',')); 
end
GO

DROP Procedure getGallery
GO

exec getGallery '2,5'
GO

---------------------------------

CREATE PROCEDURE deletePropose
@postId int,
@professionalId int

as
begin
	DELETE FROM PostPropose
	WHERE @postId = postId AND @professionalId = proffessionalId
end
GO

exec deletePropose 3, 5
GO

---------------------------------

CREATE PROCEDURE deleteAllPropose
@postId int

as
begin
	DELETE FROM PostPropose
	WHERE @postId = postId
end
GO

exec deleteAllPropose 3
GO


--------------------------------------------------------

CREATE PROCEDURE putDPerson
@id int,
@uname nvarchar(50),
@phone nvarchar(10),
@image varbinary(max) = NULL,
@isAngel bit

as
begin
	DECLARE @targetId int
	set @targetId = (select Person.id from Person where Person.id = @id)
	if @targetId IS NOT NuLL
	begin
		update Person
		set uname = @uname, phone = @phone, isAngel = @isAngel
		where id = @targetId
		if @image IS NOT NULL
		begin
			declare @imageId int
			set @imageId = (select PersonImage.id from PersonImage where PersonImage.personId = @targetId)
			if @imageId IS NOT NULL
			begin
				update PersonImage
				set pImage = @image
				where personId = @targetId
			end
			else
			begin
				insert into PersonImage VALUES(@targetId, @image)
			end
		end

		select Person.*, PersonImage.pImage
		from Person left join PersonImage
		on Person.id = PersonImage.personId
		where Person.id = @targetId
	end
end
go

exec putDPerson 1, 'dd3 ddd', '1233211230', NULL

DROP Procedure putDPerson
GO

select * from Person

------------------------------------------------------------------

CREATE PROCEDURE getFieldsByPersonId
@personId int

as
begin

		select Field.* from Field
		inner join ProfessionalField on 
		ProfessionalField.fieldId = Field.id
		where ProfessionalField.personId = @personId
end
go

exec getFieldsByPersonId 1

DROP Procedure getFieldsByPersonId
GO

------------------------------------------------------------------

CREATE PROCEDURE signInUp
@uname nvarchar(50),
@phone nvarchar(10)

as
begin
	declare @temp as nvarchar(50)
	set @temp = (select id from Person where @phone = phone)
	if @temp is null
		begin
			INSERT INTO Person VALUES 
			(@uname, @phone,null)
			set @temp = (select id from Person where @phone = phone)
		end
	else
		begin
			declare @tmpUname as nvarchar(50)
			set @tmpUname = (select uname from Person where @temp = id)
			if(@tmpUname != @uname)
				begin
					update Person
					set uname = @uname
					where id = @temp
				end
		end

		select Person.*, PersonImage.pImage
		from Person left join PersonImage
		on Person.id = personImage.personId
		where Person.id = @temp

		--update #finalRes set personImage = 0 where personImage IS NULL

		--select * from #finalRes

		--select Field.id, Field.fieldName from Field
		--inner join ProfessionalField on 
		--ProfessionalField.fieldId = Field.id
		--where ProfessionalField.personId = @temp
end
go



exec signInUp 'dd3 ddd', '0548879522'

DROP Procedure signInUp
GO

select * from Person

------------------------------------------------------------------

--CREATE PROCEDURE getPersonFields
--@id INT

--as
--begin
--	declare @FieldIds as table(fieldId INT)
--	insert into @FieldIds select ProfessionalField.fieldId From ProfessionalField WHERE ProfessionalField.personId = @id

--	declare @finalRes as table(fieldId INT, fieldName nvarchar(50))
--	insert into @finalRes select Field.id, Field.fieldName
--	from Field 
--	JOIN @FieldIds t1 ON t1.fieldId = Field.id

--	select * from @finalRes

--end
--GO

--select * from ProfessionalField

--exec getPersonFields 1

--DROP Procedure getPersonFields
--GO

------------------------------------------------------------------

CREATE PROCEDURE getPostsByPerson
@PersonId int

as
Begin
 select Post.id, Post.postTitle, Post.postDescription, postDate, Post.personId, Post.postLng, Post.postLat, Post.proffessionalId, Post.postStatus, Post.fieldId into #postTable 
	  from Post left JOIN Field 
	  ON Field.id = Post.fieldId 
	  WHERE Post.isDelete = 0 AND Post.personId = @PersonId

	  select * from #postTable

	  select Person.id, Person.uname, Person.phone, PersonImage.pImage into #dPerson
	  from Person
	  join #postTable t1 
	  on t1.proffessionalId = Person.id 
	  left join PersonImage 
	  on Person.id = PersonImage.personId 

	  --update #dPerson set personImage = 0 where personImage IS NULL

	  --select * from #dPerson

	  --select PostPropose.* from PostPropose join #dPerson t1 on PostPropose.proffessionalId = t1.id

	  --select PostGallery.* from PostGallery join #postTable t1 on t1.id = PostGallery.postId
end
GO

exec getPostsByPerson 1
GO

DROP Procedure getPostsByPerson
GO

---------------------------------

------------------------------------------------------------------

CREATE PROCEDURE getPostsByPro
@proId int

as
Begin
 select Post.id, Post.postTitle, Post.postDescription, postDate, Post.personId, Post.postLng, Post.postLat, Post.proffessionalId, Post.postStatus, Post.fieldId, Field.fieldName into #postTable 
	  from Post left JOIN Field 
	  ON Field.id = Post.fieldId 
	  WHERE Post.isDelete = 0 AND Post.proffessionalId = @proId

	  select * from #postTable

	  select Person.id, Person.uname, Person.phone, PersonImage.pImage
	  from Person
	  join #postTable t1 
	  on t1.proffessionalId = Person.id 
	  left join PersonImage 
	  on Person.id = PersonImage.personId 

	  --update #dPerson set personImage = 0 where personImage IS NULL

	  --select * from #dPerson

	  --select PostPropose.* from PostPropose join #dPerson t1 on PostPropose.proffessionalId = t1.id

	  --select PostGallery.* from PostGallery join #postTable t1 on t1.id = PostGallery.postId
end
GO

exec getPostsByPro 3
GO

DROP Procedure getPostsByPro
GO

---------------------------------

 CREATE PROCEDURE GetPostsByFields
 @List NVARCHAR(MAX)
 AS
 BEGIN
      
      select Post.id, Post.postTitle, Post.postDescription, postDate, Post.personId, Post.postLng, Post.postLat, Post.proffessionalId, Post.postStatus, Post.fieldId, Field.fieldName
	  from Post left JOIN Field 
	  ON Field.id = Post.fieldId 
	  WHERE Post.isDelete = 0 AND Post.postStatus !=0 AND
	  fieldId IN( SELECT fieldId = Item FROM SplitInts(@List, ',')); 

	  --select * from #postTable

	  --select Person.id, Person.uname, Person.phone, PersonImage.pImage into #dPerson
	  --from Person
	  --join #postTable t1
	  --on t1.proffessionalId = Person.id
	  --left join PersonImage
	  --on Person.id = PersonImage.personId


	  --update #dPerson set personImage = 0 where personImage IS NULL

	  --select * from #dPerson

	  --select PostPropose.* from PostPropose join #dPerson t1 on PostPropose.proffessionalId = t1.id

	  --select PostGallery.* from PostGallery join #postTable t1 on t1.id = PostGallery.postId

 END
 GO

 exec GetPostsByFields '3,0'

DROP Procedure GetPostsByFields
GO

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

DROP FUNCTION SplitInts
GO

---------------------------------

 CREATE PROCEDURE getReviews
 @id INT
 AS
 BEGIN
      
      select *
	  from ProfessionalReview 
	  WHERE ProfessionalReview.ProfessionalId=@id 
	  
	  --update #reviewTable set personImage = '' where personImage IS NULL
	  --select * from #reviewTable 

	
 END
 GO

DROP Procedure getReviews
GO
exec getReviews 1


---------------------------------


 CREATE PROCEDURE getDPeople
 @List NVARCHAR(MAX)
 AS
 BEGIN
      
	select Person.*, PersonImage.pImage
	from Person left JOIN PersonImage 
	ON Person.id = PersonImage.personId 
	WHERE Person.id IN( SELECT id = Item FROM SplitInts(@List, ',')); 

 END
 GO

DROP Procedure getDPeople
GO

exec getDPeople '1,2'
