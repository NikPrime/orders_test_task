import { Exclude, Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

export interface IPaginationQueryDto {
    limit?: number;
    offset?: number;
}

@Exclude()
export class PaginationQueryDto implements IPaginationQueryDto {
    @Expose()
    @IsOptional()
    limit?: number;

    @Expose()
    @IsOptional()
    offset?: number;
}
