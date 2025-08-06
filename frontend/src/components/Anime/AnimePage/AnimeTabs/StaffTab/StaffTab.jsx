import { useCallback, useEffect, useRef, useState } from "react";
import { fetchAnimeStaff } from "../../../../../services/animeService";

import Loader from "../../../../Common/Loader";
import StaffMemberCard from "./StaffMemberCard";
import SharedTabContainer from "../Common/SharedTabContainer";

export default function StaffTab({
  animeId,
  staff,
  setStaff,
  loading,
  setLoading,
}) {
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  const loadStaffData = async (page) => {
    try {
      setLoading(true);
      const res = await fetchAnimeStaff(animeId, page);
      const newStaff = res.data.staff;
      const pageInfo = res.data.pageInfo;

      setStaff((prev) => {
        const all = [...(prev || []), ...newStaff];
        const seen = new Set();
        return all.filter((member) => {
          const key = member.staff.id;
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });
      });
      setHasNextPage(pageInfo.hasNextPage);
    } catch (error) {
      console.error("Error fetching staff:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load staff data when animeId changes or when the component mounts
  useEffect(() => {
    if (!animeId || staff.length > 0) return;
    setStaff([]);
    setPage(1);
    setHasNextPage(true);
    loadStaffData(1);
  }, [animeId]);

  // Load more staff data when the page changes
  useEffect(() => {
    if (page > 1) {
      loadStaffData(page);
    }
  }, [page]);

  //infinite scroll logic
  const observer = useRef(null);
  const lastStaffRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasNextPage]
  );

  return (
    <SharedTabContainer heading="Staff">
      {staff.length === 0 && !loading && (
        <p className="text-center text-secondary">No staff members found.</p>
      )}

      <div className="grid max-sm:grid-cols-1 max-lg:grid-cols-2 xl:grid-cols-2 gap-2 overflow-hidden">
        {staff.map((member, idx) => {
          if (idx === staff.length - 1) {
            return (
              <div key={member.staff.id} ref={lastStaffRef}>
                <StaffMemberCard member={member} idx={idx} />
              </div>
            );
          }
          return <StaffMemberCard key={member.staff.id} member={member} />
        })}
      </div>
      { loading && <Loader />}
    </SharedTabContainer>
  );
}
