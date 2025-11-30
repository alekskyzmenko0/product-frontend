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
  const move = (e: MouseEvent) => {
    setPos({ x: e.clientX / 80, y: e.clientY / 80 });
  };
  window.addEventListener("mousemove", move);
  return () => window.removeEventListener("mousemove", move);
}, []);


  useEffect(() => {
    async function loadProduct() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
          { cache: "no-store" }
        );

        if (!res.ok) {
          throw new Error("Ошибка загрузки товара");
        }

        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Ошибка API:", err);
      }
    }

    if (id) loadProduct();
  }, [id]);

  if (!product) return <p className="p-6">Загрузка...</p>;

  return (
<main className="p-6 space-y-10">
  <div className="flex gap-10 items-start">
    
    {/* 📸 Фото слева */}
<motion.div
  style={{
    transform: `translate(${pos.x}px, ${pos.y}px)`
  }}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="
    w-80 p-4 rounded-2xl mr-auto
    bg-white/5 backdrop-blur-xl
    border border-white/10 shadow-lg
    hover:border-white/20 hover:shadow-[0px_0px_25px_rgba(255,255,255,0.15)]
    transition-all duration-500
  "
>
  <img
    src={`${process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "")}/uploads/${product.imageUrl.split("/").pop()}`}
    alt={product.title}
    className="
      w-full object-contain rounded-xl
      transition-transform duration-500 group-hover:scale-105
      drop-shadow-[0_10px_25px_rgba(255,255,255,0.1)]
    "
  />
</motion.div>


    {/* 📝 Описание справа */}
    <div className="flex-1 space-y-6">
      <h1 className="text-5xl font-semibold tracking-tight">
        {product.title}
      </h1>

      <p className="text-lg text-gray-300 leading-relaxed max-w-xl">
          Невероятная мощность. Сглаженная красота. Создан, чтобы бросить вызов невозможному!
          </p>
          
<button
  className="
    w-56 px-8 py-3  
    bg-indigo-500/20
    text-white text-lg font-semibold
    rounded-2xl
    border border-indigo-400/30
    backdrop-blur-xl
    shadow-md
    transition-all duration-300

    hover:bg-indigo-500/30
    hover:border-indigo-300/40
    hover:shadow-[0_0_25px_rgba(99,102,241,0.35)]

    active:bg-indigo-600/40
    active:scale-95
  "
>
  Купить
</button>



    </div>
  </div>

      <ModelViewer src={product.modelUrl} alt="3D модель товара" />
    </main>
  );
}
