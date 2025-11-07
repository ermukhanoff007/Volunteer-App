"use client";
import { useEventStore } from "@/store/eventStore";

export default function CityFilter() {
  const { cityFilter, setCityFilter } = useEventStore();

  return (
    <div className="flex flex-col gap-3 p-5 rounded-xl shadow-md bg-white border border-gray-200 ">
      <label className="text-sm font-semibold text-gray-700">Choose your city</label>
      <select
        value={cityFilter}
        onChange={(e) => setCityFilter(e.target.value)}
        className="w-full p-2.5 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
      >
        <option value="">All Cities</option>
        <option value="Алматы">Алматы</option>
        <option value="Астана">Астана</option>
        <option value="Караганды">Караганды</option>
        <option value="Семей">Семей</option>
        <option value="Актау">Актау</option>
      </select>
    </div>
  );
}
