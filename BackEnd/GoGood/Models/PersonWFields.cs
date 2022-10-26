using System;
using System.Collections.Generic;

namespace GoGood.Models
{
    public partial class PersonWFields
    {
        // public PersonWFields()
        // {
        //     professionalFields = new HashSet<Field>();
        // }

        public int? Id { get; set; }
        public string? Uname { get; set; }
        public string? Phone { get; set; }

        public virtual ICollection<Field>? professionalFields { get; set; }

    }
}