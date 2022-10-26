using System;
using System.Collections.Generic;

namespace GoGood.Models
{
    public partial class PostGallery
    {
        public int Id { get; set; }
        public byte[]? Gallery { get; set; }
        public int? PostId { get; set; }

        public virtual Post? Post { get; set; }
    }
}
