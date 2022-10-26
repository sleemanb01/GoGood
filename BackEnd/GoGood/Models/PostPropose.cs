using System;
using System.Collections.Generic;

namespace GoGood.Models
{
    public partial class PostPropose
    {
        public int Id { get; set; }
        public int? ProffessionalId { get; set; }
        public int? PostId { get; set; }

        public virtual Post? Post { get; set; }
        public virtual Person? Proffessional { get; set; }
    }
}
