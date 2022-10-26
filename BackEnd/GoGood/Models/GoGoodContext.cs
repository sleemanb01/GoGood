﻿using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace GoGood.Models
{
    public partial class GoGoodContext : DbContext
    {
        public GoGoodContext()
        {
        }

        public GoGoodContext(DbContextOptions<GoGoodContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Field> Fields { get; set; } = null!;
        public virtual DbSet<Person> People { get; set; } = null!;
        public virtual DbSet<PersonImage> PersonImages { get; set; } = null!;
        public virtual DbSet<Post> Posts { get; set; } = null!;
        public virtual DbSet<PostPropose> PostProposes { get; set; } = null!;
        public virtual DbSet<PostGallery> PostGallery { get; set; } = null!;
        public virtual DbSet<ProfessionalField> ProfessionalFields { get; set; } = null!;
        public virtual DbSet<ProfessionalInfo> ProfessionalInfos { get; set; } = null!;
        public virtual DbSet<ProfessionalReview> ProfessionalReviews { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=localhost;Database=GoGood;Trusted_Connection=False;password=1234;user=sa1;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Field>(entity =>
            {
                entity.ToTable("Field");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.FieldName)
                    .HasMaxLength(50)
                    .HasColumnName("fieldName");
            });

            modelBuilder.Entity<Person>(entity =>
            {
                entity.ToTable("Person");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Phone)
                    .HasMaxLength(15)
                    .HasColumnName("phone");

                entity.Property(e => e.Uname)
                    .HasMaxLength(50)
                    .HasColumnName("uname");
            });

            modelBuilder.Entity<PersonImage>(entity =>
            {
                entity.ToTable("PersonImage");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.PersonId).HasColumnName("personId");

                entity.Property(e => e.pImage).HasColumnName("pImage");

            });

            modelBuilder.Entity<Post>(entity =>
            {
                entity.ToTable("Post");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.FieldId).HasColumnName("fieldId");

                entity.Property(e => e.IsDelete).HasColumnName("isDelete");

                entity.Property(e => e.PersonId).HasColumnName("personId");

                entity.Property(e => e.PostDate)
                    .HasColumnType("date")
                    .HasColumnName("postDate")
                    .HasDefaultValueSql("(CONVERT([date],getdate(),(105)))");

                entity.Property(e => e.PostDescription)
                    .HasMaxLength(200)
                    .HasColumnName("postDescription");

                entity.Property(e => e.PostLat).HasColumnName("postLat");

                entity.Property(e => e.PostLng).HasColumnName("postLng");

                entity.Property(e => e.PostStatus).HasColumnName("postStatus");

                entity.Property(e => e.PostTitle)
                    .HasMaxLength(50)
                    .HasColumnName("postTitle");

                entity.Property(e => e.ProffessionalId).HasColumnName("proffessionalId");


            });

            modelBuilder.Entity<PostPropose>(entity =>
            {
                entity.ToTable("PostPropose");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.PostId).HasColumnName("postId");

                entity.Property(e => e.ProffessionalId).HasColumnName("proffessionalId");

            });

            modelBuilder.Entity<PostGallery>(entity =>
            {
                entity.ToTable("PostGallery");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.PostId).HasColumnName("postId");

                entity.Property(e => e.Gallery).HasColumnName("gallery");

            });

            modelBuilder.Entity<ProfessionalField>(entity =>
            {
                entity.ToTable("ProfessionalField");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.FieldId).HasColumnName("fieldId");

                entity.Property(e => e.PersonId).HasColumnName("personId");

            });

            modelBuilder.Entity<ProfessionalInfo>(entity =>
            {
                entity.ToTable("ProfessionalInfo");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.FormalImage).HasColumnName("formalImage");

                entity.Property(e => e.NumberOfRaters).HasColumnName("numberOfRaters");

                entity.Property(e => e.PersonId).HasColumnName("personId");

                entity.Property(e => e.Rating).HasColumnName("rating");

            });

            modelBuilder.Entity<ProfessionalReview>(entity =>
            {
                entity.ToTable("ProfessionalReview");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Review)
                    .HasMaxLength(100)
                    .HasColumnName("review");

                entity.Property(e => e.ReviewDate)
                    .HasColumnType("date")
                    .HasColumnName("reviewDate")
                    .HasDefaultValueSql("(CONVERT([date],getdate(),(105)))");

                entity.Property(e => e.Reviewer).HasColumnName("reviewer");

            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}