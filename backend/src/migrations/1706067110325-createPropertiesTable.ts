import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePropertiesTable1706067110325 implements MigrationInterface {
    name = 'CreatePropertiesTable1706067110325'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "properties" ("id" SERIAL NOT NULL, "sold" boolean NOT NULL DEFAULT false, "value" numeric NOT NULL, "size" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_2d83bfa0b9fcd45dee1785af44d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "FK_6b55a80fd17a5bb77b753635496" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "FK_6b55a80fd17a5bb77b753635496"`);
        await queryRunner.query(`DROP TABLE "properties"`);
    }

}
