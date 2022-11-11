import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './dto/token-output.dto';
import { Repository } from 'typeorm';
import { Account } from '../entities/account.entity';
import { CryptoFunctions } from '../functions/crypto';
import { JwtToken } from '../functions/jwt-token';
import { AuthDto } from './dto/do-auth.dto';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(Account)
        private regiterRepositoy: Repository<Account>
    ){}

    async AuthAccount(dataAccout: AuthDto): Promise<Token>{
        try {
            var crypto = new CryptoFunctions()
            const cryptoPass = crypto.encript(dataAccout.password)
            
            const account =  await this.regiterRepositoy.findOne({
                where: {
                    email: dataAccout.email,
                    password: cryptoPass
                }
            })

            var jwt = new JwtToken()
            const jwtString = jwt.generateToken(account.id)

            return {token: jwtString} as Token
        } catch (error) {
            throw new Error(error.message);
            
        }
    }


   async AuthAutoAccount(token: Token): Promise<Account>{
        try {

            var jwt = new JwtToken()
            const jwtString = jwt.verifyToken(token.token)

            const account =  await this.regiterRepositoy.findOne({
                where: {
                   id: jwtString['id'] 
                }
            })

            return account
        } catch (error) {
            throw new Error(error.message);
            
        }
    }

}
