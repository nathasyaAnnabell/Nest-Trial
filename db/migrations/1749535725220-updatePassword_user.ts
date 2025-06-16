import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatePasswordUser1749535725220 implements MigrationInterface {
  name = 'UpdatePasswordUser1749535725220';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "password" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "password" DROP NOT NULL`,
    );
  }
}
