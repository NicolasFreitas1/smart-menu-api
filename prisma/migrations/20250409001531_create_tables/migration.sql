-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'DELIVERED', 'CANCELED');

-- CreateTable
CREATE TABLE "users" (
    "id_user" UUID NOT NULL,
    "nm_user" VARCHAR(250) NOT NULL,
    "nm_login" VARCHAR(150) NOT NULL,
    "vl_password" VARCHAR(250) NOT NULL,
    "bl_is_admin" BOOLEAN NOT NULL DEFAULT false,
    "id_restaurant" UUID NOT NULL,
    "dt_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id_address" UUID NOT NULL,
    "vl_cep" VARCHAR(15) NOT NULL,
    "ds_street" VARCHAR(250) NOT NULL,
    "vl_number" VARCHAR(10) NOT NULL,
    "nm_city" VARCHAR(100) NOT NULL,
    "nm_state" VARCHAR(100) NOT NULL,
    "nm_country" VARCHAR(100) NOT NULL,
    "dt_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id_address")
);

-- CreateTable
CREATE TABLE "restaurants" (
    "id_restaurant" UUID NOT NULL,
    "nm_restaurant" VARCHAR(250) NOT NULL,
    "id_address" UUID NOT NULL,
    "dt_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "restaurants_pkey" PRIMARY KEY ("id_restaurant")
);

-- CreateTable
CREATE TABLE "costumers" (
    "id_costumer" UUID NOT NULL,
    "nm_costumer" VARCHAR(250) NOT NULL,
    "vl_email" VARCHAR(150) NOT NULL,
    "dt_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "costumers_pkey" PRIMARY KEY ("id_costumer")
);

-- CreateTable
CREATE TABLE "orders" (
    "id_order" UUID NOT NULL,
    "id_costumer" UUID NOT NULL,
    "id_restaurant" UUID NOT NULL,
    "vl_status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "dt_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id_order")
);

-- CreateTable
CREATE TABLE "dishes" (
    "id_dish" UUID NOT NULL,
    "nm_dish" VARCHAR(250) NOT NULL,
    "ds_dish" VARCHAR(500) NOT NULL,
    "vl_price" DOUBLE PRECISION NOT NULL,
    "id_restaurant" UUID NOT NULL,
    "dt_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dishes_pkey" PRIMARY KEY ("id_dish")
);

-- CreateTable
CREATE TABLE "dish_images" (
    "id_dish_image" UUID NOT NULL,
    "vl_image_path" TEXT NOT NULL,
    "id_dish" UUID NOT NULL,
    "dt_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dish_images_pkey" PRIMARY KEY ("id_dish_image")
);

-- CreateTable
CREATE TABLE "categories" (
    "id_category" UUID NOT NULL,
    "nm_category" VARCHAR(250) NOT NULL,
    "dt_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id_category")
);

-- CreateTable
CREATE TABLE "dish_categories" (
    "id_dish_category" UUID NOT NULL,
    "id_dish" UUID NOT NULL,
    "id_category" UUID NOT NULL,
    "dt_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dish_categories_pkey" PRIMARY KEY ("id_dish_category")
);

-- CreateTable
CREATE TABLE "order_items" (
    "id_order_item" UUID NOT NULL,
    "id_order" UUID NOT NULL,
    "id_dish" UUID NOT NULL,
    "vl_quantity" INTEGER NOT NULL,
    "dt_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id_order_item")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_nm_login_key" ON "users"("nm_login");

-- CreateIndex
CREATE UNIQUE INDEX "costumers_vl_email_key" ON "costumers"("vl_email");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_id_restaurant_fkey" FOREIGN KEY ("id_restaurant") REFERENCES "restaurants"("id_restaurant") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "restaurants" ADD CONSTRAINT "restaurants_id_address_fkey" FOREIGN KEY ("id_address") REFERENCES "addresses"("id_address") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_id_costumer_fkey" FOREIGN KEY ("id_costumer") REFERENCES "costumers"("id_costumer") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_id_restaurant_fkey" FOREIGN KEY ("id_restaurant") REFERENCES "restaurants"("id_restaurant") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dishes" ADD CONSTRAINT "dishes_id_restaurant_fkey" FOREIGN KEY ("id_restaurant") REFERENCES "restaurants"("id_restaurant") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dish_images" ADD CONSTRAINT "dish_images_id_dish_fkey" FOREIGN KEY ("id_dish") REFERENCES "dishes"("id_dish") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dish_categories" ADD CONSTRAINT "dish_categories_id_dish_fkey" FOREIGN KEY ("id_dish") REFERENCES "dishes"("id_dish") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dish_categories" ADD CONSTRAINT "dish_categories_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "categories"("id_category") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_id_order_fkey" FOREIGN KEY ("id_order") REFERENCES "orders"("id_order") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_id_dish_fkey" FOREIGN KEY ("id_dish") REFERENCES "dishes"("id_dish") ON DELETE RESTRICT ON UPDATE CASCADE;
