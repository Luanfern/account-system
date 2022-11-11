import { Resolver, Query, Args } from '@nestjs/graphql';
import { Token } from './dto/token-output.dto';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/do-auth.dto';
import { Account } from '../entities/account.entity';

@Resolver('auth')
export class AuthResolver {

    constructor(
        private authservice: AuthService
    ){}

    @Query(() => Token)
    async login(@Args('data') dados: AuthDto){
        const account = await this.authservice.AuthAccount(dados)
        return account
    }

   @Query(() => Account)
    async autoLogin(@Args('token') token: String){
        const account = await this.authservice.AuthAutoAccount({token: token} as Token)
        return account
    }

}
