import { IsNotEmpty, IsInt, Min, IsDate, IsString } from 'class-validator';

export class CreateOnlineDto {
  @IsNotEmpty()
  @IsString()
  readonly altvID: string;

  @IsInt()
  @Min(0)
  readonly players: number;

  @IsDate()
  readonly timestamp: Date;
}
