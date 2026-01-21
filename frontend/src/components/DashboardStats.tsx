export const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded shadow">Tasks: 10</div>
      <div className="bg-white p-4 rounded shadow">Completed: 5</div>
      <div className="bg-white p-4 rounded shadow">Pending: 5</div>
    </div>
  );
};
