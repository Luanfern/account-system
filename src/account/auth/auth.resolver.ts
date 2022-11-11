import { Resolver, Query, Args } from '@nestjs/graphql';
import { Account } from '../entities/account.entity';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/do-auth.dto';

@Resolver('auth')
export class AuthResolver {

    constructor(
        private authservice: AuthService
    ){}

   /* @Query(() => Object)
    login(){
        return {its: 'ok'}
    }*/

    @Query(() => Account)
    async login(@Args('data') dados: AuthDto){
        const account = await this.authservice.AuthAccount(dados)
        return account
    }

}
