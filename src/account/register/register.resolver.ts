import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { RegisterDto } from './dto/do-register.dto';
import { Account } from '../entities/account.entity';
import { RegisterService } from './register.service';

@Resolver('register')
export class RegisterResolver {

    constructor(
        private serviceRegister: RegisterService
    ){}

   @Query(() => String)
    async q1(){
        return 'Use mutation register to register an account!'
    }

    @Mutation(() => Account)
    async register(@Args('data') dados: RegisterDto){
        const datas =  await this.serviceRegister.createAccount(dados)
        return datas
    }


}
