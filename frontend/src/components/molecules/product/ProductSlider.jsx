import { Box, Paper } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import empty_image from '../../../assets/images/empty-product-image.png'

// import swiper required modules
import { Navigation, Pagination } from 'swiper'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { useState } from 'react'

const ProductSlider = ({ product }) => {
  const image_storage_url = `https://febesh5-dev.herokuapp.com/api/storages/${product?.Photos[0]?.storageId}/preview`
  const [loading, setLoading] = useState(true)

  const loadImage = () => {
    setLoading(false)
  }

  const BoxImg = ({ src, alt }) => {
    return (
      <>
        <Box
          component="img"
          src={src}
          alt={alt}
          sx={{
            display: loading ? 'none' : 'block',
            width: '100%',
            height: '100%',
            objectPosition: 'center',
            objectFit: 'cover',
          }}
          onLoad={loadImage}
        />
      </>
    )
  }

  return (
    <>
      <Paper
        sx={{
          display: 'flex',
          maxWidth: 600,
          maxHeight: 436,
          borderRadius: '1rem',
          overflow: 'hidden',
          boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.15)',
        }}
      >
        <Swiper
          navigation={true}
          pagination={{
            clickable: true,
          }}
          spaceBetween={10}
          modules={[Navigation, Pagination]}
          style={{ objectFit: 'cover', width: '100%' }}
        >
          {product?.Photos?.length !== 0 ? (
            product?.Photos?.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  {item.storageId ? (
                    <>
                      <BoxImg src={image_storage_url} alt={item.storageId} />
                    </>
                  ) : (
                    <img
                      src={item.preview}
                      onLoad={() => {
                        URL.revokeObjectURL(item.preview)
                      }}
                      alt={item.storageId}
                    />
                  )}
                </SwiperSlide>
              )
            })
          ) : (
            <SwiperSlide>
              <BoxImg src={empty_image} />
            </SwiperSlide>
          )}
        </Swiper>
      </Paper>
    </>
  )
}

export default ProductSlider
