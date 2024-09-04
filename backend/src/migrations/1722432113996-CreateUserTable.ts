import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1722432113996 implements MigrationInterface {
    name = 'CreateUserTable1722432113996'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`city\` \`city\` varchar(255) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`phone_number\` \`phone_number\` varchar(10) NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`phone_number\` \`phone_number\` varchar(10) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`city\` \`city\` varchar(255) NOT NULL`);
    }

}
