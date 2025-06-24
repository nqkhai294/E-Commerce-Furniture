"use client";

import { useState } from "react";
import { products } from "../../../public/data/data.json";
import ProductCard from "@/components/ProductCard";

const categories = ["Furniture", "Lighting", "Decor"];
const priceRanges = [
  { label: "$0 - $100", min: 0, max: 100 },
  { label: "$100 - $300", min: 100, max: 300 },
  { label: "$300+", min: 300, max: Infinity },
];
const materials = ["Wood", "Metal", "Fabric", "Leather", "Glass", "Rattan"];
const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
];

const ProductsPage = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedAvailability, setSelectedAvailability] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [sortBy, setSortBy] = useState("newest");

  // Filter logic
  let filtered = products.filter((p) => {
    // Category
    if (selectedCategories.length && !selectedCategories.includes(p.category))
      return false;
    // Price
    if (selectedPrices.length) {
      let inRange = false;
      for (const range of selectedPrices) {
        const { min, max } = priceRanges.find((r) => r.label === range);
        if (p.price >= min && p.price <= max) inRange = true;
      }
      if (!inRange) return false;
    }
    // Availability
    if (selectedAvailability.length) {
      if (selectedAvailability.includes("In Stock") && !p.inStock) return false;
      if (selectedAvailability.includes("Out of Stock") && p.inStock)
        return false;
    }
    // Material
    if (selectedMaterials.length && !selectedMaterials.includes(p.material))
      return false;
    return true;
  });

  // Sort logic
  if (sortBy === "price-asc") filtered.sort((a, b) => a.price - b.price);
  if (sortBy === "price-desc") filtered.sort((a, b) => b.price - a.price);
  // (Newest: giữ nguyên thứ tự)

  // Handlers
  const handleCheckbox = (value, state, setState) => {
    setState((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto my-12 px-4 flex gap-8 max-[900px]:flex-col">
      {/* Filter Sidebar */}
      <aside className="w-64 min-w-[220px] bg-white rounded-xl shadow p-6 h-fit max-[900px]:w-full">
        <h2 className="text-xl font-bold mb-6">Filter Options</h2>
        {/* Category */}
        <div className="mb-4">
          <div className="font-semibold mb-2">Category</div>
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-2 mb-1">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() =>
                  handleCheckbox(cat, selectedCategories, setSelectedCategories)
                }
              />
              {cat}
            </label>
          ))}
        </div>
        {/* Price Range */}
        <div className="mb-4">
          <div className="font-semibold mb-2">Price Range</div>
          {priceRanges.map((range) => (
            <label key={range.label} className="flex items-center gap-2 mb-1">
              <input
                type="checkbox"
                checked={selectedPrices.includes(range.label)}
                onChange={() =>
                  handleCheckbox(range.label, selectedPrices, setSelectedPrices)
                }
              />
              {range.label}
            </label>
          ))}
        </div>
        {/* Availability */}
        <div className="mb-4">
          <div className="font-semibold mb-2">Availability</div>
          {["In Stock", "Out of Stock"].map((status) => (
            <label key={status} className="flex items-center gap-2 mb-1">
              <input
                type="checkbox"
                checked={selectedAvailability.includes(status)}
                onChange={() =>
                  handleCheckbox(
                    status,
                    selectedAvailability,
                    setSelectedAvailability
                  )
                }
              />
              {status}
            </label>
          ))}
        </div>
        {/* Material */}
        <div className="mb-4">
          <div className="font-semibold mb-2">Material</div>
          {materials.map((mat) => (
            <label key={mat} className="flex items-center gap-2 mb-1">
              <input
                type="checkbox"
                checked={selectedMaterials.includes(mat)}
                onChange={() =>
                  handleCheckbox(mat, selectedMaterials, setSelectedMaterials)
                }
              />
              {mat}
            </label>
          ))}
        </div>
      </aside>

      {/* Products List */}
      <main className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            Products List ({filtered.length})
          </h1>
          <div>
            <label className="mr-2 font-medium">Sort by:</label>
            <select
              className="border rounded px-2 py-1"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              image={item.image}
              text={item.text}
              price={item.price}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProductsPage;
