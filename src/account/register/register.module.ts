import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterResolver } from './register.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../entities/account.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
  ],
  providers: [RegisterService, RegisterResolver]
})
export class RegisterModule {}
