
import { getAllProducts, getProductBySlug } from "@/lib/swell/products";
import Carousel from "@/components/carousel";
import Details from "../../details"


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
    <div className="my-5 px-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-5">
        <div className="col-span-1 md:col-span-2">
          <Carousel product={product} />
        </div>
        <div className="col-span-1">
          <Details product={product} />
        </div>
      </div>
    </div>
  );
}