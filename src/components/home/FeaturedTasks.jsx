const tasks = [
  {
    id: 1,
    title: "Build React Landing Page",
    client: "Sarah",
    category: "Development",
    budget: 150,
    deadline: "15 Jul 2026",
  },
  {
    id: 2,
    title: "Logo Design",
    client: "John",
    category: "Design",
    budget: 80,
    deadline: "20 Jul 2026",
  },
  {
    id: 3,
    title: "SEO Blog Writing",
    client: "Alex",
    category: "Writing",
    budget: 100,
    deadline: "18 Jul 2026",
  },
];

export default function FeaturedTasks() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-4">

        <h2 className="text-4xl font-bold text-center mb-12">
          Featured Tasks
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white p-6 rounded-2xl border hover:shadow-xl transition"
            >
              <h3 className="font-bold text-xl mb-3">
                {task.title}
              </h3>

              <p className="text-gray-500">
                Client: {task.client}
              </p>

              <p>{task.category}</p>

              <div className="flex justify-between mt-4">
                <span>${task.budget}</span>
                <span>{task.deadline}</span>
              </div>

              <button className="mt-5 w-full bg-blue-600 text-white py-2 rounded-lg">
                View Details
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}