import {products} from '../../public/data/data.json'
import CardCarousel from './CardCarousel';

const NewArrivals = () => {
    const cards = products.slice(0, 8).map((item) => ({
        id: item.id,
        image: item.image,
        text: item.text,
        price: item.price,
    }))


  return (
    <div className="new-arrivals">
      <CardCarousel title="New Arrivals" cards={cards} />
    </div>
  );
}

export default NewArrivals;