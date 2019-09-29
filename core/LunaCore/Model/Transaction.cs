using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LunaCore.Model
{
    public class Transaction
    {
        public double Value { get; set; }
        public string Timestamp { get; set; }
        public string Action { get; set; }
    }
}