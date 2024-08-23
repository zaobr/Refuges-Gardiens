import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1724333581684 implements MigrationInterface {
    name = 'CreateUserTable1724333581684'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`resetPasswordToken\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`resetPasswordExpires\` timestamp NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`resetPasswordExpires\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`resetPasswordToken\``);
    }

}
