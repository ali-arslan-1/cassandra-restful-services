/**
 * Created by AliArslan on 22.02.15.
 */

var response = {
    success: false,
    data: [],
    message: "",
    errorCode: -1

};

var clearResponse = function(){
    response.success = false;
    response.data = [];
    response.message = "";
    response.errorCode = -1;
};


module.exports = function(callback) {
    var ret =  {
        resultCallback: function(flag,err,res){
            ret.setAttributes(err,res);
            callback(ret.getResponse());
        },
        connectCallback: function(err, connectionSaved){
            clearResponse();
            if(err){
                response.data = err.innerErrors;
                response.message = "Error while establishing connection";
                response.errorCode = 1;
            }else{
                response.success = true;
                if(connectionSaved || connectionSaved==null)
                    response.message = "Connection established successfully";
                else{
                    response.message = "Connection established but error while saving";
                }
            }

            callback(ret.getResponse());
        },
        setAttributes : function(error,result){
            clearResponse();
            if(!error){
                response.success = true;
                response.data =  result.rows;
                if(response.data && response.data.length==0){
                  response.message = "No records exist against search criteria";
                }else if(!response.data && result.schemaChange){
                  response.message = "Schema changed successfully";
                }
            }else{
                response.message = error.message;
                response.errorCode = error.code;
            }
        },
        getResponse : function(){
            return response;
        },
        setResponse :  function(message,data,success){
            clearResponse();
            response.success = success?success:response.success;
            response.data = data?data: response.data;
            response.message = message?message:response.message;
        }
    }
    return ret;
};
