module.exports = {
  localDatabase: "mongodb://localhost:27017/melathilcrm",
  databaseUrl:
    "mongodb+srv://admin01:AeEQx6Opc9D5VnM9@cluster0.v7spe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
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
    "Delivered"
  ],
  CLIENT_TEMPARATURE: [
    "HOT",
    "WARM",
    "COLD"
  ]
};