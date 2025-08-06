import { useEffect, useState } from "react";
import { fetchUserProfileData } from "../../services/userService";
import { FaCheckCircle, FaTimesCircle, FaEdit } from "react-icons/fa";

import Loader from "../Common/Loader";

export default function Profile() {
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const loadUserProfileData = async () => {
      setIsLoading(true);
      try {
        let res = await fetchUserProfileData();
        setUserData(res.data);
      } catch (err) {
        console.error("Error fetching user profile data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserProfileData();
  }, []);

  if (!userData || isLoading) return <Loader />;

  return (
    <div className="flex flex-col items-center gap-4 py-10 px-4 sm:px-10 max-w-2xl mx-auto">
      {/* Profile Picture */}
      <div className="relative group">
        <img
          src={userData?.profilePicture}
          alt={userData?.username}
          className="w-32 rounded-full object-cover border-4 border-secondary shadow-lg"
        />
        <div className="absolute bottom-1 right-1 p-2 bg-secondary text-white border-3 border-white w-fit rounded-full cursor-pointer hover:bg-primary hover:scale-110 transition">
          <FaEdit className="text-xl" />
        </div>
      </div>

      {/* User Info */}
      <div className="space-y-2">
        <div className="flex flex-col items-center">
          <h3 className="text-2xl text-primary font-semibold">
            {userData?.username}
          </h3>
          <p className="text-gray-400">{userData?.email}</p>
        </div>
        <div className="flex items-center justify-center gap-2 text-sm">
          {userData.isVerified ? (
            <>
              <FaCheckCircle className="text-green-500" />
              <span className="text-green-300">Verified</span>
            </>
          ) : (
            <>
              <FaTimesCircle className="text-red-500" />
              <span className="text-red-300">Not Verified</span>
            </>
          )}
        </div>
      </div>

      {/* Bio Section */}
      <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-4 w-full shadow-inner">
        <p className="text-gray-300 text-sm">
          {userData.bio || "This user hasn’t added a bio yet."}
        </p>
      </div>
    </div>
  );
}
