import { IsMongoId, IsNotEmpty } from 'class-validator';

export class UserParamsHandler {
  @IsMongoId()
  @IsNotEmpty()
  id: string;
}
