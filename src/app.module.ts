import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './database/prisma.services';
import { ConfigModule } from '@nestjs/config';
import { TwitterService } from './config/twitter.services';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' })],
  controllers: [AppController],
  providers: [AppService, PrismaService, TwitterService],
})
export class AppModule {}
