"use client";
import { useEventStore } from "@/store/eventStore";
import { Filter } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { Modal } from "./Modal";
import { se } from "date-fns/locale";

export default function CityFilter() {
  const { cityFilter, setCityFilter } = useEventStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="flex sm:hidden mt-8 px-6">
        <Button onClick={() => setIsOpen(true)} className="w-[100px]">
          <Filter />
          Filter
        </Button>
        {isOpen && (
          <Modal onClose={() => setIsOpen(false)}>
            <div className="flex-col gap-3 p-2 rounded-xl  bg-white  border-gray-200">
              <label className="text-sm font-semibold text-gray-700 ">Choose your city</label>

              {["Алматы", "Астана", "Караганды", "Семей", "Актау"].map((city) => (
                <div key={city} className="flex items-center ">
                  <input
                    type="checkbox"
                    id={city}
                    value={city}
                    checked={cityFilter === city}
                    onChange={() => setCityFilter(cityFilter === city ? "" : city)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor={city} className="ml-2 text-sm text-gray-700">
                    {city}
                  </label>
                </div>
              ))}
              <Button onClick={() => setIsOpen(false) } className="mt-2">Filter</Button>
            </div>
          </Modal>
        )}
      </div>
      <div className="flex-col gap-3 p-5 rounded-xl shadow-md bg-white border border-gray-200 hidden sm:flex">
        <label className="text-sm font-semibold text-gray-700 ">Choose your city</label>

        {["Алматы", "Астана", "Караганды", "Семей", "Актау"].map((city) => (
          <div key={city} className="flex items-center ">
            <input
              type="checkbox"
              id={city}
              value={city}
              checked={cityFilter === city}
              onChange={() => setCityFilter(cityFilter === city ? "" : city)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor={city} className="ml-2 text-sm text-gray-700">
              {city}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
