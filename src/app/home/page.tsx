import SliderComponent from "@/components/SliderComponent";
import Categories from "@/components/Categories";
import NewArrivals from "@/components/NewArrivals";
import TopSellers from "@/components/TopSellers";

const HomePage = () => {
  return (
    <div>
      <SliderComponent />
      <Categories />
      <NewArrivals />
      <TopSellers />
    </div>
  );
};

export default HomePage;
