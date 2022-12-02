import { IsString, IsNumber } from "class-validator";


export class FlightsRequestDto{
    tripType: TripType;
    @IsString()
    from: String;
    @IsString()
    to?: String;
    @IsNumber()
    adults: Number;
    @IsNumber()
    children?: Number;
    @IsNumber()
    infants?: Number;
    @IsString()
    outboundDate: String;
    @IsString()
    inboundDate?: String;
    cabin?: Cabin;
}

export enum TripType{
    RT = "RT",
    OW = "OW",
}

export enum Cabin{
    EC = "EC",
    EX = "EX",
}