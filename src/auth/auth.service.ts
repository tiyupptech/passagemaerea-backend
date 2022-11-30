import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class AuthService {
    constructor(private userService: UsersService,
        private jwtService: JwtService) {}

    async validateUser(username: string, pass: string){
        const user = await this.userService.findOne(username);
        if(user && user.password === pass){
            const {password, ...result} = user;
            return result;
        }
        return null;
    }

    async login(user:any){
        const payload = { username: user.username, sub: user.userId};
        return{
            access_token: this.jwtService.sign(payload)
        }
    }
    
}
