import { IOrderEntity } from '@src/modules/orderbook/entities/order.entity';
import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsString } from 'class-validator';

interface IMatchOrderDto extends Omit<IOrderEntity, 'isActive' | 'user' | 'tokenA' | 'tokenB' | 'amountA' | 'amountB' | 'isMarket'> {
    matchedId: string;
    amountReceived: string;
    amountPaid: string;
}

@Exclude()
export class MatchOrderDto implements IMatchOrderDto {
    @Expose()
    @IsString()
    id: string;

    @Expose()
    matchedId: string;

    @Expose()
    amountLeftToFill: string;

    @Expose()
    amountReceived: string;

    @Expose()
    amountPaid: string;

    @Expose()
    @IsBoolean()
    blockNumber: number;
}
