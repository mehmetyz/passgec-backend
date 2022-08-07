const mongoose = require('../common/mongoose.js');
export const Flight = mongoose.Schema('Flight', {
    id: String,
    userId: String,
    PNR: String,
    IsReturningFlight: Boolean,
    IsAnadoluJetFlight: Boolean,
    ArrivalLocation: String,
    DepartureLocation: String,
    PassengerName: String,
    PasserNamePrefix: String,
    PassengerSurname: String,
    BoardingInfo: Boolean,
    BoardingPassInfo: Boolean,
    CheckinInfo: Boolean,
    DepartureDate: String,
    ArrivalDate: String,
    DepartureTime: String,
    ArrivalTime: String,
    BaggageAllowance: Number
}, { _id: false, versionKey: false });

