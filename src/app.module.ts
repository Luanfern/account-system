import { ApolloDriver } from '@nestjs/apollo';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from './account/auth/auth.module';
import { RegisterModule } from './account/register/register.module';
import { AuthMiddlewareMiddleware } from './middlewares/auth-middleware/auth-middleware.middleware';
//import { typeOrmConfigAsync } from './config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    //TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'account_system',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      include: [
        AuthModule,
        RegisterModule 
      ]
    }),
    AuthModule,
    RegisterModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AuthMiddlewareMiddleware)
  }
  
}
