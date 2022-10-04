import { ApiOperation, ApiTags } from '@nestjs/swagger';
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
import { AreaService } from '@core/services';
import { CreateAreasDto, FilterAreasDto, UpdateAreaDto } from '@core/dto';
import { ResponseHttpModel } from '@shared/models';
import { AreaEntity } from '@core/entities';

@ApiTags('Area')
@Controller('area')
export class AreaController {
  constructor(private areaService: AreaService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create an area' })
  async create(
    @Body() payload: CreateAreasDto,
  ): Promise<ResponseHttpModel<AreaEntity>> {
    const { data } = await this.areaService.create(payload);

    return {
      data,
      message: 'Created, an area',
      title: 'Create',
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find all areas' })
  async findAll(
    @Query() params: FilterAreasDto,
  ): Promise<ResponseHttpModel<AreaEntity[]>> {
    const { data, pagination } = await this.areaService.findAll(params);

    return {
      data,
      message: `Found all areas (search = ${params.search ?? 'empty'})`,
      pagination,
      title: 'Found all',
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find one area' })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseHttpModel<AreaEntity>> {
    const { data } = await this.areaService.findOne(id);

    return {
      data,
      message: `Found one, area ${id}`,
      title: `Found one`,
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Update an area' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateAreaDto,
  ): Promise<ResponseHttpModel<AreaEntity>> {
    const { data } = await this.areaService.update(id, payload);

    return {
      data,
      message: `Updated, area ${id}`,
      title: `Updated`,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Remove an area' })
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseHttpModel<AreaEntity>> {
    const { data } = await this.areaService.remove(id);

    return {
      data,
      message: `Removed, area s${id}`,
      title: `Removed`,
    };
  }

  @Patch('remove-all')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Remove all areas' })
  async removeAll(
    @Body() payload: number[],
  ): Promise<ResponseHttpModel<AreaEntity[]>> {
    const { data } = await this.areaService.removeAll(payload);

    return {
      data,
      message: `Removed all areas ${payload.toString()}`,
      title: `Removed all`,
    };
  }
}
