import { useAnimeDetailsContext } from "../../../../../context/AnimeDetailsContext";

export default function CharacterCard({ character }) {
  const { selectedLanguage } = useAnimeDetailsContext();

  const voiceActors =
    selectedLanguage === "Japanese"
      ? character.voiceActors?.japanese
      : character.voiceActors?.english;

  return (
    <div className="flex justify-between items-center bg-primary-hover-bg rounded-md mt-1">
      {/* Character Info */}
      <div className={`flex items-center gap-2`}>
        <img
          src={character.character.image.large}
          alt={character.character.name.full}
          className={`rounded-l-md`}
          style={{ height: `${80 * voiceActors?.length}px` }}
        />
        <div className="py-2 px-1">
          <h3 className="text-white text-xs">{character.character.name.full}</h3>
          <span className="text-[10px] text-primary-hover-text">{character.role}</span>
        </div>
      </div>

      {/* Voice Actors */}
      <div className="flex flex-col items-end">
        {voiceActors?.length > 0 ? (
          voiceActors.map((va, index) => (
            <div key={va.id} className="flex items-center justify-center gap-2">
              <div className="text-right px-1">
                <h3 className="text-white text-xs">{va.name.full}</h3>
                <span className="text-[10px] text-primary-hover-text">{va.language}</span>
              </div>
              <img
                src={va.image.large}
                alt={va.name.full}
                className={`h-20 ${index === 0 && "rounded-tr-md"} ${index === voiceActors.length - 1 && "rounded-br-md"}`}
              />
            </div>
          ))
        ) : (
          <div className="text-xs text-gray-400 italic pr-4">No {selectedLanguage} voice actors</div>
        )}
      </div>
    </div>
  );
}
