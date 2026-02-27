import PropertyList from "@/components/dashboard/properties-list";
import AuthGuard from "@/components/auth/AuthGuard";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
  title: "My Properties - OMNIS Real Estate",
};

const PropertyListPage = () => {
  return (
    <Wrapper>
      <AuthGuard>
        <PropertyList />
      </AuthGuard>
    </Wrapper>
  );
};

export default PropertyListPage;
