import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { BoardModule } from './board/board.module';


@Module({
    imports: [
        ConfigModule.forRoot(),
        AuthModule,
        BoardModule
    ],
})
export class AppModule {
}
