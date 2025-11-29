'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const ModelViewer = dynamic(() => import("@/components/ModelViewer"), {
  ssr: false,
});

interface Product {
  title: string;
  description: string;
  imageUrl: string;
  modelUrl: string;
}

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    async function loadProduct() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
          { cache: "no-store" }
        );

        if (!res.ok) throw new Error("Ошибка загрузки товара");

        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Ошибка API:", err);
      }
    }

    if (id) loadProduct();
  }, [id]);

  // Parallax background tracking
  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX / 50, y: e.clientY / 50 });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  if (!product) return <p className="p-6 text-white">Загрузка...</p>;

  return (
    <main
      className="min-h-screen bg-black px-10 pt-10 text-white transition"
      style={{
        backgroundPositionX: pos.x,
        backgroundPositionY: pos.y,
        backgroundImage: "radial-gradient(circle at center, #0d0d0d, #000)",
      }}
    >
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >

        {/* LEFT COLUMN — PHOTO + TEXT + BUTTON */}
        <motion.section
          className="space-y-8"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Стеклянный блок с hover glow */}
          <motion.div
            className="w-full max-w-sm mx-auto lg:mx-0 p-4 rounded-xl border border-gray-700 
                       bg-white/5 backdrop-blur-md shadow-xl transition"
            whileHover={{
              boxShadow: "0 0 25px rgba(99,102,241,0.35)",
              scale: 1.02,
            }}
          >
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "")}/uploads/${product.imageUrl.split("/").pop()}`}
              alt={product.title}
              className="rounded-lg w-full object-cover"
            />
          </motion.div>

          {/* Название */}
          <motion.h1
            className="text-5xl font-semibold tracking-tight"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {product.title || 'MacBook Pro 16"'}
          </motion.h1>

          {/* Описание */}
          <motion.p
            className="text-lg text-gray-300 leading-relaxed max-w-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
          >
            {product.description ||
              "Бескомпромиссная мощность, созданная для профессионалов. Работайте быстрее, создавайте больше, достигайте нового уровня."}
          </motion.p>

          {/* Кнопка */}
          <motion.button
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700
                       transition rounded-2xl text-lg font-semibold shadow
                       hover:shadow-indigo-600/30"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Купить
          </motion.button>
        </motion.section>

        {/* RIGHT COLUMN — MODEL VIEWER */}
        <motion.section
          className="w-full flex justify-center items-center"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <ModelViewer src={product.modelUrl} alt="3D модель товара" />
        </motion.section>
      </motion.div>
    </main>
  );
}
