const Enquiries = require('../models/enquiry-model');
const CloseRequests = require('../models/close-request-model');

module.exports = {

    getEnquiries: (keys, project) => {
        return new Promise((resolve, reject) => {
            Enquiries
                .find({ ...keys }, { ...project })
                .populate({ path: 'enq_client' })
                .populate('enq_with')
                .populate('enq_user')
                .exec()
                .then(async (response) => {
                    let enquiries = await Enquiries.populate(response, {
                        path: 'enq_client.client_type',
                        model: 'ClientTypes',
                    })
                    enquiries =  await Enquiries.populate(response, {
                        path: 'enq_with.client_type',
                        model: 'ClientTypes',
                    })
                    resolve(enquiries);
                })
                .catch(error => {
                    reject(error);
                })
        })
    },
    pushEnquiries: (id, data) => {
        return new Promise((resolve, reject) => {
            Enquiries.findByIdAndUpdate(id, { $push: { enq_updates: { ...data } } }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    },
    pullEnquiries: (id, detId) => {
        return new Promise((resolve, reject) => {
            Enquiries.findByIdAndUpdate(id, { $pull: { enq_updates: detId } }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    },
    createEnquiry: (data) => {
        return new Promise((resolve, reject) => {
            const enquiry = new Enquiries(data);
            enquiry.save().then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    },
    updateEnquiry: (id, data) => {
        return new Promise((resolve, reject) => {
            Enquiries.findByIdAndUpdate(id, { ...data }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    },
    deleteEnquiry: (id) => {
        return new Promise((resolve, reject) => {
            Enquiries.findByIdAndDelete(id).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    },
    getCount: (keys) => {
        return new Promise((resolve, reject) => {
            Enquiries.find({ ...keys }).count().then((response) => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    },
    newCloseRequest: (data) => {
        return new Promise((resolve, reject) => {
            const close = new CloseRequests(data);
            close.save().then((response) => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    },
    deleteCloseRequest: (id) => {
        return new Promise((resolve, reject) => {
            CloseRequests.findByIdAndDelete(id).then((response) => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    }


}