'use client';

import { useEffect, useState } from "react";
import Link from "next/link"; 

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

        if (!res.ok) {
          throw new Error("Ошибка загрузки списка товаров");
        }

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

  if (loading) return <p className="p-6">Загрузка...</p>;

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Список товаров</h1>

      {products.length === 0 ? (
        <p>Нет товаров</p>
      ) : (
        <div className="grid grid-cols-3 gap-6">
{products.map(product => (
  <Link
    key={product._id}
    href={`/product/${product._id}`}
    className="border p-4 rounded shadow block hover:bg-gray-100 transition"
  >
<img
  src={`${process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "")}/uploads/${product.imageUrl.split("/").pop()}`}
  alt={product.title}
  className="w-full h-40 object-cover rounded mb-2"
/>

    <h2 className="text-lg font-semibold">{product.title}</h2>
  </Link>
))}
        </div>
      )}
    </main>
  );
}
