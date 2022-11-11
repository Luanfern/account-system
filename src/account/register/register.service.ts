import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/do-register.dto';
import { Account } from '../entities/account.entity';

@Injectable()
export class RegisterService {
    constructor(
        @InjectRepository(Account)
        private regiterRepositoy: Repository<Account>
    ){}

    async createAccount(accountData: RegisterDto): Promise<Account> {
        const create = this.regiterRepositoy.create(accountData)
        const save = this.regiterRepositoy.save(create)
        return save
    }
}
