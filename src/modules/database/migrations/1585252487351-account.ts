import {MigrationInterface, QueryRunner} from "typeorm";

export class account1585252487351 implements MigrationInterface {
    name = 'account1585252487351'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `address` (`id` int NOT NULL AUTO_INCREMENT, `createdOn` datetime NOT NULL, `modifiedOn` datetime NULL, `street` varchar(100) NOT NULL, `city` varchar(100) NOT NULL, `zip` varchar(10) NOT NULL, `country` varchar(50) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `company_data` (`id` int NOT NULL AUTO_INCREMENT, `createdOn` datetime NOT NULL, `modifiedOn` datetime NULL, `shortcode` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, `regon` varchar(255) NOT NULL, `nip` varchar(255) NOT NULL, `addressId` int NULL, UNIQUE INDEX `REL_f82bc9764bfda717b2c54d71b3` (`addressId`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `signatures` (`id` int NOT NULL AUTO_INCREMENT, `createdOn` datetime NOT NULL, `modifiedOn` datetime NULL, `pin` int NOT NULL, `template` varchar(10000) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `createdOn` datetime NOT NULL, `modifiedOn` datetime NULL, `email` varchar(200) NOT NULL, `password` varchar(200) NOT NULL, `status` int NOT NULL, `role` varchar(255) NOT NULL, `companyDataId` int NULL, `signatureId` int NULL, UNIQUE INDEX `REL_06dfb0c44511b97595db0402b5` (`companyDataId`), UNIQUE INDEX `REL_2032d32e20664fcc1fdc5386ff` (`signatureId`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `company_data` ADD CONSTRAINT `FK_f82bc9764bfda717b2c54d71b3d` FOREIGN KEY (`addressId`) REFERENCES `address`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_06dfb0c44511b97595db0402b59` FOREIGN KEY (`companyDataId`) REFERENCES `company_data`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_2032d32e20664fcc1fdc5386ff0` FOREIGN KEY (`signatureId`) REFERENCES `signatures`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_2032d32e20664fcc1fdc5386ff0`", undefined);
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_06dfb0c44511b97595db0402b59`", undefined);
        await queryRunner.query("ALTER TABLE `company_data` DROP FOREIGN KEY `FK_f82bc9764bfda717b2c54d71b3d`", undefined);
        await queryRunner.query("DROP INDEX `REL_2032d32e20664fcc1fdc5386ff` ON `users`", undefined);
        await queryRunner.query("DROP INDEX `REL_06dfb0c44511b97595db0402b5` ON `users`", undefined);
        await queryRunner.query("DROP TABLE `users`", undefined);
        await queryRunner.query("DROP TABLE `signatures`", undefined);
        await queryRunner.query("DROP INDEX `REL_f82bc9764bfda717b2c54d71b3` ON `company_data`", undefined);
        await queryRunner.query("DROP TABLE `company_data`", undefined);
        await queryRunner.query("DROP TABLE `address`", undefined);
    }

}
