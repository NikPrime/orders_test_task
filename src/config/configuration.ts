import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export type ConfigType = {
    database: TypeOrmModuleOptions;
};

export default (): ConfigType => ({
    database: {
        name: 'default',
        type: 'postgres',
        host: process.env.API_DB_HOST || 'localhost',
        port: Number.parseInt(process.env.API_DB_PORT) || 5432,
        username: process.env.API_DB_USERNAME,
        password: process.env.API_DB_PASSWORD,
        database: process.env.API_DB_NAME,
        autoLoadEntities: true,
        migrations: ['dist/migration/*.js'],
    },
});
