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

@Injectable()
export class OrderbookService implements OnModuleInit {
    constructor(
        @InjectRepository(OrderRepository)
        private readonly orderRepository: OrderRepository,
    ) {}

    async onModuleInit() {
        await this.orderRepository.deleteOrdersFromDB();

        const web3 = new Web3(process.env.INFURA_URL);
        const contract = new web3.eth.Contract(abi as never, process.env.CONTRACT_ADDRESS);

        console.log('Wait for getting events...');
        contract.events
            .OrderCreated({
                fromBlock: 0,
            })
            .on('data', (order) => {
                return this.createOrder(order);
            });

        setTimeout(() => {
            contract.events
                .OrderMatched({
                    fromBlock: 0,
                })
                .on('data', (order) => {
                    return this.matchOrder(order);
                });

            contract.events
                .OrderCancelled({
                    fromBlock: 0,
                })
                .on('data', (order) => {
                    return this.cancelOrder(order.returnValues?.id);
                });
        }, 7000);
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
}
