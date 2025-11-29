'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

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
    <main className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">{product.title}</h1>
      <p>{product.description}</p>

      <img
        src={product.imageUrl}
        alt={product.title}
        className="w-80 rounded shadow"
      />

      <ModelViewer src={product.modelUrl} alt="3D модель товара" />
    </main>
  );
}
