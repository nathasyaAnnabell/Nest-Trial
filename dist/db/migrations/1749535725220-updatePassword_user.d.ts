import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class UpdatePasswordUser1749535725220 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
