import { IsString, IsNumber } from "class-validator";

export class FlightResponseDto {
    @IsString()
    id: String;
    createdDate: String;
    isInternational: Boolean;
    isMercosul: Boolean;
    fromCountry: String;
    toCountry: String;
    airlines: Array<AirlinesDto>;
}

export class AirlinesDto{
    @IsString()
    label: String;
    @IsNumber()
    timeout: Number;
    status: AirlinesStatusDto;
}

export class AirlinesStatusDto{
    enable: Boolean;
    @IsString()
    message: String;
}