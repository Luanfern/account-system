import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/do-register.dto';
import { Account } from '../entities/account.entity';
import { CryptoFunctions } from '../functions/crypto';

@Injectable()
export class RegisterService {
    constructor(
        @InjectRepository(Account)
        private regiterRepositoy: Repository<Account>,
    ){}

    async createAccount(accountData: RegisterDto): Promise<Account> {

        var crypto = new CryptoFunctions()
        const cryptoPass = crypto.encript(accountData.password)
        
        const create = this.regiterRepositoy.create({
            email: accountData.email,
            name: accountData.name,
            password: cryptoPass
        })
        const save = this.regiterRepositoy.save(create)
        return save
    }
}
