import { Link } from "react-router-dom";

import book from "../../assets/category/book-doodle.png";
import bag from "../../assets/category/bag-doodle.png";
import calculator from "../../assets/category/calculator-doodle.png";
import electronics from "../../assets/category/electronics-doodle.png";
import fan from "../../assets/category/fan-doodle.png";
import hanger from "../../assets/category/hanger-doodle.png";
import headphone from "../../assets/category/headphone-doodle.png";
import hoodie from "../../assets/category/hoodie-doodle.png";
import hostel from "../../assets/category/hostel-doodle.png";
import kettle from "../../assets/category/kettle-doodle.png";
import keyboard from "../../assets/category/keyboard-doodle.png";
import lab from "../../assets/category/lab-doodle.png";
import lamp from "../../assets/category/lamp-doodle.png";
import notes from "../../assets/category/notes-doodle.png";
import shoe from "../../assets/category/shoe-doodle.png";

const items = [
  { name: "Books", image: book },
  { name: "Bags", image: bag },
  { name: "Calculator", image: calculator },
  { name: "Electronics", image: electronics },
  { name: "Fan", image: fan },
  { name: "Hanger", image: hanger },
  { name: "Headphones", image: headphone },
  { name: "Hoodie", image: hoodie },
  { name: "Hostel", image: hostel },
  { name: "Kettle", image: kettle },
  { name: "Keyboard", image: keyboard },
  { name: "Lab Equipment", image: lab },
  { name: "Study Lamp", image: lamp },
  { name: "Notes", image: notes },
  { name: "Shoes", image: shoe },
];

// Infinite Slider
const sliderItems = [...items, ...items];

const CategorySlider = () => {
  return (
    <section className="relative w-full overflow-hidden py-5">

      {/* Left Fade */}
      <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-32 bg-gradient-to-r from-[#FAFAFA] via-[#FAFAFA] to-transparent" />

      {/* Right Fade */}
      <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-32 bg-gradient-to-l from-[#FAFAFA] via-[#FAFAFA] to-transparent" />

      <div className="category-track">

        {sliderItems.map((item, index) => (

          <Link
            key={`${item.name}-${index}`}
            to="/products"
            className="category-item"
          >

            <div className="category-image">

              <img
                src={item.image}
                alt={item.name}
                className="category-img"
              />

            </div>

            <h3>{item.name}</h3>

          </Link>

        ))}

      </div>

    </section>
  );
};

export default CategorySlider;