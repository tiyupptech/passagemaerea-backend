import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { FlightsRequestDto } from './dtos/flight-request.dto';
import { FlightSearchRequestDto } from './dtos/flight-search-request.dto';
import { HttpException } from '@nestjs/common/exceptions';
import {LocalAuthGuard} from '../auth/local-auth.guard';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

const Api = axios.create({
    baseURL: `https://flight-pricing-hmg.maxmilhas.com.br`,
})
Api.defaults.headers.common["authorization"] = 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ0ZWM0eW91LmNvbS5iciIsImlhdCI6MTUxMjA1MTkxOSwiZXhwIjoxNTQzNTg3OTI2LCJhdWQiOiJ0ZWM0eW91LmNvbS5iciIsInN1YiI6InRlYzR5b3UiLCJlbnYiOiJobWcifQ.WNCX3-HMVhAaK0xRj5YL0N5w5AhGJfdG6P94h4qOYfY'
Api.defaults.headers.common["Accept-Encoding"] = 'json';

@Injectable()
export class FlightsService {
    
    public async prepareSearch(req: FlightsRequestDto){
        try{
            let resp = await Api.post(`/search`, req);
            return resp.data;
        }catch(e:any){
            throw new HttpException(e.message, e.status);
        }   
    }

    public async search(req: FlightSearchRequestDto){
        try{
            let resp = await Api.get(`/search/v2/${req.searchId}/itineraries?airline=${req.airlineName}`,{
                headers: {
                    'Accept-Encoding': 'application/json',
                }
            });
            return resp.data;
        }catch(e:any){
            throw new HttpException(e.message, e.status);
        }
    }

}
