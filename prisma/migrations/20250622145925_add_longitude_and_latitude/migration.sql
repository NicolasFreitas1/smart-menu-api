-- AlterTable
ALTER TABLE "addresses" ADD COLUMN     "vl_latitude" DOUBLE PRECISION,
ADD COLUMN     "vl_longitude" DOUBLE PRECISION;

-- CreateIndex
CREATE INDEX "idx_address_coordinates" ON "addresses"("vl_latitude", "vl_longitude");
