import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ConsumablesService } from '@core/services';
import {
  CreateConsumablesDto,
  FilterConsumablesDto,
  UpdateConsumablesDto,
} from '@core/dto';
import { ResponseHttpModel } from '@shared/models';
import { ConsumableEntity } from '@core/entities';

@ApiTags('Consumables')
@Controller('consumables')
export class ConsumablesController {
  constructor(private consumablesService: ConsumablesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create an consumable' })
  async create(
    @Body() payload: CreateConsumablesDto,
  ): Promise<ResponseHttpModel<ConsumableEntity>> {
    const { data } = await this.consumablesService.create(payload);

    return {
      data,
      message: 'Created, a consumable',
      title: 'Created',
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find all consumables' })
  async findAll(
    @Query() params: FilterConsumablesDto,
  ): Promise<ResponseHttpModel<ConsumableEntity[]>> {
    const { data, pagination } = await this.consumablesService.findAll(params);

    return {
      data,
      message: `Found all consumables (search = ${params.search ?? 'empty'})`,
      pagination,
      title: 'Found all',
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find one consumable' })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseHttpModel<ConsumableEntity>> {
    const { data } = await this.consumablesService.findOne(id);

    return {
      data,
      message: `Found one, consumable ${id}`,
      title: `Found one`,
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Update an consumable' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateConsumablesDto,
  ): Promise<ResponseHttpModel<ConsumableEntity>> {
    const { data } = await this.consumablesService.update(id, payload);

    return {
      data,
      message: `Update, consumable  ${id}`,
      title: `Updated`,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Remove an consumable' })
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseHttpModel<ConsumableEntity>> {
    const { data } = await this.consumablesService.remove(id);

    return {
      data,
      message: `Removed, consumable ${id}`,
      title: `Removed`,
    };
  }

  @Patch('remove-all')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Remove all consumables' })
  async removeAll(
    @Body() payload: number[],
  ): Promise<ResponseHttpModel<ConsumableEntity[]>> {
    const { data } = await this.consumablesService.removeAll(payload);

    return {
      data,
      message: `Removed all consumables ${payload.toString()}`,
      title: `Removed all`,
    };
  }
}
