module.exports = {
  TOKEN_KEY: 'melathil_hardwares',
  localDatabase: "mongodb://localhost:27017/mmanagement",
  ACTIVE_STATUS: 'active',
  REJECT_STATUS: 'rejected',
  PENDING_STATUS: 'pending',
  RESIGN_STATUS: 'resigned',
  BLOCK_STATUS: 'blocked',
  sessionSecret: 'melathilhardwares',
  CLIENT_STATUS: [
    "Approached",
    "Called",
    "Borchure Send",
    "Visited Company",
    "Site Visited",
    "Products Selected",
    "Selection Changed",
    "Quotation Prepared",
    "Billed",
    "Delivered",
    "Closed"
  ],
  CLIENT_TEMPARATURE: [
    "HOT",
    "WARM",
    "COLD"
  ],
  USER_TYPES: [
    "SHOWROOM",
    "FIELD",
  ],
  ENQUIRY_PROIRITY: [
    "Class A",
    "Class B",
    "Class C"
  ]
};
