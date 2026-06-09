import { PRODUCT_MAP } from "@/config/products";
import type { CartItem } from "@/store/cart-store";

export function getCartItemImage(
  item: CartItem
): { src: string; alt: string } | null {
  const prod = PRODUCT_MAP[item.productId];
  if (prod) return { src: prod.images.main, alt: prod.shortNameAr };
  if (item.imageUrl) return { src: item.imageUrl, alt: item.titleAr };
  return null;
}
