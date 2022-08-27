import { PaginationDto } from '@core/dto';

export interface ResponseHttpModel<D> {
  data: D;
  message: string | string[];
  title: string;
  pagination?: PaginationDto;
}

export interface ErrorResponseHttpModel {
  error: string;
  message: string | string[];
  statusCode: number;
}
