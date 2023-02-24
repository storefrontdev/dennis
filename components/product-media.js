'use client'

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import Image from 'next/image';
import { useState } from 'react';
import { useImages } from '@/lib/swell/hooks'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const ProductMedia = ({ product }) => {
  const { images } = useImages(product);
  const [isLoading, setLoading] = useState(true);

  return (
    <Splide aria-label="Product Images">
        {images?.map((image, i) => (
          <SplideSlide 
            key={i} 
            className="h-[300px] md:h-[400px] w-full bg-gray-100 z-40"
            >
             <Image
                src={image.file?.url}
                blurDataURL={image.file?.url}
                placeholder="blur"
                alt={`product image for ${i}`}
                fill
                quality={100}
                priority={true}
                className={classNames('duration-700 ease-in-out group-hover:opacity-75 transition-all object-cover object-center',
                isLoading 
                ? 'scale-110 blur-2xl grayscale' 
                : 'scale-100 blur-none grayscale-0'
                )} 
                onLoadingComplete={() => setLoading(false)}
              />
          </SplideSlide>
      ))}
    </Splide>
  )
}

export default ProductMedia;