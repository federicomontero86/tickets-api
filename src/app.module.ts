import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { TicketsModule } from './tickets/tickets.module';
import { DatabaseModule } from './common/database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, AuthModule, TicketsModule],
})
export class AppModule {}
