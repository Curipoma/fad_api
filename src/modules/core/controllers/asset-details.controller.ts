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
import { AssetDetailsService } from '@core/services';
import {
  CreateAssetDetailsDto,
  FilterAssetDetailsDto,
  UpdateAssetDetailsDto,
} from '@core/dto';
import { ResponseHttpModel } from '@shared/models';
import { AssetDetailEntity } from '@core/entities';

@ApiTags('Asset Details')
@Controller('asset-details')
export class AssetDetailsController {
  constructor(private assetDetailsService: AssetDetailsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create an asset detail' })
  async create(
    @Body() payload: CreateAssetDetailsDto,
  ): Promise<ResponseHttpModel<AssetDetailEntity>> {
    const { data } = await this.assetDetailsService.create(payload);

    return {
      data,
      message: 'Created, a asset detail',
      title: 'Create',
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find all asset details' })
  async findAll(
    @Query() params: FilterAssetDetailsDto,
  ): Promise<ResponseHttpModel<AssetDetailEntity[]>> {
    const { data, pagination } = await this.assetDetailsService.findAll(params);

    return {
      data,
      message: `Found all asset details (search = ${params.search ?? 'empty'})`,
      pagination,
      title: 'Found all',
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find one asset detail' })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseHttpModel<AssetDetailEntity>> {
    const { data } = await this.assetDetailsService.findOne(id);

    return {
      data,
      message: `Found one, asset detail ${id}`,
      title: `Found one`,
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Update an asset detail' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateAssetDetailsDto,
  ): Promise<ResponseHttpModel<AssetDetailEntity>> {
    const { data } = await this.assetDetailsService.update(id, payload);

    return {
      data,
      message: `Updated, asset detail ${id}`,
      title: `Updated`,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Remove an asset detail' })
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseHttpModel<AssetDetailEntity>> {
    const { data } = await this.assetDetailsService.remove(id);

    return {
      data,
      message: `Removed, asset detail ${id}`,
      title: `Removed`,
    };
  }

  @Patch('remove-all')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Remove all asset details' })
  async removeAll(
    @Body() payload: number[],
  ): Promise<ResponseHttpModel<AssetDetailEntity[]>> {
    const { data } = await this.assetDetailsService.removeAll(payload);

    return {
      data,
      message: `Removed all asset detail ${payload.toString()}`,
      title: `Removed all`,
    };
  }
}
