import { Expose } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';
import { GetOrdersQueryDto, IGetOrdersQueryDto } from '@src/modules/orderbook/dto/get-orders-query.dto';

interface IGetOrdersMapperDto extends Omit<IGetOrdersQueryDto, 'isActive'> {
    isActive?: boolean;
}

export class GetOrdersMapperDto extends GetOrdersQueryDto implements IGetOrdersMapperDto {
    @Expose()
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}
