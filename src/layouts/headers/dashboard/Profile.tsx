import Link from "next/link";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "@/redux/features/authSlice";
import { api } from "@/utils/api";
import { AppDispatch } from "@/redux/store";

import profileIcon_1 from "@/assets/images/dashboard/icon/icon_23.svg";
import profileIcon_3 from "@/assets/images/dashboard/icon/icon_25.svg";

const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await api.post("/api/auth/logout");
    } catch (_) {
      // best-effort
    }
    dispatch(logout());
    router.replace("/");
  };

  return (
    <>
      <div className="user-name-data">
        <ul className="dropdown-menu" aria-labelledby="profile-dropdown">
          <li>
            <Link
              className="dropdown-item d-flex align-items-center"
              href="/dashboard/profile"
            >
              <Image src={profileIcon_1} alt="" className="lazy-img" />
              <span className="ms-2 ps-1">Profile</span>
            </Link>
          </li>
          <li>
            <button
              className="dropdown-item d-flex align-items-center"
              onClick={handleLogout}
              style={{ background: "none", border: "none", width: "100%" }}
            >
              <Image src={profileIcon_3} alt="" className="lazy-img" />
              <span className="ms-2 ps-1">Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Profile;
