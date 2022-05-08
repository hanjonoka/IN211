const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class defaultMark1652045332081 {
    name = 'defaultMark1652045332081'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "mean_mark" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "mean_mark" SET DEFAULT '-1'`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "mean_mark" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "mean_mark" DROP NOT NULL`);
    }
}
