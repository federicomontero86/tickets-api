import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  @IsNotEmpty()
  readonly problem: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly purchaseDate: string;

  @IsString()
  @IsNotEmpty()
  readonly billNumber: string;

  @IsString()
  @IsNotEmpty()
  readonly productCode: string;
}
