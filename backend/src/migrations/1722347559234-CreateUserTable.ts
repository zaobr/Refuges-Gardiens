import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1722347559234 implements MigrationInterface {
    name = 'CreateUserTable1722347559234'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`description\` \`description\` text NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`description\` \`description\` text NOT NULL`);
    }

}
