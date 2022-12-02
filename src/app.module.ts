import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { FlightsService } from './flights/flights.service';
import { FlightsController } from './flights/flights.controller';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [AppController, FlightsController],
  providers: [AppService, FlightsService],
})
export class AppModule {}
