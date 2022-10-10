import { Column, Entity, PrimaryColumn } from 'typeorm';

export interface IOrderEntity {
    id: string;
    user: string;
    tokenA: string;
    tokenB: string;
    amountA: string;
    amountB: string;
    amountLeftToFill: string;
    isMarket: boolean;
    isActive: boolean;
    blockNumber: number;
}

@Entity('orders')
export class OrderEntity implements IOrderEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    user: string;

    @Column()
    tokenA: string;

    @Column()
    tokenB: string;

    @Column()
    amountA: string;

    @Column()
    amountB: string;

    @Column()
    amountLeftToFill: string;

    @Column({ default: true })
    isMarket: boolean;

    @Column({ default: true })
    isActive: boolean;

    @Column()
    blockNumber: number;
}
