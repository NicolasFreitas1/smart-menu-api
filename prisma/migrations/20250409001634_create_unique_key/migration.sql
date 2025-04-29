/*
  Warnings:

  - A unique constraint covering the columns `[id_dish,id_category]` on the table `dish_categories` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "dish_categories_id_dish_id_category_key" ON "dish_categories"("id_dish", "id_category");
