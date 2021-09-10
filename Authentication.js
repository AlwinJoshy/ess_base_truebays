import AsyncStorage from '@react-native-async-storage/async-storage';
var AuthUserID;
var AuthUserName;
var AuthUserPassword;
var AuthUserDetails;


const RecordName = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value).then(() => {
            console.log("out...");
        })
    } catch (error) {
        console.log(error);
    }
}

export const ClearAunthetication = async () => {
    AuthUserID = null;
    AuthUserName = null;
    AuthUserPassword = null;

    RecordName("userName", "");
    RecordName("userID", "");
    RecordName("userPassword", "");

}

export const GetAuthenticationDetails = async () => {
    try {
        const valueName = await AsyncStorage.getItem('userName');
        if (valueName !== null && valueName !== "") {
            const valueID = await AsyncStorage.getItem('userID');

            const valuePassword = await AsyncStorage.getItem('userPassword');
            console.log(valueName + "-" + valueID + "-" + valuePassword);

            AuthUserName = valueName;
            AuthUserID = valueID;
            AuthUserPassword = valuePassword;

            return true;
        } else {
            console.log("not found");
            return false;
        }

    } catch (error) {
        return false;
    }
}

export const SetUserName = (userName, userID) => {

    AuthUserID = userID;
    AuthUserName = userName;

    RecordName("userName", userName);
    RecordName("userID", userID);

}

export const SetUserPassword = (userPassword) => {

    AuthUserPassword = userPassword;

    RecordName("userPassword", userPassword);
}

export const UserDetails = (details) => {

    AuthUserDetails = details;
}


export const GetUserID = () => {
    return AuthUserID;
}

export const GetUserName = () => {
    return AuthUserName;
}

export const GetUserPassword = () => {
    return AuthUserPassword;
}