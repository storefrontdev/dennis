// import swell from "swell-js";
import { swellnode } from "./init/node";


// Allows us to get the total number of pages from Swell.
function ObjectLength( object ) {
  var length = 0;
  for( var key in object ) {
      if( object.hasOwnProperty(key) ) {
          ++length;
      }
  }
  return length;
};
  

export const getAllProducts = async () => {

    // recursive function to get all products from Swell.
    const products = async (i = 1) => {
    
      const swellProducts = await swellnode.get('/products', {
        where: { active: true },
        limit: 1000,
        expand: ['variants:25'],
        page: i,
      });
    
      let results = swellProducts.results
      let pages = ObjectLength(swellProducts.pages)

      if (pages > 1) {
        for (let i = 1; i <= pages; i++) {
          products(i).then((moreProducts) => {
            results = results.concat(moreProducts.results);
          });
        }
      }
      return results
    }
 
    return new Promise((resolve, reject) => {
      products().then((products) => {
        resolve(products);
      });
    })

 
}


export const getProductById = async (id) => {

  const product = await swellnode.get("/products", {
    where: {
      id: id,
    },
    expand: ['variants:25'],
  });

  return product.results[0] || {};
}

export const getProductBySlug= async (slug) => {


  const product = await swellnode.get("/products", {
    where: {
      slug: slug,
      active: true,
    },
    expand: ['variants:25'],
  });



  return product.results[0] || {};
}


export const getVariantById = async (id) => {
  console.log("getVariantById", id)
  const variant = await swellnode.get("/products:variants/{id}", {
    id: id
  });

  return variant
}

