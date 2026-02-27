import DashboardFavourite from "@/components/dashboard/favourites";
import AuthGuard from "@/components/auth/AuthGuard";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
  title: "Favorites - OMNIS Real Estate",
};

const FavoritesPage = () => {
  return (
    <Wrapper>
      <AuthGuard>
        <DashboardFavourite />
      </AuthGuard>
    </Wrapper>
  );
};

export default FavoritesPage;
