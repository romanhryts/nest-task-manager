import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { BoardModule } from './board/board.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.DB_LINK),
        AuthModule,
        BoardModule
    ],
})
export class AppModule {
}
