import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { RegisterDto } from './dto/do-register.dto';
import { Account } from '../entities/account.entity';
import { RegisterService } from './register.service';
import { Token } from '../auth/dto/token-output.dto';

@Resolver('register')
export class RegisterResolver {

    constructor(
        private serviceRegister: RegisterService
    ){}

   @Query(() => String)
    async q1(){
        return 'Use mutation register to register an account!'
    }

    @Mutation(() => Token)
    async register(@Args('data') dados: RegisterDto){
        try {
            const datas =  await this.serviceRegister.createAccount(dados)
            return datas
        } catch (error) {
            console.log(error.message)
            return 'Ocorreu um erro'
        }
    }


}
