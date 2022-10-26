using System;
using System.Collections.Generic;

namespace GoGood.Models
{
    public partial class ProfessionalReview
    {
        public int Id { get; set; }
        public int? PersonId { get; set; }
        public int? Reviewer { get; set; }
        public DateTime? ReviewDate { get; set; }
        public string? Review { get; set; }

    }
}
