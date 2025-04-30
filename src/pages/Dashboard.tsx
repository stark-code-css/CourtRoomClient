const Dashboard = () => {
  let name = localStorage.getItem("name")?.toString();
  if (!name) {
    name = "User";
  } else {
    name = name.charAt(0).toUpperCase() + name.slice(1);
  }

  return (
    <div className="p-8 flex justify-center bg-gradient-to-br from-teal-100 via-white to-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-zinc-800 mb-6 select-none">
        Welcome, {name}
      </h1>
    </div>
  );
};
export default Dashboard;
