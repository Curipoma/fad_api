import { PaginationDto } from '@core/dto';

export interface ServiceResponseHttpModel<D> {
  data: D;
  pagination?: PaginationDto;
}
