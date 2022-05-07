const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class addedMovieDetails1651952450264 {
    name = 'addedMovieDetails1651952450264'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "movie" RENAME COLUMN "details" TO "overview"`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "movie" RENAME COLUMN "overview" TO "details"`);
    }
}
