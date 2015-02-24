/**
 * Created by AliArslan on 22.02.15.
 */

var response = {
    success: false,
    data: [],
    message: "",
    errorCode: -1

}

var clearResponse = function(){
    response.success = false;
    response.data = [];
    response.message = "";
    response.errorCode = -1;
}


module.exports = function(callback) {
    var ret =  {
        resultCallback: function(flag,err,res){
            console.log(err,res);
            ret.setAttributes(err,res);
            callback(ret.getResponse())
        },
        setAttributes : function(error,result){
            clearResponse();
            if(!error){
                response.success = true;
                response.data = result.rows;
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
        }
    }
    return ret;
}