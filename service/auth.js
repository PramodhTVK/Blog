const userIDMap = new Map();

const setUserID = (uID,user) => {
    userIDMap.set(uID,user);
}

const getUserID = (uID) => {
    userIDMap.get(uID);
}

module.exports = {
    setUserID,
    getUserID
}