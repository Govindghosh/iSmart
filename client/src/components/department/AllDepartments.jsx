import React, { useState } from "react";
import { useFetchAllDepartments } from "../../hooks/department/useFetchAllDepartments";
import DepartmentCard from "./DepartmentCard";
import Skeleton from "react-loading-skeleton";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";

const AllDepartments = () => {
  const [search, setSearch] = useState("");

  const { departments, status, error } = useFetchAllDepartments({
    page: 1,
    limit: 6,
    search,
  });

  const handleEdit = (department) => {
    console.log("Edit department:", department);
  };

  const handleDelete = (id) => {
    if (
      window.confirm("Are you sure you want to permanently delete this department?")
    ) {
      console.log("Deleting department ID:", id);
    }
  };

  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 py-10">
      {/* 🔍 Search Input */}
      <div className="mb-10 max-w-md mx-auto">
        <div className="flex items-center border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 shadow-sm rounded-xl px-4 py-3">
          <FiSearch className="text-gray-500 dark:text-gray-400 mr-3 text-lg" />
          <input
            type="text"
            placeholder="Search departments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 outline-none"
          />
        </div>
      </div>

      {/* 🧱 Grid Layout */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {/* ⏳ Loading Skeletons */}
        {status === "loading" &&
          Array.from({ length: 6 }).map((_, idx) => (
            <motion.div
              key={idx}
              className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
              initial={{ opacity: 0.4 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Skeleton
                height={160}
                baseColor="#f3f4f6"
                highlightColor="#e5e7eb"
                style={{ borderRadius: "1rem" }}
              />
            </motion.div>
          ))}

        {/* ❌ Error Display */}
        {status === "failed" && (
          <div className="col-span-full text-center text-red-600 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* 🚫 No Departments */}
        {status === "succeeded" && departments.length === 0 && (
          <div className="col-span-full text-center text-gray-500 dark:text-gray-400 text-sm">
            No departments found.
          </div>
        )}

        {/* ✅ Department Cards */}
        {status === "succeeded" &&
          departments.map((dept) => (
            <motion.div
              key={dept._id}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <DepartmentCard
                department={dept}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </motion.div>
          ))}
      </motion.div>
    </section>
  );
};

export default AllDepartments;
