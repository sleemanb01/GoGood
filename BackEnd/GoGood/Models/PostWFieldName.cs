using System;
using System.Collections.Generic;

namespace GoGood.Models
{
    public partial class PostWFieldName
    {
        public Post post { get; set; } = new Post();

        public string? fieldName { get; set; }

    }
}