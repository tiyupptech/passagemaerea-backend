import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { FlightsRequestDto } from './dtos/flight-request.dto';
import { FlightSearchRequestDto } from './dtos/flight-search-request.dto';
import { HttpException } from '@nestjs/common/exceptions';
import { airlines } from './data/airlines';
import * as moment from 'moment';
import { FlightSearchResponseDto } from './dtos/flight-search-response.dto';
import { IFlightSearchResultTicket } from './interfaces/IFlightSearchApi';
import { places } from './data/places';

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

    public convertReturnToPassagemAerea(params: FlightSearchResponseDto) : Array<IFlightSearchResultTicket>{
        let tickets:Array<IFlightSearchResultTicket> = [];
        params.itineraries.forEach( 
            i =>{
                tickets.push({
                    stub:{
                        id: i.bookingLink.toString(),
                        price: i.pricing.miles.saleTotal.toLocaleString('pt-BR', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        }),
                        dealUrl: i.bookingLink.toString(),
                        agent: {
                            id: "maxmilhaspartnerapi",
                            name: "MaxMilhas",
                            logoUrl: 'https://static.maxmilhas.com.br/img/logo-mm-white.svg'
                        }
                    },
                    legs: params.flights.filter(t => t.id == i.inbound || t.id == i.outbound).
                        map(f => {
                            let company = airlines.filter(a => a.Nome.toLowerCase() == f.airline)[0];
                            let placeDeparture = places.filter(p => p.Sigla.toLowerCase() == f.from.toLowerCase())[0];
                            let placeDestiny = places.filter(p => p.Sigla.toLowerCase() == f.to.toLowerCase())[0];
                            return {
                                id: f.id.toString(),
                                company: {
                                    id: company ? company.Sigla : f.airline,
                                    name: company ? company.Nome : f.airline,
                                    logoUrl: company ? `https://www.skyscanner.net/images/airlines/${company.Sigla}.png` : '--'
                                },
                                departureTime: f.departureDate.toString(),
                                departureStation: {
                                    code: f.from,
                                    cityName: placeDeparture ? placeDeparture.Cidade : '--',
                                    placeName: placeDeparture ? placeDeparture.nome : '--',
                                    countryName: placeDeparture ? placeDeparture.Pais : '--',
                                },
                                arrivalStation:{
                                    code: f.to,
                                    cityName: placeDestiny ? placeDestiny.Cidade : '--',
                                    placeName: placeDestiny ? placeDestiny.nome : '--',
                                    countryName: placeDestiny ? placeDestiny.Pais : '--',
                                },
                                arrivalTime: f.arrivalDate.toString(),
                                legDurationTimeInMinutes: f.trips.reduce((duration, t) => {
                                    return duration + t.duration
                                }, 0),
                                stopsPlaces: f.stops ? f.trips.map(s => {
                                    let place = places.filter(p => p.Sigla.toLowerCase() == s.to.toLowerCase())[0];
                                    return {
                                        code: s.flightNumer,
                                        placeName: place ? place.nome : '--',
                                        countryName: place ? place.Pais : '--',
                                        cityName: place ? place.Cidade : '--',
                                    }
                                }) : []
                            }
                        })
                })
            }
        )
        return tickets;
    }

}
