
import { getAllProducts, getProductBySlug } from "@/lib/swell/products";

import Link from "next/link";
import Image from "next/image";


// get all products from Swell and generate a static page for each one
export async function generateStaticParams() {

  const products = await getAllProducts();

  return products.map((product) => ({
    product: product.slug
  }));
}

// get a single product by slug
async function getProduct(slug) {
  const product = await getProductBySlug(slug)
  return product;
}

export default async function ProductPage({ params }) {

  const product = await getProduct(params.product);

  return (
    <>

      <div className="my-5 px-5">
        <h1 className="text-4xl font-bold mb-5">{product.name}</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-5">
          
        </div>
      </div>
    </>
  );
}