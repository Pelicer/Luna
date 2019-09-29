using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LunaCore.Model
{
    public class GoalView
    {
        public Guid ID { get; set; }
        public DateTime Timestamp { get; set; }
        public IList<Goal> Goals { get; set; }
    }
}