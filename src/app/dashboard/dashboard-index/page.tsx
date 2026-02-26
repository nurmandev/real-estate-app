import AuthGuard from "@/components/auth/AuthGuard";
import DashboardIndex from "@/components/dashboard/index";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
  title: "Dashboard - OMNIS Real Estate",
};

// Server component — just renders the shell.
// AuthGuard (client component) handles the auth check inside.
const DashboardIndexPage = () => {
  return (
    <Wrapper>
      <AuthGuard>
        <DashboardIndex />
      </AuthGuard>
    </Wrapper>
  );
};

export default DashboardIndexPage;
