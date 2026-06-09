import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type StarRatingProps = {
  rating?: number;
  max?: number;
  className?: string;
  starClassName?: string;
};

export function StarRating({ rating = 5, max = 5, className, starClassName }: StarRatingProps) {
  return (
    <div
      className={cn("flex items-center gap-0.5", className)}
      role="img"
      aria-label={`Rated ${rating} out of ${max} stars`}
    >
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "size-4",
            i < rating ? "fill-primary text-primary" : "fill-muted text-muted",
            starClassName,
          )}
          aria-hidden
        />
      ))}
    </div>
  );
}
