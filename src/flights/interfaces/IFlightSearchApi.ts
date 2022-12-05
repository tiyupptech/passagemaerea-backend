
export interface IPlace {
  placeId: string;
  entityId: string;
  iata: string;
  placeName: string;
  contryId: string;
  regionId: string;
  cityId: string;
  cityName: string;
  countryName: string;
}

export interface Value {
  content: string;
}

export interface Label {
  content: string;
}

export interface Id {
  content: string;
}

export interface Ordem {
  content: string;
}

export interface Child {
  value: Value;
  label: Label;
  id: Id;
  ordem: Ordem;
}

export interface IFlightSearchResult {
  tickets: IFlightSearchResultTicket[];
}

export interface IFlightSearchResultTicket {
  legs: IFlightSearchResultLeg[];
  stub: IFlightSearchResultStub;
}

export interface IFlightSearchResultLeg {
  id: string;
  company: ICompany;
  departureTime: string;
  departureStation?: StationObject;
  arrivalTime: string;
  arrivalStation?: StationObject;
  legDurationTimeInMinutes: number;
  stopsPlaces: StationObject[];
}

export interface IAgent {
  id: string;
  name: string;
  logoUrl: string;
}

export interface ICompany {
  id: string;
  name: string;
  logoUrl: string;
}

export interface StationObject {
  code: string;
  placeName: string;
  countryName: string;
  cityName: string;
}

export interface IFlightSearchResultStub {
  id: string;
  price: string;
  dealUrl: string;
  agent?: IAgent;
}

export interface Fees{
  id?: Number;
  type: string;
  value: Number;
}

export interface IncludedServices{
  outbound: Outbound;
}

export interface Outbound{
  luggage: Array<Luggage>;
}

export interface Luggage{
  baggageCategory: string;
  maximumQuantity: Number;
  maximumWeightPerUnit: Number;
  measureUnit: string;
}