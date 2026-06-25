const freelancers = [
  {
    id: 1,
    name: "John Doe",
    image: "https://i.pravatar.cc/150?img=1",
    rating: 4.9,
    jobs: 25,
    skills: ["React", "Node", "MongoDB"],
  },
  {
    id: 2,
    name: "Jane Smith",
    image: "https://i.pravatar.cc/150?img=2",
    rating: 4.8,
    jobs: 19,
    skills: ["UI/UX", "Figma"],
  },
];

export default function TopFreelancers() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20">

      <h2 className="text-4xl font-bold text-center mb-12">
        Top Freelancers
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {freelancers.map((freelancer) => (
          <div
            key={freelancer.id}
            className="border rounded-2xl p-6 text-center hover:shadow-xl transition"
          >
            <img
              src={freelancer.image}
              alt={freelancer.name}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />

            <h3 className="font-bold text-xl">
              {freelancer.name}
            </h3>

            <p className="mt-2">
              ⭐ {freelancer.rating}
            </p>

            <p>{freelancer.jobs} Jobs Completed</p>

            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {freelancer.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-blue-100 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}