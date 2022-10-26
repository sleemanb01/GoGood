using System;
using System.Collections.Generic;

namespace GoGood.Models
{
    public partial class PersonImage
    {
        public int Id { get; set; }
        public int? PersonId { get; set; }
        public byte[]? pImage { get; set; }

    }
}
