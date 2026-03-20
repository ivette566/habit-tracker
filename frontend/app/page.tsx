export default function Habits() {
  const habits = [
    { id: 1, name: "Hábito 1", progress: 100 },
    { id: 2, name: "Hábito 2", progress: 60 },
    { id: 3, name: "Hábito 17", progress: 30 },
    { id: 4, name: "Prueba 1", progress: 80 },
  ];

  return (
    <main className="min-h-screen bg-gray-900 p-6">
      <h1 className="text-2xl font-bold mb-4 text-center text-white">Habits</h1>
      <div className="space-y-3 max-w-md mx-auto">
        {habits.map((habit) => (
          <div
            key={habit.id}
            className="bg-gray-800 shadow p-3 rounded flex items-center justify-between"
          >
            <div className="flex-1 mr-3">
              <p className="font-medium mb-1 text-white">{habit.name}</p>
              <div className="w-full bg-gray-600 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${habit.progress}%` }}
                ></div>
              </div>
            </div>
            <button className="px-3 py-1 bg-green-600 text-white rounded text-sm">
              ✔ Hecho
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
