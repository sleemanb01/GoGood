using System;
using System.Collections.Generic;

namespace GoGood.Models
{
    public partial class PostWGallery
    {
        public Post post { get; set; } = new Post();

        public ICollection<PostGallery> PostGallery { get; set; } = new List<PostGallery>();

    }
}