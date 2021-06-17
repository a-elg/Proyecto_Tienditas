function verifyString(value){
    if (typeof value==="string")
        if(value.lenght<255)
            return true;
    return false;
}module.exports.verifyString=verifyString;

function verifyUnInteger(value){
    if(typeof value==="number")
        if((value>=0)&&(value<4294967295))
            return true;
    return false;
}module.exports.verifyUnInteger=verifyUnInteger;

function verifyTiInt(value){
    if(typeof value==="number")
        if((value>=0)&&(value<255))
            return true;
    return false;
}module.exports.verifyTiInt=verifyTiInt;

