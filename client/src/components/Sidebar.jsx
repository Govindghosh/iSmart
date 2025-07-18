import { useMemo, startTransition, memo } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaSignOutAlt,
  FaUser,
  FaBuilding,
  FaClock,
  FaTools,
  FaBriefcase,
  FaChartLine,
  FaChalkboardTeacher,
  FaPhoneAlt,
} from "react-icons/fa";
import useLogOut from "../hooks/user/useLogOut";
import logo from "../assets/logoNew.png";

const navItems = [
  { label: "My Profile", icon: FaUser, path: "/profile" },
  { label: "Department", icon: FaBuilding, path: "/department", role: ["superadmin", "admin", "manager", "hr", "head"] },
  { label: "HR", icon: FaBriefcase, path: "/hr", role: ["superadmin", "admin", "manager", "hr"] },
  { label: "Attendance", icon: FaClock, path: "/attendance" },
  { label: "After Sales", icon: FaTools, path: "/aftersales", role: ["superadmin", "admin", "manager", "hr", "support"] },
  { label: "Data Mining", icon: FaChartLine, path: "/datamining", role: ["superadmin", "admin", "manager", "hr", "analyst"] },
  { label: "Job Application", icon: FaBriefcase, path: "/jobapplication", role: ["superadmin", "admin", "manager", "hr", "hr"] },
  { label: "Sales", icon: FaChartLine, path: "/sales", role: ["superadmin", "admin", "manager", "sales"] },
  { label: "Training", icon: FaChalkboardTeacher, path: "/training", role: ["superadmin", "admin", "manager", "hr", "trainer"] },
  { label: "Telecom", icon: FaPhoneAlt, path: "/telecom", role: ["superadmin", "admin", "manager", "hr"] },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { user } = useSelector((state) => state.auth, shallowEqual);
  const { handleLogout, loading } = useLogOut();
  const navigate = useNavigate();
  const location = useLocation();

  const avatarUrl = useMemo(() => {
    if (user?.avatar?.startsWith("http")) return user.avatar;
    const name = user?.fullName || "User";
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=7B2CBF&color=fff`;
  }, [user?.avatar, user?.fullName]);

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => toggleSidebar(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 w-10 h-10 flex flex-col justify-between items-center p-2 group"
        aria-label="Toggle sidebar"
      >
        <span className={`block h-[3px] w-full bg-purple-800 rounded transition-transform duration-300 ${isOpen ? "rotate-45 translate-y-[9px]" : ""}`} />
        <span className={`block h-[3px] w-full bg-purple-800 rounded transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
        <span className={`block h-[3px] w-full bg-purple-800 rounded transition-transform duration-300 ${isOpen ? "-rotate-45 -translate-y-[9px]" : ""}`} />
      </button>

      {/* Sidebar Panel */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-full w-72 bg-white/90 dark:bg-gray-900 backdrop-blur-md shadow-xl border-r border-gray-200 dark:border-gray-700
          flex flex-col p-6 rounded-r-3xl transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:relative md:flex
        `}
      >
        {/* Logo & Avatar */}
        <div className="text-center shrink-0">
          <div className="flex items-center justify-center gap-2 mb-6">
            <img src={logo} alt="Logo" className="h-10" />
            <h1 className="text-xl font-extrabold text-purple-700 dark:text-purple-400">iSmart</h1>
          </div>

          <img
            src={avatarUrl}
            alt="Avatar"
            loading="lazy"
            className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border shadow"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.fullName || "User")}&background=7B2CBF&color=fff`;
            }}
          />

          <div className="text-gray-700 text-sm dark:text-gray-200">
            <h2 className="font-semibold text-lg text-purple-700 dark:text-purple-400">{user?.fullName}</h2>
            <p className="text-xs dark:text-gray-300">{user?.email}</p>
            <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
              DOB: {user?.dob ? new Date(user.dob).toLocaleDateString() : "N/A"}
            </p>
          </div>
        </div>

        {/* Nav Links */}
        <div className="flex-1 mt-8 overflow-y-auto pr-1 custom-scrollbar fade-in">
          <div className="flex flex-col gap-2">
            {navItems
              .filter(({ role }) => !role || role.includes(user?.role))
              .map(({ label, icon: Icon, path }) => {
                const isActive = location.pathname === path;
                return (
                  <button
                    key={label}
                    onClick={() => {
                      startTransition(() => {
                        navigate(path);
                        toggleSidebar(false);
                      });
                    }}
                    className={`flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-purple-100 text-purple-700 font-semibold dark:bg-purple-900 dark:text-purple-300"
                        : "hover:bg-purple-50 text-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                    }`}
                  >
                    <Icon className="text-purple-600 dark:text-purple-400" />
                    {label}
                  </button>
                );
              })}
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          disabled={loading}
          className="mt-6 py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-500 dark:from-purple-700 dark:to-indigo-600 text-white font-semibold
                   rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-60"
        >
          <FaSignOutAlt />
          {loading ? "Logging out..." : "Logout"}
        </button>
      </aside>

      {/* Mobile Backdrop - Transparent with Blur */}
      {isOpen && (
        <div
          onClick={() => toggleSidebar(false)}
          className="fixed inset-0 z-30 md:hidden bg-black/20 backdrop-blur-sm dark:bg-black/40"
        />
      )}
    </>
  );
};

export default memo(Sidebar);
