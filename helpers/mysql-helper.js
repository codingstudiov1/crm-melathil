const { select, insert, update } = require("../config/mysql-connection");
const { PENDING_STATUS, ACTIVE_STATUS } = require("../config/strings");
const Promise = require('promise');
const moment = require('moment');



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
                            break;
                        default: {
                            switch (userData[0].status) {
                                case PENDING_STATUS:
                                    resolve({ message: "Your account is not yet activated. Kindly wait for admin approval" })
                                    break;

                                default:
                                case ACTIVE_STATUS:
                                    resolve({ status: true, user: userData[0] })
                                    break;
                            }
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
    },
    getPendingUserDetails: (userId) => {
        return new Promise(async (resolve, reject) => {
            let qry = "SELECT * FROM USERS WHERE ID=" + userId + " AND STATUS='" + PENDING_STATUS + "'";
            let user = await select(qry);
            if (user.length > 0) {
                resolve(user[0])
            }
            else {
                resolve(null)
            }
        })
    },
    approveUser: (id, user) => {
        return new Promise((resolve, reject) => {
            var data = [user.firstName, user.lastName, user.email, user.phone, user.address, user.dob, ACTIVE_STATUS, id]
            var qry = "UPDATE USERS SET firstName=?,lastName=?,email=?,phone=?,address=?,dob=?,status=? WHERE id=?";
            var qry2 = "UPDATE LOGINS SET usertype=? WHERE userid=?";
            update(qry, data).then(() => {
                update(qry2, [user.usertype, id]).then(() => {
                    resolve();
                })
            })
        })
    },
    createClient: (clientData) => {
        return new Promise(async (resolve, reject) => {
            const { name, address, email, phone, designation, type } = clientData;
            let qry = `INSERT INTO CLIENTS ( name, address, email, phone, designation, type) VALUES ('${name}','${address}','${email}','${phone}','${designation}',${type})`;
            await insert(qry);
            resolve();
        })
    },
    getClients: () => {
        return new Promise(async (resolve, reject) => {
            let qry = "SELECT CL.id as clientId,CL.name,CL.phone,CL.email,CT.name AS typeName FROM CLIENTS CL INNER JOIN CLIENT_TYPES CT ON CL.TYPE = CT.ID";
            let clients = await select(qry);
            console.log(clients);
            resolve(clients);
        })
    },
    getClientDetails: (id) => {
        return new Promise(async (resolve, reject) => {
            let qry = `SELECT * FROM CLIENTS WHERE ID=${id}`;
            let client = await select(qry);
            resolve(client[0]);
        })
    },
    modifyClientDetails: (id, data) => {
        const { name, address, email, phone, designation, type } = data;
        values = [name, address, email, phone, designation, type, id];
        return new Promise(async (resolve, reject) => {
            let qry = "UPDATE CLIENTS SET name=?,address=?,email=?,phone=?,designation=?,type=? WHERE id=?";
            update(qry, values).then(() => {
                resolve();
            })
        })
    },
    createEnquiry: (data) => {
        return new Promise(async (resolve, reject) => {
            const { title, date, client, user } = data;
            let qry = `INSERT INTO ENQUIRY (title, date, client, employee) VALUES ('${title}','${date}',${client},${user})`;
            let ins = await insert(qry);
            const { remarks, status, temparature } = data;
            let qry2 = `INSERT INTO ENQUIRY_DETAILS ( enquiryid,  date, remarks, status, temparature) VALUES ('${ins.insertId}','${date}','${remarks}','${status}','${temparature}')`;
            await insert(qry2);
            resolve();
        })
    },
    getEnquiryByUser: (userId) => {
        return new Promise(async (resolve, reject) => {
            let qry = "SELECT * FROM ENQUIRY WHERE EMPLOYEE = " + userId;
            let data = await select(qry);
            resolve(data);
        })
    },
    getEnquiryDetailsByUser: (enqId, userId) => {
        return new Promise(async (resolve, reject) => {
            let qry = `SELECT EN.*,CL.name as clientName,cl.phone as clientPhone,cl.designation as clientDesignation,CL.address as clientAddress,CT.NAME as clientTypeName,us.FIRSTNAME as firstName,US.LASTNAME as lastName,US.PHONE AS phone,US.EMAIL AS email FROM ENQUIRY EN INNER JOIN CLIENTS CL ON EN.CLIENT = CL.ID INNER JOIN CLIENT_TYPES CT ON CL.TYPE=CT.ID INNER JOIN USERS US ON EN.employee = US.ID WHERE EN.EMPLOYEE=${userId} AND EN.ID=${enqId}`;
            let enquiry = await select(qry);
            if (enquiry.length < 1) {
                resolve(null);
            }
            else {
                let qry2 = `SELECT * FROM ENQUIRY_DETAILS WHERE ENQUIRYID=${enqId}`;
                let fullDetails = await select(qry2);
                resolve({ enquiry: enquiry[0], details: fullDetails });
            }
        })
    },
    getEnquiryDetails: (enqId) => {
        return new Promise(async (resolve, reject) => {
            let qry = `SELECT EN.*,CL.name as clientName,cl.phone as clientPhone,cl.designation as clientDesignation,CL.address as clientAddress,CT.NAME as clientTypeName,us.FIRSTNAME as firstName,US.LASTNAME as lastName,US.PHONE AS phone,US.EMAIL AS email FROM ENQUIRY EN INNER JOIN CLIENTS CL ON EN.CLIENT = CL.ID INNER JOIN CLIENT_TYPES CT ON CL.TYPE=CT.ID INNER JOIN USERS US ON EN.employee = US.ID WHERE  EN.ID=${enqId}`;
            let enquiry = await select(qry);
            if (enquiry.length < 1) {
                resolve(null);
            }
            else {
                let qry2 = `SELECT * FROM ENQUIRY_DETAILS WHERE ENQUIRYID=${enqId}`;
                let fullDetails = await select(qry2);
                resolve({ enquiry: enquiry[0], details: fullDetails });
            }
        })
    },
    updateEnquiry: (enquiryId, upDetails) => {
        return new Promise(async (resolve, reject) => {
            console.log(upDetails)
            const { date, status, temparature, remarks } = upDetails;
            let qry = `INSERT INTO ENQUIRY_DETAILS (enquiryId,date,remarks,status,temparature) VALUES (${enquiryId},'${date}','${status}','${status}','${temparature}')`;
            await insert(qry);
            resolve();

        })
    },
    getEmployeeReport: (date) => {
        return new Promise((resolve, reject) => {
            // INNER JOIN ENQUIRY EN ON ED.ENQUIRYID=EN.ID 
            // INNER JOIN CLIENTS CL ON EN.CLIENT = CL.ID
            // INNER JOIN CLIENT_TYPES CT ON CL.TYPE=CT.ID 
            // ED.date,ED.status,ED.remarks,ED.temparature,EN.title,CL.name as clientName,CL.phone as clientPhone,CT.name as clientType 
            let qry =
                `SELECT *
            FROM ENQUIRY_DETAILS ED 
            WHERE ED.DATE='${date}'`;
            select(qry).then((enqs) => {
                resolve(enqs);
            })
        })
    },
    getOpenedEnquiries: () => {
        return new Promise((resolve, reject) => {
            let qry =
                `SELECT EN.*,CL.name as clientName,US.firstName as empName FROM ENQUIRY EN
             INNER JOIN CLIENTS CL ON EN.CLIENT=CL.ID
             INNER JOIN USERS US ON EN.EMPLOYEE = US.ID
            WHERE EN.STATUS=0
            ORDER BY EN.DATE DESC`;
            select(qry).then((enquiries) => {
                resolve(enquiries);
            }).catch((error) => {
                console.log(error);
            })
        })
    },
    getClosedEnquiries: () => {
        return new Promise((resolve, reject) => {
            let qry =
                `SELECT EN.*,CL.name as clientName,US.firstName as empName FROM ENQUIRY EN
             INNER JOIN CLIENTS CL ON EN.CLIENT=CL.ID
             INNER JOIN USERS US ON EN.EMPLOYEE = US.ID
            WHERE EN.STATUS=1
            ORDER BY EN.DATE DESC`;
            select(qry).then((enquiries) => {
                resolve(enquiries);
            }).catch((error) => {
                console.log(error);
            })
        })
    },
    getAllEnquiries: () => {
        return new Promise((resolve, reject) => {
            let qry =
                `SELECT EN.*,CL.name as clientName,US.firstName as empName FROM ENQUIRY EN
             INNER JOIN CLIENTS CL ON EN.CLIENT=CL.ID
             INNER JOIN USERS US ON EN.EMPLOYEE = US.ID
            ORDER BY EN.DATE DESC`;
            select(qry).then((enquiries) => {
                resolve(enquiries);
            }).catch((error) => {
                console.log(error);
            })
        })
    },
    closeEnquiry: (id, data) => {
        return new Promise((resolve, reject) => {
            const { amount } = data;
            let qry = `UPDATE ENQUIRY SET STATUS=1,AMOUNT=?,closedate=? WHERE ID=?`;
            update(qry, [amount, moment().format('YYYY-MM-DD'), id]).then(() => {
                let qry2 =
                    `INSERT INTO ENQUIRY_DETAILS
                 (enquiryid,addeddate,date,remarks,status,temparature) 
                 VALUES (${id},'${moment().format('YYYY-MM-DD')}','${moment().format('YYYY-MM-DD')}','Enquiry closed by admin','Closed','CLOSED')`
                console.log(qry2)
                insert(qry2).then(() => {
                    resolve();
                }).catch(err => {
                    console.log(err);
                })
            }).catch(err => {
                console.log(err);
            })
        })
    }
}