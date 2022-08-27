import { PartialType } from "@nestjs/swagger";
import { CreateAssetDto } from "@core/dto";

export class UpdateAssetDto extends PartialType(CreateAssetDto) {}
