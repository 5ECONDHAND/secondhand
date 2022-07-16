import { Box } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import empty_image from '../../../assets/images/empty-product-image.png'

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
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    </>
  )
}

const ProductSlider = ({ productPhoto }) => {
  // console.log(productPhoto)
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          maxWidth: 600,
          maxHeight: 436,
          objectFit: 'cover',
          borderRadius: '1rem',
          overflow: 'hidden',
        }}
      >
        <Swiper
          navigation={true}
          pagination={{
            clickable: true,
          }}
          spaceBetween={10}
          modules={[Navigation, Pagination]}
        >
          {productPhoto?.length !== 0 ? (
            productPhoto?.map((item, index) => (
              <SwiperSlide key={index}>
                {item.storageId ? (
                  <BoxImg
                    image={`https://febesh5-dev.herokuapp.com/api/storages/${item.storageId}/preview`}
                  />
                ) : (
                  <img
                    src={item.preview}
                    onLoad={() => {
                      URL.revokeObjectURL(item.preview)
                    }}
                    alt=""
                  />
                )}
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <BoxImg image={empty_image} />
            </SwiperSlide>
          )}
          {/* {productPhoto?.length !== 0 ? (
            productPhoto?.map((item, index) => (
              <SwiperSlide key={index}>
                <BoxImg
                  image={`https://febesh5-dev.herokuapp.com/api/storages/${item.storageId}/preview`}
                />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <BoxImg image={dummy} />
            </SwiperSlide>
          )} */}

          {/* <SwiperSlide>
            <BoxImg image={dummy} />
          </SwiperSlide>
          <SwiperSlide>
            <BoxImg image={dummy} />
          </SwiperSlide> */}
        </Swiper>
      </Box>
    </>
  )
}

export default ProductSlider
