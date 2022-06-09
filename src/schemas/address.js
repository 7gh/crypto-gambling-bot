const mongoose = require('mongoose');

const addressModel = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: { type: String, require: true, unique: true},
    address: { type: String, require: true, unique: true},
    tBtcAddress: { type: String }
});

module.exports = mongoose.model("addressModels", addressModel);
