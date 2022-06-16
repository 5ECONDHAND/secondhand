import { Box } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import dummy from '../../../assets/images/dummy-image.jpg'

// import swiper required modules
import { Navigation, Pagination } from 'swiper'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const BoxImg = ({ image, alt }) => {
  return (
    <>
      <Box
        component="img"
        src={image}
        alt={alt}
        sx={{
          borderRadius: '1rem',
          width: '100%',
          height: 'auto',
        }}
      />
    </>
  )
}

const ProductSlider = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          maxWidth: 600,
          maxHeight: 436,
          objectFit: 'cover',
        }}
      >
        <Swiper
          // centeredSlides={true}
          navigation={true}
          pagination={true}
          spaceBetween={10}
          modules={[Navigation, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <BoxImg image={dummy} />
          </SwiperSlide>
          <SwiperSlide>
            <BoxImg image={dummy} />
          </SwiperSlide>
          <SwiperSlide>
            <BoxImg image={dummy} />
          </SwiperSlide>
        </Swiper>
      </Box>
    </>
  )
}

export default ProductSlider
