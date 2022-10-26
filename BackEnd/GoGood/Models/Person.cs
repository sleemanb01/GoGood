using System;
using System.Collections.Generic;

namespace GoGood.Models
{
    public partial class Person
    {
        public Person()
        {
            PersonImages = new HashSet<PersonImage>();
            PostPeople = new HashSet<Post>();
            PostProffessionals = new HashSet<Post>();
            PostProposes = new HashSet<PostPropose>();
            ProfessionalFields = new HashSet<ProfessionalField>();
            ProfessionalInfos = new HashSet<ProfessionalInfo>();
            ProfessionalReviews = new HashSet<ProfessionalReview>();
        }

        public int Id { get; set; }
        public string? Uname { get; set; }
        public string? Phone { get; set; }

        public virtual ICollection<PersonImage> PersonImages { get; set; }
        public virtual ICollection<Post> PostPeople { get; set; }
        public virtual ICollection<Post> PostProffessionals { get; set; }
        public virtual ICollection<PostPropose> PostProposes { get; set; }
        public virtual ICollection<ProfessionalField> ProfessionalFields { get; set; }
        public virtual ICollection<ProfessionalInfo> ProfessionalInfos { get; set; }
        public virtual ICollection<ProfessionalReview> ProfessionalReviews { get; set; }
    }
}
