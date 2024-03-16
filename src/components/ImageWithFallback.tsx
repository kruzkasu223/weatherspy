import { useEffect, useState } from 'react'

interface P
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  fallbackSrc: string
}

export const ImageWithFallback = ({ src, fallbackSrc, ...rest }: P) => {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc)

  useEffect(() => {
    setImgSrc(src || fallbackSrc)
  }, [fallbackSrc, src])

  return (
    <img
      src={imgSrc}
      onError={() => {
        setImgSrc(fallbackSrc)
      }}
      {...rest}
    />
  )
}

export default ImageWithFallback
