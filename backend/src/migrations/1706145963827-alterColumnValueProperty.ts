import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterColumnValueProperty1706145963827 implements MigrationInterface {
    name = 'AlterColumnValueProperty1706145963827'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "properties" ADD "value" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "properties" ADD "value" numeric NOT NULL`);
    }

}
