"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePasswordUser1749535725220 = void 0;
class UpdatePasswordUser1749535725220 {
    name = 'UpdatePasswordUser1749535725220';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" SET NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" DROP NOT NULL`);
    }
}
exports.UpdatePasswordUser1749535725220 = UpdatePasswordUser1749535725220;
//# sourceMappingURL=1749535725220-updatePassword_user.js.map