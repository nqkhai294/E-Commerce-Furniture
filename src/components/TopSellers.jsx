import { products } from "../../public/data/data.json";
import CardCarousel from "./CardCarousel";

const TopSellers = () => {
  const cards = products.slice(0, 8).map((item) => ({
    id: item.id,
    image: item.image,
    text: item.text,
    price: item.price,
  }));

  return (
    <div className="top-sellers">
      <CardCarousel title="Top Sellers" cards={cards} />
    </div>
  );
};

export default TopSellers;
