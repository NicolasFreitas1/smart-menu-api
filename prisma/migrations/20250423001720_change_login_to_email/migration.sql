/*
  Warnings:

  - You are about to drop the column `nm_login` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ds_email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ds_email` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "users_nm_login_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "nm_login",
ADD COLUMN     "ds_email" VARCHAR(150) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_ds_email_key" ON "users"("ds_email");
