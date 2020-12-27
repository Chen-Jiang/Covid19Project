import * as mongoose from 'mongoose';

export const CaseSchema = new mongoose.Schema({
    fullName: String,
    shortName: String,
    continent: String,
    date: Date,
    total_case: Number,
    new_case: Number,
    total_death: Number,
    new_death: Number
})
