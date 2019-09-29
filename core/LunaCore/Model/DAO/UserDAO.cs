using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace LunaCore.Model.DAO
{
    public class UserDAO
    {
        DBHelper dbHelper = new DBHelper();

        public DSLDataType RegisterUser(string Email, string Password, string Profile)
        {
            DSLDataType mReturn = new DSLDataType();
            try
            {
                string Salt = Criptography.GenerateSalt();
                Password = Criptography.sha256encrypt(Password+Salt);

                List<SqlParameter> sParams = new List<SqlParameter>();
                sParams.Add(new SqlParameter("@Email", Email));
                sParams.Add(new SqlParameter("@Password", Password));
                sParams.Add(new SqlParameter("@Salt", Salt));
                sParams.Add(new SqlParameter("@Profile", Profile));

                DSLDataType dbReturn = dbHelper.ExecuteStoredProcedure("usr.RegisterUser", sParams);
                if (dbReturn.BoolValue)
                {
                    mReturn = dbHelper.ValidateReturn((DataTable)dbReturn.Value);
                }
                else
                {
                    throw new SystemException(dbReturn.Value.ToString());
                }

            }
            catch (Exception e)
            {
                mReturn.BoolValue = false;
                mReturn.Value = e.Message.ToString();
            }
            return mReturn;
        }

        public DSLDataType GetProfiles()
        {
            DSLDataType mReturn = new DSLDataType();
            try
            {
                List<SqlParameter> sParams = new List<SqlParameter>();
                DSLDataType dbReturn = dbHelper.ExecuteStoredProcedure("usr.GetProfiles", sParams);
                if (dbReturn.BoolValue)
                {
                    string profiles = String.Empty;
                    DataTable dt = (DataTable)dbReturn.Value;
                    DataRow[] dr = dt.Select();
                    foreach (DataRow profile in dr)
                    {
                        profiles += (profile["Return"].ToString()) + ",";
                    }
                    mReturn.BoolValue = true;
                    mReturn.Value = profiles.Substring(0, profiles.Length - 1);
                }
                else
                {
                    throw new SystemException(dbReturn.Value.ToString());
                }

            }
            catch (Exception e)
            {
                mReturn.BoolValue = false;
                mReturn.Value = e.Message.ToString();
            }
            return mReturn;
        }

        public DSLDataType Login(string Email, string Password)
        {
            DSLDataType mReturn = new DSLDataType();
            try
            {
                string GetSalt = @"SELECT usr.Salt FROM usr.Users AS usr WITH(NOLOCK) WHERE usr.Email = '" + Email + "';";
                string Salt = String.Empty;

                DSLDataType dbReturn = dbHelper.ExecuteQuery(GetSalt);
                if (dbReturn.BoolValue)
                {
                    DataTable dt = ((DataTable)dbReturn.Value);
                    DataRow[] dr = dt.Select();
                    if(dr.Length <= 0)
                    {
                        mReturn.BoolValue = false;
                        mReturn.Value = "E-Mail não encontrado";
                        return mReturn;
                    }
                    else
                    {
                        DataRow dr_value = dr[0];
                        Salt = dr_value["Salt"].ToString();
                    }
                }
                else
                {
                    throw new SystemException(dbReturn.Value.ToString());
                }
                List<SqlParameter> sParams = new List<SqlParameter>();
                sParams.Add(new SqlParameter("@HashedPassword", Criptography.sha256encrypt(Password + Salt)));

                dbReturn = dbHelper.ExecuteStoredProcedure("usr.Login", sParams);
                if(dbReturn.BoolValue)
                {
                    mReturn = dbHelper.ValidateReturn((DataTable)dbReturn.Value);
                }

            }
            catch (Exception e)
            {
                mReturn.BoolValue = false;
                mReturn.Value = e.Message.ToString();
            }
            return mReturn;
        }


    }
}