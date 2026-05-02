import { Star } from "lucide-react";

export function StarRating({
  rating = 5,
  count,
}: {
  rating?: number;
  count?: number;
}) {
  return (
    <div className="flex items-center gap-1.5" dir="rtl">
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            className={
              i < Math.round(rating)
                ? "fill-[#C9A45C] text-[#C9A45C]"
                : "text-[#E8DAD6]"
            }
            aria-hidden
          />
        ))}
      </div>
      {count !== undefined && (
        <span className="text-sm text-[#6F6262]">({count} تقييم)</span>
      )}
    </div>
  );
}
