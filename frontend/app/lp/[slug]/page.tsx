import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getLandingPage } from "@/lib/landing-pages";
import { LandingPageClient } from "./LandingPageClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params;
    const page = await getLandingPage(slug);
    return {
      title: page.title_ar,
      robots: { index: false, follow: false },
    };
  } catch {
    return { robots: { index: false, follow: false } };
  }
}

export default async function LandingPage({ params }: Props) {
  const { slug } = await params;
  try {
    const page = await getLandingPage(slug);
    return <LandingPageClient page={page} />;
  } catch {
    notFound();
  }
}
