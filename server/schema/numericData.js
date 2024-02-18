const mongoose = require("mongoose");

const naturalGasPriceSchema = mongoose.Schema(
    {
    Month: {
        type: String,
        require: true,
        unique: true,
    },
    Price: {
        type: Number,
        required: true,
    }
});

const NaturalGasPrice = mongoose.model("NaturalGasPrice", naturalGasPriceSchema);

module.exports = NaturalGasPrice;