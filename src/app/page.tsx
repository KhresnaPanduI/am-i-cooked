import { Metadata } from "next";
import HomeClient from "@/components/HomeClient";

interface PageProps {
  searchParams: Promise<{ s?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const score = params.s ? parseInt(params.s, 10) : null;
  const hasScore = score !== null && !isNaN(score) && score >= 0 && score <= 100;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://am-i-cooked.vercel.app";

  if (hasScore) {
    const ogImageUrl = `${baseUrl}/api/og?s=${score}`;
    const title = `I'm ${score}% Replaceable by AI | Am I Cooked?`;
    const description = `I just found out I'm ${score}% replaceable by AI. Check if you're cooked too!`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "website",
        url: `${baseUrl}?s=${score}`,
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: `AI Replaceability Score: ${score}%`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [ogImageUrl],
      },
    };
  }

  // Default metadata (no score)
  const ogImageUrl = `${baseUrl}/api/og`;

  return {
    title: "Am I Cooked? | AI Job Replacement Calculator",
    description:
      "Describe your job title and what you do. We'll tell you how cooked you are. Find out if AI is coming for your career.",
    openGraph: {
      title: "Am I Cooked? | AI Job Replacement Calculator",
      description:
        "Find out how likely AI is to replace YOUR job. Describe what you do and get your score.",
      type: "website",
      url: baseUrl,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: "Am I Cooked? - AI Job Replacement Calculator",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Am I Cooked? | AI Job Replacement Calculator",
      description: "Find out how likely AI is to replace YOUR job.",
      images: [ogImageUrl],
    },
  };
}

export default function Home() {
  return <HomeClient />;
}
