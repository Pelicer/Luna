using LunaCore.Model.DAO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace LunaCore
{
    public class LunaService : ILunaService
    {
        UserDAO UserDAO = new UserDAO();
        FinanceDAO FinDAO = new FinanceDAO();

        public DSLDataType RegisterUser(string email, string password, string profile)
        {
            DSLDataType mReturn = new DSLDataType();
            try
            {
                if (email == null || email.Equals(String.Empty))
                {
                    mReturn.BoolValue = false;
                    mReturn.Value = "O campo de e-mail não pode ser vazio";
                    return mReturn;
                }

                if (password == null || password.Equals(String.Empty))
                {
                    mReturn.BoolValue = false;
                    mReturn.Value = "O campo de senha não pode ser vazio";
                    return mReturn;
                }

                if (profile == null || profile.Equals(String.Empty))
                {
                    mReturn.BoolValue = false;
                    mReturn.Value = "O campo de perfil não pode ser vazio";
                    return mReturn;
                }

                mReturn = UserDAO.RegisterUser(email.ToUpper(), password, profile.ToUpper());
            }
            catch (Exception e)
            {
                mReturn.BoolValue = false;
                mReturn.Value = e.Message.ToString();
            }
            return mReturn;
        }

        public DSLDataType UpdateUser(string OldEmail, string email, string password, string profile)
        {
            DSLDataType mReturn = new DSLDataType();
            try
            {
                if (OldEmail == null || OldEmail.Equals(String.Empty))
                {
                    mReturn.BoolValue = false;
                    mReturn.Value = "O campo de e-mail não pode ser vazio";
                    return mReturn;
                }

                if (email == null || email.Equals(String.Empty))
                {
                    mReturn.BoolValue = false;
                    mReturn.Value = "O campo de e-mail não pode ser vazio";
                    return mReturn;
                }

                if (password == null || password.Equals(String.Empty))
                {
                    mReturn.BoolValue = false;
                    mReturn.Value = "O campo de senha não pode ser vazio";
                    return mReturn;
                }

                if (profile == null || profile.Equals(String.Empty))
                {
                    mReturn.BoolValue = false;
                    mReturn.Value = "O campo de perfil não pode ser vazio";
                    return mReturn;
                }

                mReturn = UserDAO.UpdateUser(OldEmail.ToUpper(), email.ToUpper(), password, profile.ToUpper());
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

                mReturn = UserDAO.GetProfiles();

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

                mReturn = FinDAO.GetCategories();

            }
            catch (Exception e)
            {
                mReturn.BoolValue = false;
                mReturn.Value = e.Message.ToString();
            }
            return mReturn;
        }

        public DSLDataType Login(string email, string password)
        {
            DSLDataType mReturn = new DSLDataType();
            try
            {
                if(email == null || email.Equals(String.Empty)){
                    mReturn.BoolValue = false;
                    mReturn.Value = "O campo de email não pode ser vazio";
                    return mReturn;
                }
                if (password == null || password.Equals(String.Empty)){
                    mReturn.BoolValue = false;
                    mReturn.Value = "O campo de senha não pode ser vazio";
                    return mReturn;
                }

                mReturn = UserDAO.Login(email.ToUpper(), password);

            }
            catch (Exception e)
            {
                mReturn.BoolValue = false;
                mReturn.Value = e.Message.ToString();
            }
            return mReturn;
        }

        public DSLDataType RegisterMark(string UserEmail, string Title, string Category, double FinalValue)
        {
            DSLDataType mReturn = new DSLDataType();
            try
            {
                if (UserEmail == null || UserEmail.Equals(String.Empty))
                {
                    mReturn.BoolValue = false;
                    mReturn.Value = "O campo de email não pode ser vazio";
                    return mReturn;
                }
                if (Title == null || Title.Equals(String.Empty))
                {
                    mReturn.BoolValue = false;
                    mReturn.Value = "O campo de senha não pode ser vazio";
                    return mReturn;
                }
                if (Category == null || Category.Equals(String.Empty))
                {
                    mReturn.BoolValue = false;
                    mReturn.Value = "Uma categoria deve ser selecionada";
                    return mReturn;
                }
                if (FinalValue <= 0)
                {
                    mReturn.BoolValue = false;
                    mReturn.Value = "Um valor deve ser dado";
                    return mReturn;
                }


                mReturn = FinDAO.RegisterMark(UserEmail.ToUpper(), Title.ToUpper(), Category, FinalValue);

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
                if (UserEmail == null || UserEmail.Equals(String.Empty))
                {
                    mReturn.BoolValue = false;
                    mReturn.Value = "O campo de email não pode ser vazio";
                    return mReturn;
                }
                if (Title == null || Title.Equals(String.Empty))
                {
                    mReturn.BoolValue = false;
                    mReturn.Value = "O campo de senha não pode ser vazio";
                    return mReturn;
                }
                if (Category == null || Category.Equals(String.Empty))
                {
                    mReturn.BoolValue = false;
                    mReturn.Value = "Uma categoria deve ser selecionada";
                    return mReturn;
                }
                if (FinalValue <= 0)
                {
                    mReturn.BoolValue = false;
                    mReturn.Value = "Um valor deve ser dado";
                    return mReturn;
                }
                if(FinalDate == null)
                {
                    mReturn.BoolValue = false;
                    mReturn.Value = "Uma data final deve ser selecionada";
                    return mReturn;
                }

                mReturn = FinDAO.RegisterGoal(UserEmail.ToUpper(), Title.ToUpper(), Category, FinalValue, FinalDate, IsMain);

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
                if (Email == null || Email.Equals(String.Empty))
                {
                    mReturn.BoolValue = false;
                    mReturn.Value = "O campo de email não pode ser vazio";
                    return mReturn;
                }

                mReturn = FinDAO.GetGoals(Email.ToUpper());

            }
            catch (Exception e)
            {
                mReturn.BoolValue = false;
                mReturn.Value = e.Message.ToString();
            }
            return mReturn;
        }

        public DSLDataType DeleteGoal(int GoalID)
        {
            DSLDataType mReturn = new DSLDataType();
            try
            {
                if (GoalID <= 0)
                {
                    mReturn.BoolValue = false;
                    mReturn.Value = "Por favor, forneça uma meta ou objetivo válido";
                    return mReturn;
                }

                mReturn = FinDAO.DeleteGoal(GoalID);

            }
            catch (Exception e)
            {
                mReturn.BoolValue = false;
                mReturn.Value = e.Message.ToString();
            }
            return mReturn;
        }

        public DSLDataType RegisterTransaction(int GoalID, string Action, float Value)
        {
            DSLDataType mReturn = new DSLDataType();
            try
            {
                if (GoalID <= 0)
                {
                    mReturn.BoolValue = false;
                    mReturn.Value = "Por favor, insira um objetivo ou meta válidos";
                    return mReturn;
                }
                if (Action == null || Action.Equals(String.Empty))
                {
                    mReturn.BoolValue = false;
                    mReturn.Value = "Por favor, forneça uma ação";
                    return mReturn;
                }
                if (Value <= 0)
                {
                    mReturn.BoolValue = false;
                    mReturn.Value = "Um valor deve ser fornecido";
                    return mReturn;
                }

                mReturn = FinDAO.RegisterTransaction(GoalID, Action.ToUpper(), Value);

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
