using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using Newtonsoft.Json;

namespace LunaCore.Model.DAO
{
    public class FinanceDAO
    {
        DBHelper dbHelper = new DBHelper();

        public DSLDataType RegisterMark(string UserEmail, string Title, string Category, double FinalValue)
        {
            DSLDataType mReturn = new DSLDataType();
            try
            {
                List<SqlParameter> sParams = new List<SqlParameter>();
                sParams.Add(new SqlParameter("@Email", UserEmail));
                sParams.Add(new SqlParameter("@Title", Title));
                sParams.Add(new SqlParameter("@Category", Category));
                sParams.Add(new SqlParameter("@FinalValue", FinalValue));

                DSLDataType dbReturn = dbHelper.ExecuteStoredProcedure("fin.RegisterMark", sParams);
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

        public DSLDataType RegisterGoal(string UserEmail, string Title, string Category, float FinalValue, DateTime FinalDate, int IsMain)
        {
            DSLDataType mReturn = new DSLDataType();
            try
            {
                List<SqlParameter> sParams = new List<SqlParameter>();
                sParams.Add(new SqlParameter("@Email", UserEmail));
                sParams.Add(new SqlParameter("@Title", Title));
                sParams.Add(new SqlParameter("@Category", Category));
                sParams.Add(new SqlParameter("@FinalValue", FinalValue));
                sParams.Add(new SqlParameter("@FinalDate", FinalDate));
                sParams.Add(new SqlParameter("@IsMain", IsMain));

                DSLDataType dbReturn = dbHelper.ExecuteStoredProcedure("fin.RegisterGoal", sParams);
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

        public DSLDataType GetCategories()
        {
            DSLDataType mReturn = new DSLDataType();
            try
            {
                string GetCategories = @"SELECT ctg.Value Category FROM fin.Category AS ctg WITH(NOLOCK);";
                string Categories = String.Empty;

                DSLDataType dbReturn = dbHelper.ExecuteQuery(GetCategories);
                if (dbReturn.BoolValue)
                {
                    DataTable dt = ((DataTable)dbReturn.Value);
                    DataRow[] dr = dt.Select();
                    if (dr.Length <= 0)
                    {
                        mReturn.BoolValue = false;
                        mReturn.Value = "Categorias não encontradas";
                        return mReturn;
                    }
                    else
                    {
                        foreach (DataRow profile in dr)
                        {
                            Categories += profile["Category"].ToString() + ",";
                        }
                        mReturn.BoolValue = true;
                        mReturn.Value = Categories.Substring(0, Categories.Length - 1);
                    }
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

        public DSLDataType GetGoals(string Email)
        {
            DSLDataType mReturn = new DSLDataType();
            try
            {
                string Query = String.Format(@"
                    SELECT
	                    gl.GoalID AS 'GoalID', gl.Title AS 'GoalTitle', tp.Value AS 'GoalType', gl.FinalValue AS 'GoalFinalValue', gl.FinalDate AS 'GoalFinalDate', ctg.Value 'GoalCategory', gl.isActive AS 'GoalActive', gl.isMain AS 'GoalMain', gl.isFinished AS 'GoalFinished', glt.Value AS 'TransactionValue', glt.Timestamp AS 'TransactionDate', act.Value 'TransactionAction'
                    FROM
	                    [fin].Goal AS gl
	                    INNER JOIN [fin].Category AS ctg ON ctg.CategoryID = gl.CategoryID
	                    LEFT JOIN [fin].Type AS tp ON gl.TypeID = tp.TypeID
	                    LEFT JOIN [fin].GoalTransaction AS glt ON glt.GoalID = gl.GoalID
	                    LEFT JOIN [fin].Action AS act ON glt.ActionID = act.ActionID
                    WHERE
	                    gl.UserID = (SELECT usr.UserID FROM usr.Users AS usr WHERE usr.Email = '" + Email + @"')
                    ORDER BY 'GoalID' ASC;
                ");
                DSLDataType dbReturn = dbHelper.ExecuteQuery(Query);

                GoalView UserList = new GoalView
                {
                    ID = Guid.NewGuid(),
                    Timestamp = DateTime.Now,
                    Goals = new List<Goal>()
                };

                if (dbReturn.BoolValue)
                {
                    DataTable dtData = ((DataTable)dbReturn.Value);
                    DataRow[] dr = dtData.Select();
                    if (dr.Length <= 0)
                    {
                        mReturn.BoolValue = false;
                        mReturn.Value = "Nenhuma meta ou objetivo encontrado para o usuário";
                        return mReturn;
                    }
                    else
                    {
                        Goal LastGoal = new Goal();

                        int i = 0;
                        foreach (DataRow dtRow in dr)
                        {
                            if (i != 0 && dtRow["GoalID"].ToString().Equals(LastGoal.ID.ToString()))
                            {
                                Transaction GoalTransaction = new Transaction
                                {
                                    Action = dtRow["TransactionAction"].ToString(),
                                    Timestamp = dtRow["TransactionDate"].ToString(),
                                    Value = double.Parse(dtRow["TransactionValue"].ToString())
                                };
                                LastGoal.Accumulated += GoalTransaction.Value;
                                LastGoal.Transactions.Add(GoalTransaction);
                            }
                            else
                            {
                                if (i != 0)
                                {
                                    UserList.Goals.Add(LastGoal);
                                }
                                LastGoal = new Goal
                                {
                                    ID = int.Parse(dtRow["GoalID"].ToString()),
                                    Accumulated = 0,
                                    Title = dtRow["GoalTitle"].ToString(),
                                    Type = dtRow["GoalType"].ToString(),
                                    FinalValue = double.Parse(dtRow["GoalFinalValue"].ToString()),
                                    FinalDate = dtRow["GoalFinalDate"].ToString(),
                                    Category = dtRow["GoalCategory"].ToString(),
                                    GoalActive = bool.Parse(dtRow["GoalActive"].ToString()),
                                    GoalMain = bool.Parse(dtRow["GoalMain"].ToString()),
                                    GoalFinished = bool.Parse(dtRow["GoalFinished"].ToString()),
                                    Transactions = new List<Transaction>()
                                };
                                if (!dtRow.IsNull("TransactionValue"))
                                {
                                    Transaction GoalTransaction = new Transaction
                                    {
                                        Action = dtRow["TransactionAction"].ToString(),
                                        Timestamp = dtRow["TransactionDate"].ToString(),
                                        Value = double.Parse(dtRow["TransactionValue"].ToString())
                                    };
                                    LastGoal.Accumulated += GoalTransaction.Value;
                                    LastGoal.Transactions.Add(GoalTransaction);
                                }
                            }
                            i++;
                        }
                        UserList.Goals.Add(LastGoal);

                        mReturn.BoolValue = true;
                        mReturn.Value = JsonConvert.SerializeObject(UserList).ToString();
                    }
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

    }
}