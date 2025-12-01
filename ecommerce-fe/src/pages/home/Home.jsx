import Navbar from "@/components/Navbar";
import { Cards } from "./Cards";
import AppLayout from "@/layouts/AppLayout";

function Home() {
  return (
    <AppLayout isBannerVisible={true} >
      <Cards />
    </AppLayout>
  );
}

export default Home;
