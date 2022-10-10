import { MigrationInterface, QueryRunner } from 'typeorm';

export class initOrderbook1665297529864 implements MigrationInterface {
    name = 'initOrderbook1665297529864';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'CREATE TABLE "orders" ("id" character varying NOT NULL, "user" character varying NOT NULL, "tokenA" character varying NOT NULL, "tokenB" character varying NOT NULL, "amountA" character varying NOT NULL, "amountB" character varying NOT NULL, "amountLeftToFill" character varying NOT NULL, "isMarket" boolean NOT NULL DEFAULT true, "isActive" boolean NOT NULL DEFAULT true, "blockNumber" integer NOT NULL, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))',
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE "orders"');
    }
}
