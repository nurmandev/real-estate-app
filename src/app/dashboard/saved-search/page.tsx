import DashboardSavedSearch from "@/components/dashboard/saved-search";
import AuthGuard from "@/components/auth/AuthGuard";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
  title: "Saved Searches - OMNIS Real Estate",
};

const SavedSearchPage = () => {
  return (
    <Wrapper>
      <AuthGuard>
        <DashboardSavedSearch />
      </AuthGuard>
    </Wrapper>
  );
};

export default SavedSearchPage;
