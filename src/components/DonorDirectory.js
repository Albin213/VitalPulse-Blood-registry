"use client";

import { useEffect, useMemo, useState } from "react";
import Icon from "./Icon";

const bloodGroups = ["O-", "O+", "A+", "A-", "B+", "B-", "AB+", "AB-"];
const pageSize = 10;
const controlClass = "h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-rose-400 focus:ring-4 focus:ring-rose-100";

export default function DonorDirectory({ donors, error = "" }) {
  const [query, setQuery] = useState("");
  const [blood, setBlood] = useState("All blood types");
  const [place, setPlace] = useState("All places");
  const [page, setPage] = useState(1);
  const filtered = useMemo(() => donors.filter((donor) => {
    const term = query.trim().toLowerCase();
    return (!term || `${donor.name} ${donor.phone} ${donor.place}`.toLowerCase().includes(term)) &&
      (blood === "All blood types" || donor.blood === blood) &&
      (place === "All places" || donor.place === place);
  }), [donors, query, blood, place]);
  const places = [...new Set(donors.map((donor) => donor.place))];
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const pageDonors = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const firstItem = filtered.length ? (currentPage - 1) * pageSize + 1 : 0;
  const lastItem = Math.min(currentPage * pageSize, filtered.length);

  useEffect(() => {
    setPage(1);
  }, [query, blood, place]);

  return (
    <section id="directory" className="scroll-mt-28 overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
      <div className="flex flex-col gap-5 p-5 sm:p-7">
        <div><p className="text-[11px] font-bold uppercase tracking-[.16em] text-rose-700">Alappuzha blood donor finder</p><h2 className="mt-1 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">Find a blood donor in Alappuzha</h2><p className="mt-1 text-sm text-slate-500">{donors.length} {donors.length === 1 ? "donor" : "donors"} registered</p></div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-[minmax(220px,1fr)_200px_200px]">
          <label className="relative"><span className="sr-only">Search donors</span><Icon name="search" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"/><input className={`${controlClass} w-full pl-9`} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Type a name, phone number or town"/></label>
          <select aria-label="Filter by blood group" className={controlClass} value={blood} onChange={(event) => setBlood(event.target.value)}><option>All blood types</option>{bloodGroups.map((type) => <option key={type}>{type}</option>)}</select>
          <select aria-label="Filter by place" className={controlClass} value={place} onChange={(event) => setPlace(event.target.value)}><option>All places</option>{places.map((item) => <option key={item}>{item}</option>)}</select>
        </div>
      </div>
      {error ? <div role="alert" className="border-t border-rose-100 bg-rose-50 px-5 py-8 text-center text-sm text-rose-800">{error === "permission-denied" ? <><p className="font-semibold">Firestore is blocking access to the donor list.</p><p className="mt-1">In Firebase Console, open Firestore Database → Rules, paste in the project’s <code className="rounded bg-rose-100 px-1">firestore.rules</code> file, and publish the rules.</p><a className="mt-3 inline-block font-bold underline underline-offset-2" href="https://console.firebase.google.com/project/find-donor-d7cf8/firestore/databases/-default-/rules" target="_blank" rel="noreferrer">Open this project’s Firestore rules</a></> : <p className="font-semibold">Could not load donors. Check your internet connection and Firestore setup.</p>}</div> : filtered.length === 0 ? <div className="border-t border-slate-100 px-5 py-12 text-center"><span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-500"><Icon name="people"/></span><h3 className="mt-3 font-bold text-slate-900">{donors.length ? "No donors match these filters" : "No donors registered yet"}</h3><p className="mt-1 text-sm text-slate-500">{donors.length ? "Try another search, blood group or place." : "Registered donors will appear here."}</p></div> : <>
        <div className="hidden overflow-x-auto border-t border-slate-100 md:block"><table className="w-full text-left"><thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500"><tr><th className="px-6 py-3">Name</th><th className="px-4 py-3">Blood group</th><th className="px-4 py-3">Place</th><th className="px-4 py-3">Phone</th><th className="px-4 py-3">Age</th><th className="px-6 py-3">Gender</th></tr></thead><tbody className="divide-y divide-slate-100">{pageDonors.map((donor) => <tr key={donor.id} className="hover:bg-rose-50/40"><td className="px-6 py-4 text-sm font-semibold text-slate-800">{donor.name}</td><td className="px-4 py-4"><span className="rounded-lg bg-rose-50 px-2.5 py-1.5 text-sm font-bold text-rose-800">{donor.blood}</span></td><td className="px-4 py-4 text-sm text-slate-700">{donor.place}</td><td className="px-4 py-4 text-sm text-slate-700"><a className="hover:text-rose-800" href={`tel:${donor.phone}`}>{donor.phone}</a></td><td className="px-4 py-4 text-sm text-slate-700">{donor.age}</td><td className="px-6 py-4 text-sm text-slate-700">{donor.gender}</td></tr>)}</tbody></table></div>
        <ul className="divide-y divide-slate-100 border-t border-slate-100 md:hidden">{pageDonors.map((donor) => <li key={donor.id} className="p-4"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="truncate text-sm font-bold text-slate-800">{donor.name}</p><p className="mt-1 text-xs text-slate-500">{donor.place}</p></div><span className="shrink-0 rounded-lg bg-rose-50 px-2.5 py-1.5 text-sm font-bold text-rose-800">{donor.blood}</span></div><dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-xs"><div><dt className="text-slate-500">Phone</dt><dd className="mt-0.5 font-medium text-slate-700"><a href={`tel:${donor.phone}`}>{donor.phone}</a></dd></div><div><dt className="text-slate-500">Age</dt><dd className="mt-0.5 font-medium text-slate-700">{donor.age}</dd></div><div className="col-span-2"><dt className="text-slate-500">Gender</dt><dd className="mt-0.5 font-medium text-slate-700">{donor.gender}</dd></div></dl></li>)}</ul>
        <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">Showing <strong className="text-slate-800">{firstItem}–{lastItem}</strong> of <strong className="text-slate-800">{filtered.length}</strong> donors</p>
          <nav aria-label="Donor directory pages" className="flex items-center justify-between gap-3 sm:justify-end">
            <button type="button" onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={currentPage === 1} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40">Previous</button>
            <span aria-live="polite" className="text-xs font-medium text-slate-600">Page {currentPage} of {pageCount}</span>
            <button type="button" onClick={() => setPage((value) => Math.min(pageCount, value + 1))} disabled={currentPage === pageCount} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40">Next</button>
          </nav>
        </div>
      </>}
    </section>
  );
}
