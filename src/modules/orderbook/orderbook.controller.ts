import { Controller, Get, Query } from '@nestjs/common';
import { OrderbookService } from './orderbook.service';
import { ApiOperation } from '@nestjs/swagger';
import { GetOrdersQueryDto } from '@src/modules/orderbook/dto/get-orders-query.dto';
import { GetMatchingOrdersQueryDto } from '@src/modules/orderbook/dto/get-matching-orders-query.dto';

@Controller()
export class OrderbookController {
    constructor(private readonly orderbookService: OrderbookService) {}

    @ApiOperation({
        summary: 'GetOrders',
    })
    @Get('getOrders')
    async getOrders(@Query() query: GetOrdersQueryDto) {
        return this.orderbookService.getOrders(query);
    }

    @ApiOperation({
        summary: 'GetMatchingOrders',
    })
    @Get('getMatchingOrders')
    async getMatchingOrders(@Query() getMatchingOrdersQueryDto: GetMatchingOrdersQueryDto) {
        return this.orderbookService.getMatchingOrders(getMatchingOrdersQueryDto);
    }
}
