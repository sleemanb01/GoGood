using System;
using System.Collections.Generic;

namespace GoGood.Models
{
    public partial class Person
    {
        public int Id { get; set; }
        public string? Uname { get; set; }
        public string? Phone { get; set; }
        public Boolean? IsAngel { get; set; }
    }
}
