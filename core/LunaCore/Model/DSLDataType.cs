using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LunaCore
{
    public class DSLDataType
    {
        private bool bValue { get; set; }
        private object oValue { get; set; }

        public DSLDataType()
        {
            bValue = false;
            oValue = "Did not run";
        }

        public DSLDataType(bool bValue, object oValue)
        {
            this.bValue = bValue;
            this.oValue = oValue;
        }

        public bool BoolValue
        {
            get { return this.bValue; }
            set { this.bValue = value; }
        }

        public object Value
        {
            get { return this.oValue; }
            set { this.oValue = value; }
        }
    }
}
