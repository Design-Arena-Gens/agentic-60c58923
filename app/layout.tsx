import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FF | Future Flow Intelligence',
  description:
    'Future Flow (FF) is a forward-looking operating system for strategic finance leaders to plan, simulate, and communicate growth trajectories with clarity.',
  openGraph: {
    title: 'FF | Future Flow Intelligence',
    description:
      'Future Flow (FF) is a forward-looking operating system for strategic finance leaders to plan, simulate, and communicate growth trajectories with clarity.',
    url: 'https://agentic-60c58923.vercel.app',
    siteName: 'Future Flow',
    images: [
      {
        url: 'https://agentic-60c58923.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FF | Future Flow Intelligence Dashboard',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FF | Future Flow Intelligence',
    description:
      'Future Flow (FF) helps strategic finance teams model outcomes and communicate scenarios.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
