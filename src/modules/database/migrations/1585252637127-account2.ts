import {MigrationInterface, QueryRunner} from "typeorm";

export class account21585252637127 implements MigrationInterface {
    name = 'account21585252637127'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_06dfb0c44511b97595db0402b59`", undefined);
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_2032d32e20664fcc1fdc5386ff0`", undefined);
        await queryRunner.query("DROP INDEX `REL_06dfb0c44511b97595db0402b5` ON `users`", undefined);
        await queryRunner.query("DROP INDEX `REL_2032d32e20664fcc1fdc5386ff` ON `users`", undefined);
        await queryRunner.query("CREATE TABLE `personal_records` (`id` int NOT NULL AUTO_INCREMENT, `createdOn` datetime NOT NULL, `modifiedOn` datetime NULL, `deadLift` varchar(255) NOT NULL, `benchPress` varchar(255) NOT NULL, `squat` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `user_data` (`id` int NOT NULL AUTO_INCREMENT, `createdOn` datetime NOT NULL, `modifiedOn` datetime NULL, `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, `year` int NOT NULL, `country` varchar(255) NOT NULL, `personalRecordsId` int NULL, UNIQUE INDEX `REL_6d39c41e8c3ce655f2f69622a0` (`personalRecordsId`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `users` DROP COLUMN `companyDataId`", undefined);
        await queryRunner.query("ALTER TABLE `users` DROP COLUMN `signatureId`", undefined);
        await queryRunner.query("ALTER TABLE `users` ADD `userDataId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `users` ADD UNIQUE INDEX `IDX_eda02199e8d2aa0d3482546c67` (`userDataId`)", undefined);
        await queryRunner.query("CREATE UNIQUE INDEX `REL_eda02199e8d2aa0d3482546c67` ON `users` (`userDataId`)", undefined);
        await queryRunner.query("ALTER TABLE `user_data` ADD CONSTRAINT `FK_6d39c41e8c3ce655f2f69622a06` FOREIGN KEY (`personalRecordsId`) REFERENCES `personal_records`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_eda02199e8d2aa0d3482546c673` FOREIGN KEY (`userDataId`) REFERENCES `user_data`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_eda02199e8d2aa0d3482546c673`", undefined);
        await queryRunner.query("ALTER TABLE `user_data` DROP FOREIGN KEY `FK_6d39c41e8c3ce655f2f69622a06`", undefined);
        await queryRunner.query("DROP INDEX `REL_eda02199e8d2aa0d3482546c67` ON `users`", undefined);
        await queryRunner.query("ALTER TABLE `users` DROP INDEX `IDX_eda02199e8d2aa0d3482546c67`", undefined);
        await queryRunner.query("ALTER TABLE `users` DROP COLUMN `userDataId`", undefined);
        await queryRunner.query("ALTER TABLE `users` ADD `signatureId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `users` ADD `companyDataId` int NULL", undefined);
        await queryRunner.query("DROP INDEX `REL_6d39c41e8c3ce655f2f69622a0` ON `user_data`", undefined);
        await queryRunner.query("DROP TABLE `user_data`", undefined);
        await queryRunner.query("DROP TABLE `personal_records`", undefined);
        await queryRunner.query("CREATE UNIQUE INDEX `REL_2032d32e20664fcc1fdc5386ff` ON `users` (`signatureId`)", undefined);
        await queryRunner.query("CREATE UNIQUE INDEX `REL_06dfb0c44511b97595db0402b5` ON `users` (`companyDataId`)", undefined);
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_2032d32e20664fcc1fdc5386ff0` FOREIGN KEY (`signatureId`, `signatureId`) REFERENCES `signatures`(`id`,`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_06dfb0c44511b97595db0402b59` FOREIGN KEY (`companyDataId`, `companyDataId`) REFERENCES `company_data`(`id`,`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

}
