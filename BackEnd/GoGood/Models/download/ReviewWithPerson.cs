using System;
using System.Collections.Generic;

namespace GoGood.Models
{
    public partial class ReviewWithPerson
    {
        public ICollection<ProfessionalReview> professionalReviews { get; set; } = new List<ProfessionalReview>();

        public ICollection<DPerson> person { get; set; } = new List<DPerson>();
    }
}
