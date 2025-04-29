-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_id_costumer_fkey";

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "ds_observations" TEXT,
ADD COLUMN     "vl_table_number" INTEGER,
ALTER COLUMN "id_costumer" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_id_costumer_fkey" FOREIGN KEY ("id_costumer") REFERENCES "costumers"("id_costumer") ON DELETE SET NULL ON UPDATE CASCADE;
