using System;
using System.Collections.Generic;

namespace GoGood.Models
{
    public partial class ProfessionalInfo
    {

        public int Id { get; set; }
        public int? PersonId { get; set; }
        public byte[]? FormalImage { get; set; }
        public double? Rating { get; set; }
        public int? NumberOfRaters { get; set; }

    }
}
