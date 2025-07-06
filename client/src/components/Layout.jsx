import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-zinc-950 text-zinc-900 dark:text-white">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6 md:p-10 transition-all">
        {children}
      </main>
    </div>
  );
};

export default Layout;
