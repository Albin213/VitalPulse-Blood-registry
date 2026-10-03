"use client";

import { useState } from "react";
import SiteHeader from "../components/SiteHeader";
import RegistrationForm from "../components/RegistrationForm";
import DonorDirectory from "../components/DonorDirectory";

export default function Home() {
  const [donors, setDonors] = useState([]);

  return (
    <div id="top" className="min-h-screen bg-[#f7f9fb] text-slate-900">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-4 py-6 sm:px-6 sm:py-9 lg:px-10">
        <RegistrationForm onRegister={(donor) => setDonors((current) => [donor, ...current])} />
        <DonorDirectory donors={donors} />
      </main>
    </div>
  );
}
