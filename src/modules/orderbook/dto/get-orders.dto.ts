import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsString } from 'class-validator';
import { IOrderEntity } from '@src/modules/orderbook/entities/order.entity';

type IGetOrdersDto = IOrderEntity;

@Exclude()
export class GetOrdersDto implements IGetOrdersDto {
    @Expose()
    @IsString()
    id: string;

    @Expose()
    @IsString()
    user: string;

    @Expose()
    @IsString()
    tokenA: string;

    @Expose()
    @IsString()
    tokenB: string;

    @Expose()
    amountA: string;

    @Expose()
    amountB: string;

    @Expose()
    amountLeftToFill: string;

    @Expose()
    @IsBoolean()
    isMarket: boolean;

    @Expose()
    @IsBoolean()
    blockNumber: number;

    @Expose()
    @IsBoolean()
    isActive: boolean;
}
