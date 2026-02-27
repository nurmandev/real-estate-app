import DashboardProfile from "@/components/dashboard/profile";
import AuthGuard from "@/components/auth/AuthGuard";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
  title: "Profile - OMNIS Real Estate",
};

const ProfilePage = () => {
  return (
    <Wrapper>
      <AuthGuard>
        <DashboardProfile />
      </AuthGuard>
    </Wrapper>
  );
};

export default ProfilePage;
