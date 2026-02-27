import DashboardMessage from "@/components/dashboard/message";
import AuthGuard from "@/components/auth/AuthGuard";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
  title: "Messages - OMNIS Real Estate",
};

const MessagesPage = () => {
  return (
    <Wrapper>
      <AuthGuard>
        <DashboardMessage />
      </AuthGuard>
    </Wrapper>
  );
};

export default MessagesPage;
