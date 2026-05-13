import type { Metadata } from "next";
import { ThankYouClient } from "./ThankYouClient";

export const metadata: Metadata = {
  title: "تم استلام طلبك — لاميس",
  description: "شكراً لطلبك من لاميس. سيتواصل معك فريقنا قريباً.",
  robots: { index: false },
};

interface Props {
  params: Promise<{ orderId: string }>;
}

export default async function ThankYouPage({ params }: Props) {
  const { orderId } = await params;
  return <ThankYouClient orderId={orderId} />;
}
