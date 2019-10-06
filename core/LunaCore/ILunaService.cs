using System;
using System.ServiceModel;
using System.ServiceModel.Web;

namespace LunaCore
{
    [ServiceContract]
    public interface ILunaService
    {
        [OperationContract]
        [WebInvoke(UriTemplate = "/RegisterUser", Method = "POST", BodyStyle = WebMessageBodyStyle.Bare, RequestFormat = WebMessageFormat.Xml)]
        DSLDataType RegisterUser(string email, string password, string profile);

        [OperationContract]
        [WebInvoke(UriTemplate = "/GetProfiles", Method = "POST", BodyStyle = WebMessageBodyStyle.Bare, RequestFormat = WebMessageFormat.Xml)]
        DSLDataType GetProfiles();

        [OperationContract]
        [WebInvoke(UriTemplate = "/GetCategories", Method = "POST", BodyStyle = WebMessageBodyStyle.Bare, RequestFormat = WebMessageFormat.Xml)]
        DSLDataType GetCategories();

        [OperationContract]
        [WebInvoke(UriTemplate = "/Login", Method = "POST", BodyStyle = WebMessageBodyStyle.Bare, RequestFormat = WebMessageFormat.Xml)]
        DSLDataType Login(string email, string password);

        [OperationContract]
        [WebInvoke(UriTemplate = "/RegisterMark", Method = "POST", BodyStyle = WebMessageBodyStyle.Bare, RequestFormat = WebMessageFormat.Xml)]
        DSLDataType RegisterMark(string UserEmail, string Title, string Category, double FinalValue);

        [OperationContract]
        [WebInvoke(UriTemplate = "/RegisterGoal", Method = "POST", BodyStyle = WebMessageBodyStyle.Bare, RequestFormat = WebMessageFormat.Xml)]
        DSLDataType RegisterGoal(string UserEmail, string Title, string Category, float FinalValue, DateTime FinalDate, int IsMain);

        [OperationContract]
        [WebInvoke(UriTemplate = "/GetGoals", Method = "POST", BodyStyle = WebMessageBodyStyle.Bare, RequestFormat = WebMessageFormat.Xml)]
        DSLDataType GetGoals(string Email);

        [OperationContract]
        [WebInvoke(UriTemplate = "/DeleteGoal", Method = "POST", BodyStyle = WebMessageBodyStyle.Bare, RequestFormat = WebMessageFormat.Xml)]
        DSLDataType DeleteGoal(int GoalID);

        [OperationContract]
        [WebInvoke(UriTemplate = "/RegisterTransaction", Method = "POST", BodyStyle = WebMessageBodyStyle.Bare, RequestFormat = WebMessageFormat.Xml)]
        DSLDataType RegisterTransaction(int GoalID, string Action, float Value);
    }
}
