import {MigrationInterface, QueryRunner} from "typeorm";

export class hash1585481918823 implements MigrationInterface {
    name = 'hash1585481918823'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_eda02199e8d2aa0d3482546c67` ON `users`", undefined);
        await queryRunner.query("ALTER TABLE `users` ADD `resetPasswordHash` varchar(255) NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `users` DROP COLUMN `resetPasswordHash`", undefined);
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_eda02199e8d2aa0d3482546c67` ON `users` (`userDataId`)", undefined);
    }

}
