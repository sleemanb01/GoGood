using System;
using System.Collections.Generic;

namespace GoGood.Models
{
    public partial class ProfessionalField
    {
        public int Id { get; set; }
        public int? PersonId { get; set; }
        public int? FieldId { get; set; }

    }
}
