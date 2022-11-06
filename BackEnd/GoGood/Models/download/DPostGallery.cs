using System;
using System.Collections.Generic;

namespace GoGood.Models
{
    public partial class DPostGallery
    {
        public int Id { get; set; }
        public int? PostId { get; set; }
        public string? DGallery { get; set; }
    }
}
