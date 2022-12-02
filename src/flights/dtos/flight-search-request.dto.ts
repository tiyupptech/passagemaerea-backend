import { IsString } from "class-validator";

export class FlightSearchRequestDto{
    @IsString()
    searchId: String;
    airlineName: String; 
}

