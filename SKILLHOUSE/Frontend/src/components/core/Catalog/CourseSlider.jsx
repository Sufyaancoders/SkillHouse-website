import React, { useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode, Pagination, Navigation, A11y } from 'swiper'

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "swiper/css/a11y"

// Import your renamed CourseCard component
import Course_Card
 from './Course_Card'

const CourseSlider = ({ Courses, loading = false }) => {
  const [swiperInstance, setSwiperInstance] = useState(null)

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-[250px] bg-slate-700 rounded-xl mb-3"></div>
            <div className="h-6 bg-slate-700 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-slate-700 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    )
  }

  if (!Courses?.length) {
    return (
      <div className="bg-slate-800 rounded-xl p-8 text-center">
        <p className="text-xl text-slate-300">No courses found</p>
      </div>
    )
  }

  return (
    <div className="relative course-slider">
      {/* Add previous/next buttons for easier navigation */}
      <div 
        className="slider-prev absolute top-1/2 -left-4 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-slate-700 text-white cursor-pointer hover:bg-slate-600 transition-colors"
        onClick={() => swiperInstance?.slidePrev()}
        role="button"
        aria-label="Previous slide"
        tabIndex={0}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </div>

      <Swiper
        onSwiper={setSwiperInstance}
        slidesPerView={1}
        spaceBetween={25}
        loop={true}
        modules={[FreeMode, Pagination, Navigation, A11y]}
        pagination={{ 
          clickable: true,
          dynamicBullets: true
        }}
        navigation={{
          prevEl: '.slider-prev',
          nextEl: '.slider-next',
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        a11y={{
          prevSlideMessage: 'Previous slide',
          nextSlideMessage: 'Next slide',
        }}
        className="pb-12" // Add padding for pagination bullets
      >
        {Courses.map((course, i) => (
          <SwiperSlide key={course._id || i} className="h-auto pb-4">
            <Course_Card
             course={course} Height={"h-[250px]"} />
          </SwiperSlide>
        ))}
      </Swiper>
      
      <div 
        className="slider-next absolute top-1/2 -right-4 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-slate-700 text-white cursor-pointer hover:bg-slate-600 transition-colors"
        onClick={() => swiperInstance?.slideNext()}
        role="button"
        aria-label="Next slide"
        tabIndex={0}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </div>
    </div>
  )
}

export default CourseSlider
