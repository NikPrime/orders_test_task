import { Module } from '@nestjs/common';
import { OrderbookService } from './orderbook.service';
import { OrderbookController } from './orderbook.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from '@src/modules/orderbook/repositories/order.repository';

@Module({
    imports: [TypeOrmModule.forFeature([OrderRepository])],
    controllers: [OrderbookController],
    providers: [OrderbookService],
})
export class OrderbookModule {}
