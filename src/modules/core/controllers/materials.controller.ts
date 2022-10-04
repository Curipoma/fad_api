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
import { MaterialsService } from '@core/services';
import {
  CreateMaterialsDto,
  FilterMaterialsDto,
  UpdateMaterialsDto,
} from '@core/dto';
import { ResponseHttpModel } from '@shared/models';
import { MaterialEntity } from '@core/entities';
import { Auth } from '@auth/decorators';

@ApiTags('Materials')
@Auth()
@Controller('materials')
export class MaterialsController {
  constructor(private materialsService: MaterialsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create an material' })
  async create(
    @Body() payload: CreateMaterialsDto,
  ): Promise<ResponseHttpModel<MaterialEntity>> {
    const { data } = await this.materialsService.create(payload);

    return {
      data,
      message: 'Created, a material',
      title: 'Create',
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find all materials' })
  async findAll(
    @Query() params: FilterMaterialsDto,
  ): Promise<ResponseHttpModel<MaterialEntity[]>> {
    const { data, pagination } = await this.materialsService.findAll(params);

    return {
      data,
      pagination,
      message: `Found all materials (search = ${params.search ?? 'empty'})`,
      title: 'Found all',
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find one material' })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseHttpModel<MaterialEntity>> {
    const { data } = await this.materialsService.findOne(id);

    return {
      data,
      message: `Found one, material ${id}`,
      title: `Found one`,
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Update a material' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateMaterialsDto,
  ): Promise<ResponseHttpModel<MaterialEntity>> {
    const { data } = await this.materialsService.update(id, payload);

    return {
      data,
      message: `Updated, material ${id}`,
      title: `Updated,`,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Remove a material' })
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseHttpModel<MaterialEntity>> {
    const { data } = await this.materialsService.remove(id);

    return {
      data,
      message: `Removed, material ${id}`,
      title: `Removed`,
    };
  }

  @Patch('remove-all')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Remove all a material' })
  async removeAll(
    @Body() payload: number[],
  ): Promise<ResponseHttpModel<MaterialEntity[]>> {
    const { data } = await this.materialsService.removeAll(payload);

    return {
      data,
      message: `Removed all materials ${payload.toString()}`,
      title: `Removed all`,
    };
  }
}
