import { IsInt, Min, IsDate } from 'class-validator';

export class CreateOnlineDto {
  @IsInt()
  @Min(0)
  readonly quantity: number;

  @IsDate()
  readonly timestamp: Date;
}
