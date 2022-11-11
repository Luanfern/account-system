import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../entities/account.entity';
import { AuthDto } from './dto/do-auth.dto';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(Account)
        private regiterRepositoy: Repository<Account>
    ){}

    async AuthAccount(dataAccout: AuthDto): Promise<Account>{
        const account =  await this.regiterRepositoy.findOne({
            where: {
                email: 'luan@gmail.com',//dataAccout.email,
                password: '123abc'//dataAccout.password
            }
        })
        console.log(account)
        return account
    }

}
