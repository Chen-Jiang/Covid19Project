import {Controller, Post, Get, Res, Param, HttpService, HttpStatus} from '@nestjs/common';
import { CaseService } from "./case.service";
import { CaseSchema } from "./schemas/case.schema";

@Controller('case')
export class CaseController {
    constructor(private caseService: CaseService) {}

    // get all the case list
    @Get('all')
    async getAllCases(@Res() res) {
        const cases = await this.caseService.getAllCases();
        return res.status(HttpStatus.OK).json(cases);
    }

    @Get('queryTotal/:countryName')
    async queryTotalForCountry(@Res() res, @Param('countryName') countryName) {
        const cases = await this.caseService.queryTotalForCountry(countryName)
        return res.status(HttpStatus.OK).json(cases);
    }
}
