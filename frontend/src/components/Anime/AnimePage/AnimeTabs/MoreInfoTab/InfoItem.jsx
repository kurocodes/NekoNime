import {
  statusStylesMap,
  sourceStylesMap,
  dateStylesMap,
} from "../../../../../utils/formatColors";

export default function InfoItem({ label, value }) {
  let statusData;

  // Determine style based on label
  if (label === "Status") {
    statusData = statusStylesMap[value] || statusStylesMap.UNKNOWN;
  } else if (label === "Source") {
    statusData = sourceStylesMap[value] || sourceStylesMap.UNKNOWN;
  } else if (label === "Start Date") {
    statusData = dateStylesMap.startDate;
  } else if (label === "End Date") {
    statusData = dateStylesMap.endDate;
  } else if (label === "Next Airing Episode") {
    statusData = dateStylesMap.nextAiringEpisode;
  } else {
    // Fallback style if no specific match
    statusData = {
      gradient: "",
      textColor: "text-primary-hover-text",
      icon: null,
      label,
    };
  }

  const StatusIcon = statusData.icon;

  return (
    <div
      className="flex-1 flex justify-between items-center text-sm bg-primary rounded-sm"
      title={value}
    >
      <div className="text-white p-2">{label}</div>
      <div
        className={`flex items-center gap-2 p-2 pl-4 h-full rounded-e-sm bg-gradient-to-l ${statusData.gradient} ${statusData.textColor}`}
      >
        {StatusIcon && <StatusIcon className="text-sm -mt-[1px]" />}
        {value}
      </div>
    </div>
  );
}
