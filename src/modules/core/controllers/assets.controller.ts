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
import { AssetsService } from '@core/services';
import { CreateAssetDto, FilterAssetDto, UpdateAssetDto } from '@core/dto';
import { ResponseHttpModel } from '@shared/models';
import { AssetEntity } from '@core/entities';

@ApiTags('Assets')
@Controller('assets')
export class AssetsController {
  constructor(private assetsService: AssetsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create an asset' })
  async create(
    @Body() payload: CreateAssetDto,
  ): Promise<ResponseHttpModel<AssetEntity>> {
    const { data } = await this.assetsService.create(payload);

    return {
      data,
      message: 'Created, a asset',
      title: 'Created',
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find all assets' })
  async findAll(
    @Query() params: FilterAssetDto,
  ): Promise<ResponseHttpModel<AssetEntity[]>> {
    const { data, pagination } = await this.assetsService.findAll(params);

    return {
      data,
      message: `Found all assets (search = ${params.search ?? 'empty'})`,
      pagination,
      title: 'Found all',
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find one asset' })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseHttpModel<AssetEntity>> {
    const { data } = await this.assetsService.findOne(id);

    return {
      data,
      message: `Found one, asset ${id}`,
      title: `Found one`,
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Update an asset' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateAssetDto,
  ): Promise<ResponseHttpModel<AssetEntity>> {
    const { data } = await this.assetsService.update(id, payload);

    return {
      data,
      message: `Updated, asset ${id}`,
      title: `Updated`,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Remove an asset' })
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseHttpModel<AssetEntity>> {
    const { data } = await this.assetsService.remove(id);

    return {
      data,
      message: `Removed, asset ${id}`,
      title: `Removed`,
    };
  }

  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Remove all assets' })
  async removeAll(
    @Body() payload: number[],
  ): Promise<ResponseHttpModel<AssetEntity[]>> {
    const { data } = await this.assetsService.removeAll(payload);

    return {
      data,
      message: `Removed all assets ${payload.toString()}`,
      title: `Removed`,
    };
  }
}
