const categories = [
  { name: "Development", icon: "💻" },
  { name: "Design", icon: "🎨" },
  { name: "Writing", icon: "✍️" },
  { name: "Marketing", icon: "📈" },
  { name: "Other", icon: "🚀" },
];

export default function PopularCategories() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <h2 className="text-4xl font-bold text-center mb-12">
        Popular Categories
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {categories.map((category) => (
          <div
            key={category.name}
            className="bg-white border rounded-2xl p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer"
          >
            <div className="text-5xl mb-4">{category.icon}</div>
            <h3 className="font-semibold">{category.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}