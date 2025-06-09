-- DropForeignKey
ALTER TABLE "dish_categories" DROP CONSTRAINT "dish_categories_id_category_fkey";

-- DropForeignKey
ALTER TABLE "dish_categories" DROP CONSTRAINT "dish_categories_id_dish_fkey";

-- AddForeignKey
ALTER TABLE "dish_categories" ADD CONSTRAINT "dish_categories_id_dish_fkey" FOREIGN KEY ("id_dish") REFERENCES "dishes"("id_dish") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dish_categories" ADD CONSTRAINT "dish_categories_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "categories"("id_category") ON DELETE CASCADE ON UPDATE CASCADE;
