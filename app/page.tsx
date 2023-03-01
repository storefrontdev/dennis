
import { getProductBySlug } from "@/lib/swell/products";
import Carousel from "@/components/carousel";
import Details from "@/app/details";




// get a single product by slug
async function getProduct(slug: any) {
  const product = await getProductBySlug(slug)
  return product;
}

export default async function ProductPage() {

  const product = await getProduct("maui-cooler");


  return (
    <main>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 min-h-screen h-full">
        <div className="col-span-1 md:col-span-2">
          <Carousel product={product} />
        </div>
        <div className="col-span-1 bg-bright-blue-50">
          <Details product={product} />
        </div>
      </div>
    </main>
  );
}