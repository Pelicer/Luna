using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace LunaCore
{
    public class ConnectionFactory
    {
        public static SqlConnection CreateConnection()
        {   
            SqlConnection conn = null;
            try
            {
                conn = new SqlConnection(ConfigurationManager.ConnectionStrings[1].ToString());
            }
            catch (Exception e)
            {
                Console.Write(e.Message.ToString());
                conn = null;
            }
            return conn;
        }
    }
}

