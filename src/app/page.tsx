'use client';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";

interface Product {
  _id: string;
  title: string;
  imageUrl: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
          cache: "no-store",
        });

        if (!res.ok) throw new Error("Ошибка загрузки списка товаров");

        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading)
    return <p className="text-white text-center pt-20 text-xl">Загрузка...</p>;

  return (
    <main className="min-h-screen bg-black pt-20 px-10 text-white">
      
            {/* 🔥 TOGGLE MENU — пока не кликабельный */}
      <div
        className="
          absolute top-8 right-10
          w-10 h-10 p-2 rounded-xl
          flex flex-col justify-between
          border border-white/10
          bg-white/5 backdrop-blur-xl
          hover:border-white/20 hover:scale-105
          transition-all duration-300 cursor-pointer
        "
      >
        <span className="block w-full h-[3px] bg-white rounded"></span>
        <span className="block w-full h-[3px] bg-white rounded"></span>
        <span className="block w-full h-[3px] bg-white rounded"></span>
      </div>
      
      <motion.h1
        className="text-5xl font-semibold text-center mb-16 tracking-tight"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Выбери свой Mac
      </motion.h1>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 max-w-7xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.15 } },
        }}
      >
        {products.map(product => (
          <motion.div
            key={product._id}
            variants={{
              hidden: { opacity: 0, scale: 0.95, y: 10 },
              visible: { opacity: 1, scale: 1, y: 0 },
            }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="flex justify-center"
          >
            <ProductCard
              id={product._id}
              title={product.title}
              imageUrl={product.imageUrl}
            />
          </motion.div>
        ))}
      </motion.div>
    </main>
  );
}
