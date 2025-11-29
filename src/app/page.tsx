'use client';

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";

interface Product {
  _id: string;
  title: string;
  imageUrl: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("API Error:", err));
  }, []);

  return (
    <main className="min-h-screen bg-black px-10">
      <Navbar />

      <h1 className="text-4xl font-bold text-white mb-10 text-center">
        Выбери свой Mac
      </h1>

      <div className="grid grid-cols-3 gap-10 max-w-7xl mx-auto">
        {products.map(product => (
          <ProductCard
            key={product._id}
            id={product._id}
            title={product.title}
            imageUrl={product.imageUrl}
          />
        ))}
      </div>
    </main>
  );
}
