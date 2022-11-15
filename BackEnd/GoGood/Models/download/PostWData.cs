using System;
using System.Collections.Generic;

namespace GoGood.Models
{
    public partial class PostWData
    {
        public ICollection<Post> Posts { get; set; } = new List<Post>();

        public ICollection<DPerson> ProfessionalProposers { get; set; } = new List<DPerson>();

        public ICollection<PostPropose> PostProposes { get; set; } = new List<PostPropose>();

        public ICollection<DPostGallery> DPostGallery { get; set; } = new List<DPostGallery>();

    }
}