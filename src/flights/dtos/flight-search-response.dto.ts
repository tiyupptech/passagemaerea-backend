import { IsNumber, isString, IsString } from 'class-validator'

export class FlightSearchResponseDto{
    flights: Array<Flights>;
    itineraries: Array<Itinerary>
}

export class Flights{
    @IsString()
    id: string;
    @IsString()
    airline: string;
    @IsString()
    from: string;
    @IsString()
    to: string;
    @IsString()
    flightNumber: string;
    @IsString()
    cabin: string;
    @IsString()
    durations: string;
    @IsString()
    departureDate: string;
    @IsString()
    arrivalDate: string;
    @IsString()
    direction: string;
    @IsNumber()
    stops: number;
    @IsString()
    createdDate: string;
    @IsString()
    choosedTripType: string;
    trips: Array<Trip>;
}

export class Trip{
    @IsString()
    from: string;
    @IsString()
    to: string;
    @IsString()
    departureDate: string;
    @IsString()
    arrivalDate: string;
    @IsString()
    aircraft?: string;
    @IsString()
    carrier: string;
    @IsString()
    flightNumer: string;
    @IsNumber()
    duration: number;
    @IsNumber()
    layover: number;
    @IsNumber()
    stops: number;
    @IsString()
    cabin: string;
    isInternational: Boolean;
}

export class Itinerary{
    @IsString()
    outbound: string;
    @IsString()
    inbound?: string;
    @IsString()
    searchLink: string;
    @IsString()
    bookingLink: string;
    @IsString()
    availableIn: string;
    pricing: Pricing;
}

export class Pricing{
    miles: Miles;
}

export class Miles{
    @IsNumber()
    fareTotal: number;
    @IsNumber()
    saleTotal: number;
    @IsNumber()
    milesTotal: number;
    adult: Adult;
}

export class Adult{
    @IsNumber()
    quantity: number;
    @IsNumber()
    fare: number;
    @IsNumber()
    miles: number;
    fees: Array<Fees>;
}

export class Fees{
    id?: number;
    type: string;
    value: number;
}

export class IncludedServices{
    outbound: Outbound;
}

export class Outbound{
    luggage: Array<Luggage>;
}

export class Luggage{
    baggageCategory: string;
    maximumQuantity: number;
    maximumWeightPerUnit: number;
    measureUnit: string;
}