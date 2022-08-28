import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { DatabaseSeeder } from '@database';
import { ResponseHttpModel } from '@shared/models';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private databaseSeeder: DatabaseSeeder,
  ) {}

  @Get('init')
  @ApiOperation({ summary: 'start the application' })
  async init(): Promise<ResponseHttpModel<object>> {
    await this.databaseSeeder.run();

    return {
      data: { initialized: true },
      message: 'Application initialized successfully',
      title: 'API FAD - initialized',
    };
  }
}
