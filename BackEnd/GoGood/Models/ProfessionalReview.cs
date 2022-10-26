using System;
using System.Collections.Generic;

namespace GoGood.Models
{
    public partial class ProfessionalReview
    {
        public int Id { get; set; }
        public int? ProfessionalId { get; set; }
        public int? Reviewer { get; set; }
        public DateTime? ReviewDate { get; set; }
        public string? Review { get; set; }

        public virtual ProfessionalInfo? Professional { get; set; }
        public virtual Person? ReviewerNavigation { get; set; }
    }
}
