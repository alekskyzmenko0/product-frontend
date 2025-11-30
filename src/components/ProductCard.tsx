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
        group relative overflow-hidden
        rounded-2xl border border-white/10
        bg-white/5 backdrop-blur-xl
        p-6 shadow-lg
        flex flex-col items-center
        transition-all duration-500
        hover:scale-[1.03] hover:border-white/20 hover:shadow-[0px_0px_25px_rgba(255,255,255,0.15)]
      "
    >

      {/* Световое свечение при наведении */}
      <div className="
        absolute inset-0 opacity-0 group-hover:opacity-100 
        transition-opacity duration-500
        pointer-events-none
        bg-gradient-to-br from-transparent via-white/5 to-white/10
      "/>

      {/* Фото товара */}
      <img
        src={`${process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "")}/uploads/${imageUrl.split("/").pop()}`}
        alt={title}
        className="
          w-56 h-40 object-contain
          transition-transform duration-500
          group-hover:scale-110
          drop-shadow-[0_10px_25px_rgba(255,255,255,0.1)]
        "
      />

      {/* Название */}
      <h2
        className="
          text-white text-xl font-semibold mt-6
          tracking-tight text-center
          transition-colors duration-300
          group-hover:text-indigo-200
        "
      >
        {title}
      </h2>
    </Link>
  );
}
