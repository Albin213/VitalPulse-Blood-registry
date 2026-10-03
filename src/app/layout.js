import "./globals.css";

export const metadata = {
  title: "VitalPulse | Blood Donor Registry",
  description: "Connect blood donors with nearby hospitals and urgent patient needs.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
