import { genreColorsMap, genreTextColorsMap } from "../../utils/formatColors";

export default function GenreTag({
  genre,
  color,
  textColor,
  padding,
  textSize,
}) {
  return (
    <span
      key={genre}
      className={`px-${padding[0]} py-${padding[1]} rounded-full ${textSize}`}
      style={{
        backgroundColor: genreColorsMap[genre] || "#999",
        color: genreTextColorsMap[genre] || "#fff",
      }}
    >
      {genre}
    </span>
  );
}
