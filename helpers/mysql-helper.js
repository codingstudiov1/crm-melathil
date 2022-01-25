const { select, insert, update } = require("../config/mysql-connection");
const { PENDING_STATUS, ACTIVE_STATUS } = require("../config/strings");
const Promise = require('promise');




module.exports = {
    insertUser: (values) => {
        return new Promise(async (resolve, reject) => {
            var qry = "INSERT INTO `users` (`email`, `phone`, `firstName`, `lastName`, `address`, `dob`, `gender`) VALUES ('" + values.email + "', '" + values.phone + "', '" + values.firstName + "', '" + values.lastName + "', '" + values.address + "', '" + values.dob + "', '" + values.gender + "')";
            let data = await insert(qry)
            var qry2 = "insert into logins (userid,password) values(" + data.insertId + ",sha1('" + values.password + "'))"
            await insert(qry2);
            resolve();
        })
    },
    doLogin: function (username, password) {

        return new Promise(async (resolve, reject) => {
            let qry = "Select * from users where email='" + username + "' or phone = '" + username + "'";
            let userData = await select(qry);
            if (userData.length < 1) {
                reject({ message: "No user registered with " + username });
            }
            else {
                let qryPasswordCheck = "Select usertype from LOGINS where userid=" + userData[0].id + " and password=SHA1('" + password + "')";
                let confData = await select(qryPasswordCheck);
                if (confData.length < 1) { reject({ message: "Invalid password for user " + username }); }
                else {
                    switch (confData[0].usertype) {
                        case 'admin': {
                            userData[0].usertype = confData[0].usertype;
                            resolve({ status: true, user: userData[0] });
                        }
                    }
                }
            }
        })
    },
    getPendingUsers: function () {
        return new Promise(async (resolve, reject) => {
            let qry = "SELECT * FROM USERS WHERE STATUS = '" + PENDING_STATUS + "'";
            let requests = await select(qry);
            resolve(requests);
        })
    },
    getActiveUsers: function () {
        return new Promise(async (resolve, reject) => {
            let qry = "SELECT * FROM USERS U INNER JOIN LOGINS L ON U.ID = L.USERID WHERE U.STATUS = '" + ACTIVE_STATUS + "' AND L.USERTYPE !='admin'";
            let requests = await select(qry);
            resolve(requests);
        })
    },
    createClientType: (typeName) => {
        return new Promise(async (resolve, reject) => {
            let qry = "INSERT INTO client_types (name) VALUES ('" + typeName + "')";
            await insert(qry);
            resolve();
        })
    },
    getClientTypes: () => {
        return new Promise(async (resolve, reject) => {
            let qry = "SELECT * FROM client_types";
            let types = await select(qry);
            resolve(types);

        })
    },
    getClientType: (id) => {
        return new Promise(async (resolve, reject) => {
            let qry = "SELECT * FROM client_types WHERE id=" + id;
            let types = await select(qry);
            resolve(types[0]);

        })
    }

}