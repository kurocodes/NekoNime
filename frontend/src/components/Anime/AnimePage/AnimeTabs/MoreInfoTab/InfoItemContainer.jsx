export default function InfoItemContainer({ heading, children, extraStyle }) {
  return (
    <>
      <div className="text-secondary text-md border-b-2 border-secondary pt-2">
        {heading}
      </div>
      <div className={`w-full flex gap-2 mt-1 ${extraStyle}`}>
        {children}
      </div>
    </>
  );
}
