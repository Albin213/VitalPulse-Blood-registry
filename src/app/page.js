"use client";

import { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot, serverTimestamp } from "firebase/firestore";
import SiteHeader from "../components/SiteHeader";
import RegistrationForm from "../components/RegistrationForm";
import DonorDirectory from "../components/DonorDirectory";
import { db } from "../lib/firebase";

export default function Home() {
  const [donors, setDonors] = useState([]);
  const [directoryError, setDirectoryError] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "donors"),
      (snapshot) => {
        const records = snapshot.docs.map((donorDoc) => ({
          id: donorDoc.id,
          ...donorDoc.data(),
        }));
        records.sort((a, b) => (b.createdAt?.toMillis?.() ?? 0) - (a.createdAt?.toMillis?.() ?? 0));
        setDonors(records);
        setDirectoryError("");
      },
      (error) => {
        console.error("Could not read the Firestore donor directory.", error);
        setDirectoryError(error.code === "permission-denied" ? "permission-denied" : "load-failed");
      },
    );

    return unsubscribe;
  }, []);

  async function registerDonor(donor) {
    await addDoc(collection(db, "donors"), {
      ...donor,
      age: Number(donor.age),
      createdAt: serverTimestamp(),
    });
  }

  return (
    <div id="top" className="min-h-screen bg-[#f7f9fb] text-slate-900">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-4 py-6 sm:px-6 sm:py-9 lg:px-10">
        <RegistrationForm onRegister={registerDonor} />
        <DonorDirectory donors={donors} error={directoryError} />
        <aside className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6" aria-labelledby="emergency-help-heading">
          <h2 id="emergency-help-heading" className="text-base font-bold text-slate-900">Need emergency help?</h2>
          <p className="mt-1 text-sm leading-6 text-slate-700">For a life-threatening emergency in India, call <a className="font-bold text-rose-800 underline underline-offset-2" href="tel:112">112</a> for medical, police or fire help. If you need blood, contact a nearby hospital or blood bank directly. Donor availability can change.</p>
        </aside>
      </main>
    </div>
  );
}
