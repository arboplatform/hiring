import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAddressTable1706123335413 implements MigrationInterface {
    name = 'CreateAddressTable1706123335413'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "addresses" ("id" SERIAL NOT NULL, "street" character varying(100) NOT NULL, "zipCode" character varying(8) NOT NULL, "number" character varying(7), "city" character varying(20) NOT NULL, "state" character varying(2) NOT NULL, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "properties" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "properties" ADD "addressId" integer`);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "UQ_2b2211958ef1f0e3c680339100e" UNIQUE ("addressId")`);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "FK_2b2211958ef1f0e3c680339100e" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "FK_2b2211958ef1f0e3c680339100e"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "UQ_2b2211958ef1f0e3c680339100e"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "addressId"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "title"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
    }

}
