using System;
using System.Collections.Generic;

namespace GoGood.Models
{
    public partial class PersonWFields
    {
        public DPerson DPerson { get; set; } = new DPerson();

        public ICollection<ProfessionalField>? professionalFields { get; set; }

    }
}