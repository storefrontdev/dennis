'use client'
import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { wrap } from "@popmotion/popcorn"
import Image from "next/image"
import { useImages } from '@/lib/swell/hooks'


const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ")
}

const sliderVariants = {
  incoming: direction => ({
    x: direction > 0 ? "100%" : "-100%",
    scale: 1,
    opacity: 0
  }),
  active: { x: 0, scale: 1, opacity: 1 },
  exit: direction => ({
    x: direction > 0 ? "-100%" : "100%",
    scale: 1,
    opacity: 0.5
  })
}

const sliderTransition = {
  duration: 1,
  ease: [0.56, 0.03, 0.12, 1.04]
}

const Carousel = ({product}) => {
  const [[imageCount, direction], setImageCount] = useState([0, 0])
  const [imageLength, setImageLength] = useState(0)
  const [isLoading, setLoading] = useState(true);
  const { images } = useImages(product);

  console.log("images", images)

  useEffect(() => {
    setImageLength(images?.length)
    setImageCount([images?.length, 0])
  }, [images])

  const activeImageIndex = wrap(0, imageLength, imageCount)

  const swipeToImage = swipeDirection => {
    setImageCount([imageCount + swipeDirection, swipeDirection])
  }

  const dragEndHandler = dragInfo => {
    const draggedDistance = dragInfo.offset.x
    const swipeThreshold = 50
    if (draggedDistance > swipeThreshold) {
      swipeToImage(-1)
    } else if (draggedDistance < -swipeThreshold) {
      swipeToImage(1)
    }
  }

  const skipToImage = imageId => {
    let changeDirection
    if (imageId > activeImageIndex) {
      changeDirection = 1
    } else if (imageId < activeImageIndex) {
      changeDirection = -1
    }
    setImageCount([imageId, changeDirection])
  }


  return (
    <section>
      <div className="w-full flex flex-col align-center mx-0">
        <div className="relative h-[300px] md:h-[500px] w-full overflow-hidden mb-5">
          
            <div className="absolute inset-y-0 x-l-0 z-10">
              <button aria-label="previous" type="button" className="bg-black text-white w-10 h-10 rounded-full p-3 shadow-lg" onClick={() => swipeToImage(-1)}></button>
            </div>
            <div className="absolute inset-y-0 x-l-24 z-10">
              <button aria-label="next" type="button" className="bg-black text-white w-10 h-10 rounded-full p-3 shadow-lg" onClick={() => swipeToImage(1)}></button>
            </div>
        
          {imageLength > 0 && (
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={imageCount}
                style={{
                  backgroundImage: `url(${images[activeImageIndex].file?.url})`,
                }}
                custom={direction}
                variants={sliderVariants}
                initial="incoming"
                animate="active"
                exit="exit"
                transition={sliderTransition}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(_, dragInfo) => dragEndHandler(dragInfo)}
                className="absolute h-full w-full cursor-grab active:cursor-grabbing"
              >
                <Image
                  src={images[activeImageIndex].file?.url}
                  alt={"image " + activeImageIndex}
                  fill
                  draggable={false}
                  quality={100}
                  priority={true}
                  className={classNames(
                    "duration-700 ease-in-out group-hover:opacity-75 transition-all object-contain object-center border border-gray-100 shadow-sm",
                    isLoading
                      ? "bg-white opacity-0"
                      : "bg-white opacity-100"
                  )}
                  onLoadingComplete={() => setLoading(false)}
                />
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        <div className="flex justify-center md:justify-start">
        {images?.map((image, i) => (
          <div
            key={i}
            onClick={() => skipToImage(i)}
            className="relative h-14 w-14 md:h-24 md:w-24 mr-2 cursor-pointer mr-3 md:mr-5 last-of-type:mr-0 shadow-sm"
          >
            <Image 
              src={image.file?.url}
              alt={image.file?.id}
              fill
              quality={100}
              priority={true}
              className={classNames('duration-700 ease-in-out group-hover:opacity-75 transition-all object-cover object-center rounded-sm',
                i === activeImageIndex ? 'opacity-50' : 'opacity-100')}
            />
            {/* <div
              className={`active-indicator ${
                i === activeImageIndex ? "active" : null
              }`}
            /> */}
          </div>
        ))}
      </div> 

      </div>
    </section>

  )
}

export default Carousel