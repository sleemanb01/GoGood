using System;
using System.Collections.Generic;

namespace GoGood.Models
{
    public partial class Post
    {

        public int Id { get; set; }
        public string? PostTitle { get; set; }
        public string? PostDescription { get; set; }
        public DateTime? PostDate { get; set; }
        public int? PersonId { get; set; }
        public int? FieldId { get; set; }
        public double? PostLat { get; set; }
        public double? PostLng { get; set; }
        public int? ProffessionalId { get; set; }
        public int? PostStatus { get; set; }
        public int? IsDelete { get; set; }

    }
}
