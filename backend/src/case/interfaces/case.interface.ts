import { Document } from "mongoose";

export interface Case extends Document {
    readonly fullName: string,
    readonly shortName: string,
    readonly continent: string,
    readonly date: Date,
    readonly total_case: number,
    readonly new_case: number,
    readonly total_death: number,
    readonly new_death: number

}
