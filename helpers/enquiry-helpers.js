const Enquiries = require('../models/enquiry-model');
const CloseRequests = require('../models/close-request-model');
const PartialClosings = require('../models/partial-closings');

module.exports = {

    getEnquiries: (keys, project) => {
        return new Promise((resolve, reject) => {
            Enquiries
                .find({ ...keys }, { ...project })
                .populate({ path: 'enq_client' })
                .populate('enq_with')
                .populate('enq_user')
                .populate('enq_partial_closes')
                .sort({ enq_date: -1 })
                .exec()
                .then(async (response) => {
                    let enquiries = await Enquiries.populate(response, {
                        path: 'enq_client.client_type',
                        model: 'ClientTypes',
                    })
                    enquiries = await Enquiries.populate(response, {
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
    getCloseRequests: (data) => {

        return new Promise((resolve, reject) => {
            CloseRequests
                .find({ ...data })
                .populate('close_enquiry')
                .populate('close_user')
                .exec()
                .then((response) => {
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
    },
    getCloseRequestCount: (data) => {
        return new Promise((resolve, reject) => {
            CloseRequests
                .find({ ...data })
                .count()
                .exec()
                .then((response) => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
        })
    },
    getCloseRequestById: (id) => {
        return new Promise((resolve, reject) => {
            CloseRequests
                .findById(id)
                .exec()
                .then((response) => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
        })
    },
    createClose: (data) => {
        return new Promise((resolve, reject) => {
            const closing = new PartialClosings({
                close_user: data.close_user,
                close_enquiry: data.close_enquiry,
                close_date: data.close_date,
                close_remarks: data.close_remarks,
                close_amount: data.close_amount,
            });
            closing.save().then((response) => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })

    },
    updateClosings: (id, data) => {
        return new Promise((resolve, reject) => {
            Enquiries.findByIdAndUpdate(id, { $push: { ...data } }).then((response) => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    },
    getPartialClosings: (data) => {
        return new Promise((resolve, reject) => {
            PartialClosings.find({ ...data }).then((response) => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    },
    getPartialClosingMonths: (keys, projects) => {
        return new Promise((resolve, reject) => {
            PartialClosings.find({ ...keys }, { ...projects }).then((response) => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    },
    getPartialClosingAmountByDate: (user, from, to) => {
        console.log(user, from, to)
        return new Promise((resolve, reject) => {
            PartialClosings.aggregate([
                {
                    $match:
                    {
                        close_user: user,
                        close_date: { $gte: from, $lte: to }
                    }
                },
                {
                    $group: {
                        _id: null,
                        sum: {
                            $sum: '$close_amount'
                        }
                    }
                }
            ])
                .then((response) => {
                    console.log(response);
                }).catch(error => {
                    reject(error);
                })
        })
    }


}