import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1725371816897 implements MigrationInterface {
    name = 'CreateUserTable1725371816897'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`mission\` ADD \`volunteerNumber\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`mission\` DROP COLUMN \`volunteerNumber\``);
    }

}
