const { createManager, createUser, getUser, getManager } = require('../helper/registration-helpers');

registrationHelper = require('../helper/registration-helpers');

module.exports.loadIndexPage = (req, res, next) => {
    getManager()

        .then(() => {
            console.log('manager created');
        })
}