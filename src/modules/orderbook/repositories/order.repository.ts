import { EntityRepository, Repository } from 'typeorm';
import { OrderEntity } from '@src/modules/orderbook/entities/order.entity';
import { GetOrdersQueryDto } from '@src/modules/orderbook/dto/get-orders-query.dto';
import { plainToInstance } from 'class-transformer';
import { GetOrdersDto } from '@src/modules/orderbook/dto/get-orders.dto';
import { GetOrdersMapperDto } from '@src/modules/orderbook/dto/get-orders-mapper.dto';
import { GetMatchingOrdersQueryDto } from '@src/modules/orderbook/dto/get-matching-orders-query.dto';

@EntityRepository(OrderEntity)
export class OrderRepository extends Repository<OrderEntity> {
    async getOrders(commonQuery: GetOrdersQueryDto): Promise<GetOrdersDto[]> {
        const query: GetOrdersMapperDto = {};

        if (commonQuery.tokenA) query.tokenA = commonQuery.tokenA;
        if (commonQuery.tokenB) query.tokenB = commonQuery.tokenB;
        if (commonQuery.active) query.isActive = commonQuery.active;
        if (commonQuery.user) query.user = commonQuery.user;

        const orders = await this.find({
            where: query,
            take: commonQuery.limit,
            skip: commonQuery.offset,
        });

        return plainToInstance(GetOrdersDto, orders);
    }

    async getMatchingOrders(query: GetMatchingOrdersQueryDto): Promise<string[]> {
        const orders = await this.find({
            where: query,
            select: ['id'],
        });

        return orders.map((order) => order.id);
    }

    async createOrder(createOrderDto): Promise<void> {
        const isOrderExist = await this.findOne(createOrderDto.id);
        if (!isOrderExist) {
            const createdOrder = await this.save(createOrderDto);
            console.log(`Order ${createdOrder.id} was created`);
        }
    }

    async matchOrder(orderDto): Promise<void> {
        const order = await this.findOne({
            id: orderDto.id,
            isActive: true,
        });
        if (!order) return;

        const savedOrder = await this.save({
            id: orderDto.id,
            isActive: orderDto.amountLeftToFill !== 0,
            amountLeftToFill: orderDto.amountLeftToFill,
        });

        console.log(`Order ${savedOrder.id} was matched`);
    }

    async cancelOrder(id: string): Promise<void> {
        const cancelledOrder = await this.save({
            id,
            isActive: false,
        });
        console.log(`Order ${cancelledOrder.id} was cancelled`);
    }

    async deleteOrdersFromDB() {
        await this.query('TRUNCATE orders');
    }
}
