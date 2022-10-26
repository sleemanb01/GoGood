using System;
using System.Collections.Generic;

namespace GoGood.Models
{
    public partial class Field
    {
        public Field()
        {
            Posts = new HashSet<Post>();
            ProfessionalFields = new HashSet<ProfessionalField>();
        }

        public int Id { get; set; }
        public string? FieldName { get; set; }

        public virtual ICollection<Post> Posts { get; set; }
        public virtual ICollection<ProfessionalField> ProfessionalFields { get; set; }
    }
}
