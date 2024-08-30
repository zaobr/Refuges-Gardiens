import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1725002650308 implements MigrationInterface {
    name = 'CreateUserTable1725002650308'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`mission\` CHANGE \`picture\` \`picture\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`mission\` CHANGE \`picture\` \`picture\` varchar(255) NOT NULL`);
    }

}
