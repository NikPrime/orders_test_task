import { Exclude, Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

interface IGetMatchingOrdersQueryDto {
    tokenA: string;
    tokenB: string;
    amountA?: string;
    amountB?: string;
}

@Exclude()
export class GetMatchingOrdersQueryDto implements IGetMatchingOrdersQueryDto {
    @Expose()
    @IsString()
    tokenA: string;

    @Expose()
    @IsString()
    tokenB: string;

    @Expose()
    @IsString()
    @IsOptional()
    amountA?: string;

    @Expose()
    @IsString()
    @IsOptional()
    amountB?: string;
}
