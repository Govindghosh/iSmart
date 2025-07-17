import React, { useMemo } from "react";
import Layout from "../layouts/Layout";
import { PiClockCountdownLight } from "react-icons/pi";
import AttendanceForm from "../components/attendance/AttendanceForm";
import { useSelector } from "react-redux";
import AttendanceCalendarView from "../components/attendance/AttendanceCalendarView";

const AttendancePage = () => {
  const { user } = useSelector((state) => state.auth);

  const filters = useMemo(
    () => ({
      page: 1,
      limit: 10,
      department: user?.department?._id || undefined,
      employee: user?._id,
    }),
    [user]
  );

  return (
    <Layout>
      <div className="bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 p-6 md:p-10 max-w-6xl mx-auto w-full min-h-screen">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-cyan-100 text-cyan-800 dark:bg-cyan-800 dark:text-white p-2 rounded-full shadow-md">
            <PiClockCountdownLight className="text-xl animate-pulse" />
          </div>
          <h1 className="text-3xl font-bold text-zinc-800 dark:text-gray-100 tracking-tight">
            My Attendance
          </h1>
        </div>

        {/* Attendance Form Section */}
        <div className="rounded-2xl bg-white dark:bg-zinc-800 border border-cyan-500/20 p-4 md:p-6 shadow-lg mb-8">
          <AttendanceForm />
        </div>

        {/* Attendance List Section */}
        <div className="rounded-2xl bg-white dark:bg-zinc-800 border border-cyan-500/20 p-4 md:p-6 shadow-lg">
          <AttendanceCalendarView filters={filters} />
        </div>
      </div>
    </Layout>
  );
};

export default AttendancePage;
