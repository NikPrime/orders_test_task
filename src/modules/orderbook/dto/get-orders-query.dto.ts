import { Exclude, Expose, Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { IPaginationQueryDto, PaginationQueryDto } from '@src/common/pagination/pagination.dto';

export interface IGetOrdersQueryDto extends IPaginationQueryDto {
    tokenA?: string;
    tokenB?: string;
    user?: string;
    active?: boolean;
}

@Exclude()
export class GetOrdersQueryDto extends PaginationQueryDto implements IGetOrdersQueryDto {
    @Expose()
    @IsString()
    @IsOptional()
    tokenA?: string;

    @Expose()
    @IsString()
    @IsOptional()
    tokenB?: string;

    @Expose()
    @IsString()
    @IsOptional()
    user?: string;

    @Expose()
    @IsBoolean()
    @IsOptional()
    @Transform(({ value }) => {
        if (value === 'true') return true;
        if (value === 'false') return false;
    })
    active?: boolean;
}
