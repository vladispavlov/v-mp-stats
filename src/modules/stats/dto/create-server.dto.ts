import {
  IsNotEmpty,
  IsInt,
  Min,
  IsDate,
  IsString,
  IsBoolean,
  IsPort,
  IsLocale,
  IsUrl,
} from 'class-validator';

export class CreateServerDto {
  @IsNotEmpty()
  @IsString()
  altvID: string;

  @IsInt()
  @Min(0)
  maxPlayers: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsBoolean()
  locked: boolean;

  @IsNotEmpty()
  @IsString()
  host: string;

  @IsPort()
  port: number;

  @IsNotEmpty()
  @IsString()
  gameMode: string;

  @IsNotEmpty()
  @IsString()
  website: string;

  @IsLocale()
  laguage: string;

  @IsString()
  description: string;

  @IsBoolean()
  verified: boolean;

  @IsBoolean()
  promoted: boolean;

  @IsBoolean()
  useEarlyAuth: boolean;

  @IsUrl()
  earlyAuthUrl: string;

  @IsBoolean()
  useCdn: boolean;

  @IsUrl()
  cdnUrl: string;

  @IsBoolean()
  useVoiceChat: boolean;

  @IsString({ each: true })
  tags: string[];

  bannerUrl: string | null;

  @IsNotEmpty()
  @IsString()
  branch: string;

  @IsInt()
  build: number;

  @IsNotEmpty()
  @IsString()
  version: string;

  @IsDate()
  lastUpdate: Date;
}
