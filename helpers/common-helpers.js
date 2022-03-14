const Promise = require('promise');

const User = require('../models/user-model');
const Manager = require('../models/manager-model');


module.exports = {
    createUser: (userData) => {
        return new Promise((resolve, reject) => {
            const user = new User(userData);
            user.save().then((response) => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    }
}