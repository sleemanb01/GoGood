using System;
using System.Collections.Generic;

namespace GoGood.Models
{
    public partial class PostWGallery
    {
        public Post post { get; set; } = new Post();

        public ICollection<DPostGallery> DPostGallery { get; set; } = new List<DPostGallery>();

    }
}