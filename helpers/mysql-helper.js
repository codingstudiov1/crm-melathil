const { select, insert, update } = require("../config/mysql-connection");
const { PENDING_STATUS } = require("../config/strings");
const Promise = require('promise')




module.exports = {



    insertUser: (values) => {

        return new Promise((resolve, reject) => {
            var qry = "INSERT INTO `users` (`email`, `phone`, `firstName`, `lastName`, `address`, `dob`, `gender`, `password`) VALUES ('" + values.email + "', '" + values.phone + "', '" + values.firstName + "', '" + values.lastName + "', '" + values.address + "', '" + values.dob + "', '" + values.gender + "', '" + values.password + "')";
            insert(qry).then((data) => {
                resolve(data);
            })
        })
    }

}