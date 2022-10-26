using System;
using System.Collections.Generic;

namespace GoGood.Models
{
    public partial class PostWData
    {
        public ICollection<DPost> dPosts { get; set; } = new List<DPost>();

        public ICollection<DPerson> professionalProposers { get; set; } = new List<DPerson>();

        public ICollection<PostPropose> PostProposes { get; set; } = new List<PostPropose>();

        public ICollection<PostGallery> PostGallery { get; set; } = new List<PostGallery>();

    }
}