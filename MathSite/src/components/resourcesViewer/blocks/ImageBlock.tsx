type ImageBlockProps = {
  src: string
  alt: string
  caption?: string
}

function ImageBlock({ src, alt, caption }: ImageBlockProps) {
  return (
    <figure className="rv-image">
      <img src={src} alt={alt} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

export default ImageBlock
