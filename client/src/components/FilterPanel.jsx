import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FilterPanel({
  filters = [],
  selectedFilters = [],
  setSelectedFilters,
  isVisible = false,
  width = 300,
  height = 400,
}) {
  const toggleFilter = (value) => {
    if (selectedFilters.includes(value)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== value));
    } else {
      setSelectedFilters([...selectedFilters, value]);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && filters.length > 0 && (
        <motion.aside
          key="filterSidebar"
          initial={{ x: width, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: width, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="rounded-md p-4 overflow-auto"
          style={{ minWidth: width, maxWidth: width, height }}
        >
          <h2 className="text-lg font-semibold mb-4 text-white">Filters</h2>
          <ul className="space-y-3">
            {filters.map((filter) => (
              <li key={filter}>
                <label className="inline-flex items-center space-x-3 cursor-pointer select-none">
                  {/* Hidden native checkbox */}
                  <input
                    type="checkbox"
                    checked={selectedFilters.includes(filter)}
                    onChange={() => toggleFilter(filter)}
                    className="sr-only"
                    id={`filter-${filter}`}
                  />
                  {/* Custom styled box */}
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center
                      border-2 border-gray-600
                      ${
                        selectedFilters.includes(filter)
                          ? "bg-blue-600 border-blue-600"
                          : "bg-gray-800"
                      }
                      transition-colors duration-300 ease-in-out
                      `}
                    aria-hidden="true"
                  >
                    {selectedFilters.includes(filter) && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-white">{filter}</span>
                </label>
              </li>
            ))}
          </ul>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
