const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class UpdateMovieDate1649087955582 {
    name = 'UpdateMovieDate1649087955582'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "release_date"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "release_date" date NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "release_date"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "release_date" TIMESTAMP NOT NULL`);
    }
}
