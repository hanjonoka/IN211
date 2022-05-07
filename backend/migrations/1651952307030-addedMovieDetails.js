const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class addedMovieDetails1651952307030 {
    name = 'addedMovieDetails1651952307030'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "movie" ADD "details" text`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "details"`);
    }
}
