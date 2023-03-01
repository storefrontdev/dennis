'use client'
import React, { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { wrap } from "@popmotion/popcorn"
import Image from "next/image"
import { useImages, useMedia } from '@/lib/swell/hooks'


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

const thumbnails = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.3,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      when: "afterChildren",
    },
  },
}

const thumbnail = {
  visible: i => ({
    opacity: 1,
    x: 50,
    transition: {
      delay: (i * 0.2) + 1,
      type: "spring",
      stiffness: 50,
      ease: [0.56, 0.03, 0.12, 1.04],
    },
  }),
  hidden: { opacity: 0, x: 0 },
}

const Carousel = ({product}) => {
  const [[imageCount, direction], setImageCount] = useState([0, 0])
  const [imageLength, setImageLength] = useState(0)
  const [isLoading, setLoading] = useState(true);
  const { media } = useMedia(product);
  const video = useRef(null)

  useEffect(() => {
    setImageLength(media?.length)
    setImageCount([media?.length, 0])
  }, [media])


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

  // create a component to pass in the current media object to the component and return an <Image /> component or html5 video element
  const Media = ({media, activeImageIndex}) => {
    if (media?.content_type === "video/mp4") {
      return (
        <video ref={video} className="w-full h-full object-cover object-center" autoPlay loop muted>
          <source src={media?.url} type="video/mp4" />
        </video>
      )
    } else {
      return (
        <Image
          src={media?.url}
          alt={"image " + activeImageIndex}
          fill
          draggable={false}
          quality={100}
          priority={activeImageIndex == 0 ? true : false }
          className={classNames(
            "duration-700 ease-in-out group-hover:opacity-75 transition-all object-cover object-center border border-gray-100 shadow-sm",
            isLoading ? "bg-gray-300 blur-3xl opacity-90" : "opacity-100"
            )}
          onLoadingComplete={() => setLoading(false)}
        />
      )
    }
  }

  const MediaThumbnails = ({media, thumbnailIndex, activeImageIndex}) => {
    return (
        <Image 
          src={media.content_type != "video/mp4" ? media.url : "/surfing.gif"}
          alt={media.id}
          fill
          quality={85}
          priority={true}
          className={
            classNames('duration-700 ease-in-out group-hover:opacity-75 transition-all object-cover object-center rounded-full z-50',
            thumbnailIndex === activeImageIndex ? 'border border-black' : ''
          )}
        />
    )
  }






  return (
    <section>
      <div className="w-full flex flex-col align-center">
        <div className="relative h-screen w-full overflow-hidden">
          
            <div className="hidden absolute inset-y-0 x-l-0 z-10">
              <button aria-label="previous" type="button" className="bg-black text-white w-10 h-10 rounded-full p-3 shadow-lg" onClick={() => swipeToImage(-1)}></button>
            </div>
            <div className="hidden absolute inset-y-0 x-l-24 z-10">
              <button aria-label="next" type="button" className="bg-black text-white w-10 h-10 rounded-full p-3 shadow-lg" onClick={() => swipeToImage(1)}></button>
            </div>
        
          {imageLength > 0 && (
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={imageCount}
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
                className={classNames(`absolute h-full w-full cursor-grab active:cursor-grabbing overflow-hidden`,
                )}
               
                >
                <Media media={media[activeImageIndex]} activeImageIndex={activeImageIndex} />
              </motion.div>
            </AnimatePresence>
          )}

          <motion.div 
            variants={thumbnails}
            initial="hidden"
            animate="visible"
            className="absolute bottom-10 flex flex-col justify-center md:justify-start space-y-3 z-50"
          >
          {media?.map((image, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={thumbnail}
              onClick={() => skipToImage(i)}
              className="relative rounded-full h-10 w-10 md:h-16 md:w-16 mr-2 cursor-pointer mr-3 md:mr-5 last-of-type:mr-0 shadow-sm overflow-hidden"
            >
              <MediaThumbnails media={image} thumbnailIndex={i} activeImageIndex={activeImageIndex} />
            </motion.div>
          ))}
        </motion.div> 
      </div>


      </div>
    </section>

  )
}

export default Carousel