import { Injectable } from "@nestjs/common";
import { Model } from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";
import { Case } from './interfaces/case.interface';

@Injectable()
export class CaseService {
    constructor(@InjectModel('Case') private readonly caseModel: Model<Case>) {
    }

    // to get the total cases of every country every day
    async getAllCases(): Promise<any> {

        const year = new Date().getFullYear()
        const month = new Date().getMonth() + 1
        const day = new Date().getDate() -1
        const today_date = year + "-" + month + "-" + day

        const result_dic = {};

        const result =  await this.caseModel.aggregate([
            {
                $match: {
                    "dateOfRecord" : { $eq: today_date }
                }
            },
            {
                $group: {
                    _id: { date: "$dateOfRecord", country: "$location" },
                    numCase: { $addToSet: {"new_cases": "$new_cases", "total_cases":"$total_cases", "death_cases": "$total_deaths"} },
                    to_cases: { $push: "$total_cases" }
                }
            },
            {
                $sort: { to_cases: -1 }
            }
        ])

        result_dic['World'] = result[0]['numCase'][0]
        const countries = []
        const death_cases = []
        const new_cases = []

        for (const item of result.slice(1,)) {
            const country = {}
            country['country'] = item['_id']['country']
            country['total_case'] = item['numCase'][0]['total_cases']
            const death = {}
            death['country'] = item['_id']['country']
            death['death_case'] = item['numCase'][0]['death_cases']
            const new_ca = {}
            new_ca['country'] = item['_id']['country']
            new_ca['new_case'] = item['numCase'][0]['new_cases']
            countries.push(country)
            death_cases.push(death)
            new_cases.push(new_ca)
        }
        result_dic['numOfCountries'] = countries.length
        result_dic['Case_of_countries'] = countries
        result_dic['death_cases'] = death_cases
        result_dic['new_cases'] = new_cases

        console.log(result_dic)

        return result_dic
    }

    async queryTotalForCountry(countryName): Promise<any> {
        console.log('enter')
        const data = await this.caseModel.find({location: countryName}).sort({dateOfRecord: 1})
        const results = {}
        const total_results = []
        const total = []
        const dates = []
        for (const item of data) {
            // console.log("item:", )
            // results[item.get('dateOfRecord')] = item.get('total_cases')
            total.push(item.get('total_cases'))
            dates.push(item.get('dateOfRecord'))
        }
        results['total'] = total
        results['dates'] = dates
        // console.log([results])
        return results
    }


}
