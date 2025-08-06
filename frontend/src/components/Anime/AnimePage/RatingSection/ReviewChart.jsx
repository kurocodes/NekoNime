const COLORS = {
  Trash: { bgColor: "bg-gray-800", textColor: "text-gray-800" },
  Mid: { bgColor: "bg-zinc-700", textColor: "text-zinc-800" },
  Decent: { bgColor: "bg-blue-300", textColor: "text-blue-900" },
  Good: { bgColor: "bg-green-300", textColor: "text-green-900" },
  Great: { bgColor: "bg-purple-300", textColor: "text-purple-900" },
  "Must Watch": { bgColor: "bg-yellow-300", textColor: "text-yellow-900" },
  Peak: { bgColor: "bg-indigo-300", textColor: "text-indigo-900" },
  Masterpiece: { bgColor: "bg-pink-300", textColor: "text-pink-900" },
  GOAT: { bgColor: "bg-red-300", textColor: "text-red-900" },
};

export default function ReviewChart({ data, totalReviews }) {
  return (
    <div className="w-full flex flex-col gap-1 mt-6">
      {data.map((stat, index) => (
        <div key={`stat-${index}`} className="flex gap-2">
          <div className="max-sm:w-[40%] w-[22%] flex justify-between">
            {/* Review tier name */}
            <span
              className={`text-lg font-bold ${COLORS[stat.tier].textColor}`}
            >
              {stat.tier}
            </span>
            <div className="flex items-center gap-1">
              {/* Review count of a tier */}
              <span className="text-sm text-secondary/60">{stat.count}</span>
            </div>
          </div>

          <div className="group relative flex-1 rounded-md bg-secondary/20">
            {/* Tier review percentage bar */}
            <div
              className={`h-full rounded-md ${COLORS[stat.tier].bgColor}`}
              style={{
                width: `${
                  stat.count === 0 ? 0 : (stat.count / totalReviews) * 100
                }%`,
              }}
            ></div>

            {/* tier reviews percentage */}
            <div className="absolute top-0 h-full w-full bg-secondary rounded-sm items-center pl-2 text-white hidden group-hover:flex transition-all duration-200">
              {stat.count === 0
                ? 0
                : parseInt((stat.count / totalReviews) * 100)}
              %
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
