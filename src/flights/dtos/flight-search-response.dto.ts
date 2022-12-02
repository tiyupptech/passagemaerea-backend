import { IsNumber, isString, IsString } from 'class-validator'

export class FlightSearchResponseDto{
    flights: Array<Flights>;
    itineraries: Array<Itinerary>
}

export class Flights{
    @IsString()
    id: String;
    @IsString()
    airline: String;
    @IsString()
    from: String;
    @IsString()
    to: String;
    @IsString()
    flightNumber: String;
    @IsString()
    cabin: String;
    @IsString()
    durations: String;
    @IsString()
    departureDate: String;
    @IsString()
    arrivalDate: String;
    @IsString()
    direction: String;
    @IsNumber()
    stops: Number;
    @IsString()
    createdDate: String;
    @IsString()
    choosedTripType: String;
    trips: Array<Trip>;
}

export class Trip{
    @IsString()
    from: String;
    @IsString()
    to: String;
    @IsString()
    departureDate: String;
    @IsString()
    arrivalDate: String;
    @IsString()
    aircraft?: String;
    @IsString()
    carrier: String;
    @IsString()
    flightNumer: String;
    @IsNumber()
    duration: Number;
    @IsNumber()
    layover: Number;
    @IsNumber()
    stops: Number;
    @IsString()
    cabin: String;
    isInternational: Boolean;
}

export class Itinerary{
    @IsString()
    outbound: String;
    @IsString()
    inbound?: String;
    @IsString()
    searchLink: String;
    @IsString()
    bookingLink: String;
    @IsString()
    availableIn: String;
    pricing: Pricing;
}

export class Pricing{
    miles: Object;
    @IsNumber()
    fareTotal: Number;
    @IsNumber()
    saleTotal: Number;
    @IsNumber()
    milesTotal: Number;
    adult: Adult;
}

export class Adult{
    @IsNumber()
    quantity: Number;
    @IsNumber()
    fare: Number;
    @IsNumber()
    miles: Number;
    fees: Array<Fees>;
}

export class Fees{
    id?: Number;
    type: String;
    value: Number;
}

export class IncludedServices{
    outbound: Outbound;
}

export class Outbound{
    luggage: Array<Luggage>;
}

export class Luggage{
    baggageCategory: String;
    maximumQuantity: Number;
    maximumWeightPerUnit: Number;
    measureUnit: String;
}