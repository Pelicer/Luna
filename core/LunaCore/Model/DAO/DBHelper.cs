using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LunaCore
{
    public class DBHelper
    {
        public DSLDataType ExecuteStoredProcedure(string ProcedureName, List<SqlParameter> Parameters)
        {
            DSLDataType mReturn = new DSLDataType();
            try
            {
                SqlConnection dbConnection = ConnectionFactory.CreateConnection();
                SqlCommand dbCommand = new SqlCommand(ProcedureName, dbConnection)
                {
                    CommandType = System.Data.CommandType.StoredProcedure
                };
                dbCommand.Parameters.AddRange(Parameters.ToArray());

                dbConnection.Open();
                DbDataReader dataReader = dbCommand.ExecuteReader();

                DataTable dtTable = new DataTable();
                dtTable.Load(dataReader);

                mReturn.BoolValue = true;
                mReturn.Value = dtTable;

            }
            catch (Exception e)
            {
                mReturn.BoolValue = false;
                mReturn.Value = e.Message.ToString();
            }
            return mReturn;
        }

        public DSLDataType ExecuteQuery(string query)
        {
            DSLDataType mReturn = new DSLDataType();
            try
            {
                SqlConnection dbConnection = ConnectionFactory.CreateConnection();
                SqlCommand dbCommand = new SqlCommand(query, dbConnection);

                dbConnection.Open();
                DbDataReader dataReader = dbCommand.ExecuteReader();

                DataTable dtTable = new DataTable();
                dtTable.Load(dataReader);

                mReturn.BoolValue = true;
                mReturn.Value = dtTable;

            }
            catch (Exception e)
            {
                mReturn.BoolValue = false;
                mReturn.Value = e.Message.ToString();
            }
            return mReturn;
        }

        #region Helpers
        private object GetColumnValue<T>(DataTable dataTable, string columnName)
        {
            return dataTable.AsEnumerable().Select(x => x.Field<T>(columnName)).FirstOrDefault();
        }

        public DSLDataType ValidateReturn(DataTable DBReturn)
        {
            DSLDataType mReturn = new DSLDataType();
            try
            {
                mReturn.Value = GetColumnValue<string>(DBReturn, "Return").ToString();
                if (mReturn.Value.ToString().IndexOf("True") != -1)
                {
                    mReturn.BoolValue = true;
                    mReturn.Value = mReturn.Value.ToString().Substring(5, mReturn.Value.ToString().Length - 5);
                }
                else
                {
                    mReturn.BoolValue = false;
                    mReturn.Value = mReturn.Value.ToString().Substring(6, mReturn.Value.ToString().Length - 6);
                }

            }
            catch (Exception e)
            {
                mReturn.BoolValue = false;
                mReturn.Value = e.Message.ToString();
            }
            return mReturn;
        }
        #endregion Helpers
    }
}
