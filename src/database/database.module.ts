import { Global, Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { DatabaseSeeder } from './seeds/database-seeder';
import { UsersSeeder } from './seeds/users-seeder';

@Global()
@Module({
  providers: [
    ...databaseProviders,
    DatabaseSeeder,
    UsersSeeder,
  ],
  exports: [
    ...databaseProviders,
    DatabaseSeeder,
    UsersSeeder,
  ],
})
export class DatabaseModule {}
