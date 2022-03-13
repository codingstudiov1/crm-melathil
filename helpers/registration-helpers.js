const Promise = require('promise');
const User = require('../models/user-model');
const Manager = require('../models/manager-model');

module.exports.createUser = (userData) => {
    return new Promise(async (resolve, reject) => {
        const user = new User({
            name: "Jithin S",
            phone: "9656449622",
            email: "jithins41@gmail.com",
            gender: "Male",
            user_field: "Sales",
            managed_by: "622e273ef986a4fa3ce88730"

        })
        await user.save();
        resolve();
    })
}
module.exports.createManager = (managerData) => {
    return new Promise(async (resolve, reject) => {
        const manager = new Manager({
            first_name: "John",
            last_name: "Smith",
            phone: "9845",
            email: "ex@gmail.com",
            address: "Pathanamthitta",
            dob: "21-10-1958",
            gender: "Male",
        })
        await manager.save();
        resolve();
    })
}

module.exports.getUser = () => {
    return new Promise((resolve, reject) => {
        User.find()
            .populate('managed_by')
            .exec().then((response) => {
                console.log(response);
            })
    })
}
module.exports.getManager = () => {
    return new Promise((resolve, reject) => {
        Manager.findOne()
            .exec().then((response) => {
                console.log(response)
            })
    })
}