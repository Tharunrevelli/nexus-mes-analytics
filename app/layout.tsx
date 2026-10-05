import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NexusMES Analytics | Intelligent Manufacturing Execution & Warranty Intelligence',
  description: 'Enterprise Cloud MES platform featuring real-time IoT station telemetry, OEE tracking, predictive warranty defect anomaly detection, and embedded SQL analytics studio.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-cyan-500 selection:text-white">{children}</body>
    </html>
  );
}
