const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class floatMark1652048105579 {
    name = 'floatMark1652048105579'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "mean_mark"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "mean_mark" double precision NOT NULL DEFAULT '-1'`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "mean_mark"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "mean_mark" integer NOT NULL DEFAULT '-1'`);
    }
}
