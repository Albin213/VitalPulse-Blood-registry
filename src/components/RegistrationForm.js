"use client";

import { useState } from "react";
import Icon from "./Icon";

const inputClass = "mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-rose-400 focus:bg-white focus:ring-4 focus:ring-rose-100";

const alappuzhaPlaces = [
  "Alappuzha", "Ambalappuzha", "Aroor", "Aryad", "Chambakulam", "Chengannur",
  "Cherthala", "Cheriyanad", "Cheppad", "Edathua", "Haripad", "Karthikappally",
  "Kayamkulam", "Kuttanad", "Mavelikkara", "Mannar", "Mararikulam", "Muhamma",
  "Punnapra", "Thakazhy", "Thalavady", "Thiruvalla", "Veliyanad", "Veeyapuram",
];

export default function RegistrationForm({ onRegister }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setSubmitting(true);
    setError("");
    setSubmitted(false);

    try {
      await onRegister({
        name: formData.get("name").trim(),
        blood: formData.get("blood"),
        place: formData.get("place"),
        phone: formData.get("phone").trim(),
        age: formData.get("age"),
        gender: formData.get("gender"),
      });
      setSubmitted(true);
      form.reset();
    } catch (saveError) {
      setError(saveError?.code === "permission-denied"
        ? "Firestore blocked this registration. Publish the project’s firestore.rules in Firebase Console, then try again."
        : "Could not save your details. Please check your internet connection and Firestore setup.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="register" className="scroll-mt-28 rounded-3xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7 lg:p-8">
      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div className="flex gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-700 text-white shadow-lg shadow-rose-200"><Icon name="drop" className="h-7 w-7"/></span>
          <div><p className="mb-1 text-[11px] font-bold uppercase tracking-[.16em] text-rose-700">Alappuzha blood donation finder</p><h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Register as a blood donor in Alappuzha</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Add your details to help people find blood donors in Alappuzha and nearby towns.</p></div>
        </div>
        <span className="ml-16 inline-flex w-fit items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-800 sm:ml-0"><Icon name="check" className="h-4 w-4"/>Fast-track intake</span>
      </div>
      {submitted && <div role="status" className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">Thank you. Your details are now in the donor directory.</div>}
      {error && <div role="alert" className="mb-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-800">{error}</div>}
      <form onSubmit={submit} className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <label className="text-xs font-semibold text-slate-700">Your name <span className="text-rose-700">*</span><input className={inputClass} name="name" placeholder="Enter your full name" autoComplete="name" required /></label>
          <label className="text-xs font-semibold text-slate-700">Blood group <span className="text-rose-700">*</span><select className={inputClass} name="blood" defaultValue="" required><option value="" disabled>Choose your blood group</option>{["O-", "O+", "A+", "A-", "B+", "B-", "AB+", "AB-"].map((type) => <option key={type}>{type}</option>)}</select></label>
          <label className="text-xs font-semibold text-slate-700">Your town <span className="text-rose-700">*</span><select className={inputClass} name="place" defaultValue="" required><option value="" disabled>Choose your town</option>{alappuzhaPlaces.map((place) => <option key={place}>{place}</option>)}</select></label>
          <label className="text-xs font-semibold text-slate-700">Phone number <span className="text-rose-700">*</span><input className={inputClass} name="phone" placeholder="Enter your phone number" type="tel" autoComplete="tel" required /></label>
          <label className="text-xs font-semibold text-slate-700">Your age <span className="text-rose-700">*</span><input className={inputClass} name="age" placeholder="Enter your age" type="number" min="18" max="65" required /></label>
          <label className="text-xs font-semibold text-slate-700">Gender <span className="text-rose-700">*</span><select className={inputClass} name="gender" defaultValue="" required><option value="" disabled>Choose an option</option><option>Female</option><option>Male</option><option>Non-binary</option><option>Prefer not to say</option></select></label>
        </div>
        <label className="flex cursor-pointer items-start gap-3 rounded-xl bg-slate-50 p-4 text-xs leading-5 text-slate-600"><input className="mt-0.5 h-4 w-4 shrink-0 accent-rose-700" type="checkbox" required/><span>I agree to show my name, blood group, town, phone number, age and gender in the public donor list so people can contact me. <span className="text-rose-700">*</span></span></label>
        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between"><p className="text-xs text-slate-500">Your details will be visible to anyone who visits this donor directory.</p><button disabled={submitting} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-rose-700 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-rose-800 focus:outline-none focus:ring-4 focus:ring-rose-200 disabled:cursor-wait disabled:opacity-60" type="submit"><Icon name="check" className="h-4 w-4"/>{submitting ? "Saving..." : "Register as donor"}</button></div>
      </form>
    </section>
  );
}
