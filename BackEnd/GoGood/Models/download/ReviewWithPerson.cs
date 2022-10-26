using System;
using System.Collections.Generic;

namespace GoGood.Models
{
    public partial class ReviewWithPerson
    {
       public int Id { get; set; }
        public string? Uname { get; set; }
        public string? PersonImage1 { get; set; }
         public DateTime? ReviewDate { get; set; }
        public string? Review { get; set; }
    }
}
