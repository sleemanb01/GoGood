using System;
using System.Collections.Generic;

namespace GoGood.Models
{
    public partial class Post
    {
        public Post()
        {
            PostGalleries = new HashSet<PostGallery>();
            PostProposes = new HashSet<PostPropose>();
        }

        public int Id { get; set; }
        public string? PostTitle { get; set; }
        public string? PostDescription { get; set; }
        public DateTime? PostDate { get; set; }
        public int? PersonId { get; set; }
        public int? FieldId { get; set; }
        public double PostLat { get; set; }
        public double PostLng { get; set; }
        public int? ProffessionalId { get; set; }
        public int? PostStatus { get; set; }
        public int? IsDelete { get; set; }

        public virtual Field? Field { get; set; }
        public virtual Person? Person { get; set; }
        public virtual Person? Proffessional { get; set; }
        public virtual ICollection<PostGallery> PostGalleries { get; set; }
        public virtual ICollection<PostPropose> PostProposes { get; set; }
    }
}
