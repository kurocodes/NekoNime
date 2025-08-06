export default function StaffMemberCard({ member }) {
  return (
    <div className="h-20 flex gap-2 bg-primary-hover-bg rounded-md">
      {/* Staff Member Image */}
      <img
        src={member.staff.image.large}
        alt={member.role}
        className="h-full rounded-l-md shadow"
      />
      <div className="flex flex-col mt-2">
        {/* Staff Member Name */}
        <span className="text-white text-sm font-light">
          {member.staff.name.full}
        </span>
        {/* Staff Member Role */}
        <span className="text-primary-hover-text text-xs font-extralight">
          {member.role}
        </span>
      </div>
    </div>
  );
}
