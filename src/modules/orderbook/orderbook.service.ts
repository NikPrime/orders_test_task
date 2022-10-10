import { Injectable, OnModuleInit } from '@nestjs/common';
import { abi } from '@src/config/abi';
import Web3 from 'web3';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderRepository } from '@src/modules/orderbook/repositories/order.repository';
import { plainToInstance } from 'class-transformer';
import { CreateOrderDto } from '@src/modules/orderbook/dto/create-order.dto';
import { MatchOrderDto } from '@src/modules/orderbook/dto/match-order.dto';
import { GetOrdersQueryDto } from '@src/modules/orderbook/dto/get-orders-query.dto';
import { GetMatchingOrdersQueryDto } from '@src/modules/orderbook/dto/get-matching-orders-query.dto';
import { GetOrdersDto } from '@src/modules/orderbook/dto/get-orders.dto';
import { OrderbookConstants } from '@src/modules/orderbook/constants/orderbook.constants';

@Injectable()
export class OrderbookService implements OnModuleInit {
    constructor(
        @InjectRepository(OrderRepository)
        private readonly orderRepository: OrderRepository,
    ) {}
    private orderEventsList = [];

    async onModuleInit() {
        await this.orderRepository.deleteOrdersFromDB();

        const web3 = new Web3(process.env.INFURA_URL);
        const contract = new web3.eth.Contract(abi as never, process.env.CONTRACT_ADDRESS);

        contract.events
            .allEvents({
                fromBlock: 0,
            })
            .on('connected', () => {
                console.log('Wait for getting events...');

                setInterval(() => {
                    return this.handleOrderEvents.call(this);
                }, OrderbookConstants.START_HANDLE_ORDER_EVENTS_TIME);
            })
            .on('data', (order) => {
                if (
                    order.event === OrderbookConstants.ORDER_CREATED ||
                    order.event === OrderbookConstants.ORDER_MATCHED ||
                    order.event === OrderbookConstants.ORDER_CANCELLED
                ) {
                    this.orderEventsList.push(order);
                }
            });
    }

    async getOrders(query: GetOrdersQueryDto): Promise<GetOrdersDto[]> {
        return this.orderRepository.getOrders(query);
    }

    async getMatchingOrders(query: GetMatchingOrdersQueryDto): Promise<string[]> {
        return this.orderRepository.getMatchingOrders(query);
    }

    private async createOrder(order): Promise<void> {
        await this.orderRepository.createOrder(
            plainToInstance(CreateOrderDto, {
                blockNumber: order.blockNumber,
                ...order.returnValues,
                amountLeftToFill: order.returnValues?.amountA,
                isMarket: order.returnValues?.amountB === 0,
            }),
        );
    }

    private async matchOrder(order): Promise<void> {
        await this.orderRepository.matchOrder(
            plainToInstance(MatchOrderDto, {
                blockNumber: order.blockNumber,
                ...order.returnValues,
                amountPaid: Number(order.returnValues?.amountPaid),
                amountReceived: Number(order.returnValues?.amountReceived),
                amountLeftToFill: Number(order.returnValues?.amountLeftToFill),
            }),
        );
    }

    private async cancelOrder(id: string): Promise<void> {
        return this.orderRepository.cancelOrder(id);
    }

    private async handleOrderEvents(): Promise<void> {
        while (this.orderEventsList.length !== 0) {
            const orderEvent = this.orderEventsList.shift();
            switch (orderEvent.event) {
                case OrderbookConstants.ORDER_CREATED:
                    await this.createOrder(orderEvent);
                    break;
                case OrderbookConstants.ORDER_MATCHED:
                    await this.matchOrder(orderEvent);
                    break;
                case OrderbookConstants.ORDER_CANCELLED:
                    await this.cancelOrder(orderEvent.returnValues?.id);
                    break;
            }
        }
    }
}
