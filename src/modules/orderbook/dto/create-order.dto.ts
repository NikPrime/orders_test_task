import { Exclude } from 'class-transformer';
import { IOrderEntity } from '@src/modules/orderbook/entities/order.entity';
import { GetOrdersDto } from '@src/modules/orderbook/dto/get-orders.dto';
import { OmitType } from '@nestjs/swagger';

type ICreateOrderDto = Omit<IOrderEntity, 'isActive'>;

@Exclude()
export class CreateOrderDto extends OmitType(GetOrdersDto, ['isActive']) implements ICreateOrderDto {}
