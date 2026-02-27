import DashboardAddProperty from "@/components/dashboard/add-property";
import AuthGuard from "@/components/auth/AuthGuard";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
  title: "Add Property - OMNIS Real Estate",
};

const AddPropertyPage = () => {
  return (
    <Wrapper>
      <AuthGuard>
        <DashboardAddProperty />
      </AuthGuard>
    </Wrapper>
  );
};

export default AddPropertyPage;
