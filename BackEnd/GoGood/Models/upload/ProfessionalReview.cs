using System;
using System.Collections.Generic;

namespace GoGood.Models
{
    public partial class ProfessionalReview
    {
        public int Id { get; set; }
        public int? ProfessionalId { get; set; }
        public int? ReviewerId { get; set; }
        public DateTime? ReviewDate { get; set; }
        public string? Review { get; set; }
    }
}
