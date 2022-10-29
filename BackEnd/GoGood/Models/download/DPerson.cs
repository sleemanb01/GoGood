using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace GoGood.Models
{
    public partial class DPerson
    {
        public Person person { get; set; } = new Person();
        public byte[]? pImage { get; set; }
    }
}
