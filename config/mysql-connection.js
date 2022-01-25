const mysql = require('mysql2');
const { reject } = require('promise');
const Promise = require('promise');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'melathil',

});

module.exports.select = function (qry) {
    connection.query(qry, function (error, result, fields) {
        if (!error) {
            resolve(result, fields);
        }
        else {
            reject(error);
        }
    })
}

module.exports.insert = function (qry) {
    return new Promise((resolve, reject) => {
        connection.query(qry, (error, data, fields) => {
            if (!error) {
                resolve(data, fields);
            }
            else {
                reject(error);
            }
        })
    })
}
module.exports.update = function (qry, values) {
    return new Promise((resolve, reject) => {
        connection.query(qry, values, (error, data, fields) => {
            if (!error) {
                resolve(data, fields);
            }
            else {
                reject(error);
            }
        })
    })
}