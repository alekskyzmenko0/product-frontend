"use client";

import Link from "next/link";

interface ProductCardProps {
  id: string;
  title: string;
  imageUrl: string;
}

export default function ProductCard({ id, title, imageUrl }: ProductCardProps) {
  return (
    <Link
      href={`/product/${id}`}
      className="
        group
        rounded-xl border border-[#333]
        backdrop-blur-md bg-white/5
        p-4 shadow-md transition-transform duration-300 
        hover:scale-105 hover:shadow-xl hover:border-gray-400
      "
    >
<img
  src={`${process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "")}/uploads/${imageUrl.split("/").pop()}`}
  alt={title}
  className="w-80 rounded shadow"
/>
      <h2 className="text-white text-lg font-semibold">{title}</h2>
    </Link>
  );
}
