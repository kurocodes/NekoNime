export default function AnimeCoverImage({ src, alt }) {
  return (
    <img
      src={src}
      alt={alt}
      className="max-xs:w-60 max-xs:mx-auto w-40 md:w-60 h-full rounded-md shadow-[0_0_15px_rgba(0,0,0,0.3)]"
    />
  );
}