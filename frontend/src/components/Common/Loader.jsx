import { BeatLoader } from 'react-spinners'

export default function Loader({ isBig = true, color="#32848B" }) {
  return (
    <div className={`flex justify-center ${isBig && "py-4"}`}>
      <BeatLoader color={color} />
    </div>
  )
}
