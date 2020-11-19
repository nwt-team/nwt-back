import { IsMongoId, IsNotEmpty } from 'class-validator';

export class ParamsHandler {
  @IsMongoId()
  @IsNotEmpty()
  id: string;
}
