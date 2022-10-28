using System;
using System.Collections.Generic;

namespace GoGood.Models
{
    public partial class PersonImage
    {
        public int Id { get; set; }
        public int? PersonId { get; set; }
        public byte[]? PersonImage1 { get; set; }

        public virtual Person? Person { get; set; }
    }
}
