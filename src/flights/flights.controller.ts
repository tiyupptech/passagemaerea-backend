import { Body, Controller, Post, UseGuards}from '@nestjs/common';
import { FlightsRequestDto } from './dtos/flight-request.dto';
import { FlightSearchRequestDto } from './dtos/flight-search-request.dto';
import { FlightResponseDto } from './dtos/flight-response.dto';
import { FlightsService } from './flights.service';
import { FlightSearchResponseDto } from './dtos/flight-search-response.dto';
import { AuthService } from '../auth/auth.service';
import { convertBRLToNumber } from './util/format';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { IFlightSearchResultTicket, IFlightSearchResult } from './interfaces/IFlightSearchApi';

@Controller('flights')
export class FlightsController {
    
    constructor(private flightsService: FlightsService,
        private authService: AuthService){}

    @UseGuards(JwtAuthGuard)
    @Post('/prepare-search')
    async prepare(@Body() flightsRequestDto: FlightsRequestDto) : Promise<any>{
        return await this.flightsService.prepareSearch(flightsRequestDto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/search')
    async search(@Body() flightsSearchRequestDto: FlightSearchRequestDto) : Promise<any>{
        return await this.flightsService.search(flightsSearchRequestDto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/search-all')
    async searchAll(@Body() flightsRequestDto: FlightsRequestDto) : Promise<IFlightSearchResult>{
        let prepare = await this.flightsService.prepareSearch(flightsRequestDto) as FlightResponseDto;
        let airlines = prepare.airlines.filter(a => a.status.enable == true);

        let flights:Array<FlightSearchResponseDto> = [];
        for (const airline of airlines){
            if(['azul','gol','latam','tap'].includes(airline.label.toString()))
                flights.push(await this.flightsService.search({
                    searchId: prepare.id,
                    airlineName: airline.label
                }))
        }

        let resp: IFlightSearchResult = {
            tickets: []
        }

        flights.forEach(f => {
            let formated = this.flightsService.convertReturnToPassagemAerea(f);
            if(formated.length > 0){
                resp.tickets = resp.tickets.concat(formated);
            }
        })

        resp.tickets.sort((a,b) => (convertBRLToNumber(a.stub.price) < convertBRLToNumber(b.stub.price)) ? 1 : ((convertBRLToNumber(b.stub.price) <  convertBRLToNumber(a.stub.price)) ? -1 : 0))


        return resp;
    }

}
