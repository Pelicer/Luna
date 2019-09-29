using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LunaCore.Model
{
    public class Goal
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Category { get; set; }
        public string Type { get; set; }
        public double FinalValue { get; set; }
        public double Accumulated { get; set; }
        public string FinalDate { get; set; }
        public bool GoalActive { get; set; }
        public bool GoalMain { get; set; }
        public bool GoalFinished { get; set; }
        public IList<Transaction> Transactions { get; set; }
    }
}