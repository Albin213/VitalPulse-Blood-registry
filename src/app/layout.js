import "./globals.css";

export const metadata = {
  title: "Alappuzha Blood Donation Finder | VitalPulse",
  description: "Find blood donors in Alappuzha and nearby places. Register as a donor or search the Alappuzha blood donor directory.",
  keywords: [
    "Alappuzha blood donation finder",
    "blood donors in Alappuzha",
    "Alappuzha blood donor directory",
    "donate blood Alappuzha",
    "blood donation near me Alappuzha",
    "blood donors Ambalappuzha",
    "blood donors Cherthala",
    "blood donors Chengannur",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
