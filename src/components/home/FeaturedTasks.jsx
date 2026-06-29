// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import axiosInstance from "@/lib/axios";
// import { toast } from "react-hot-toast";

// export default function FeaturedTasks() {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchFeaturedTasks();
//   }, []);

//   const fetchFeaturedTasks = async () => {
//     try {
//       const { data } = await axiosInstance.get("/tasks");

//       // সর্বশেষ ৩টা task দেখাবে
//       setTasks(data.slice(0, 3));
//     } catch (error) {
//       toast.error("Failed to load tasks");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <section className="py-20 text-center">
//         Loading...
//       </section>
//     );
//   }

//   return (
//     <section className="bg-slate-50 py-20">
//       <div className="max-w-7xl mx-auto px-4">

//         <h2 className="text-4xl font-bold text-center mb-12">
//           Featured Tasks
//         </h2>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

//           {tasks.map((task) => (
//             <div
//               key={task._id}
//               className="bg-white p-6 rounded-2xl border hover:shadow-xl transition"
//             >
//               <h3 className="font-bold text-xl mb-3">
//                 {task.title}
//               </h3>

//               <p className="text-gray-500">
//                 Client: {task.clientName || "Anonymous"}
//               </p>

//               <p className="mt-2">
//                 {task.category}
//               </p>

//               <div className="flex justify-between mt-4">
//                 <span className="font-semibold text-green-600">
//                   ${task.budget}
//                 </span>

//                 <span className="text-gray-500">
//                   {task.deadline}
//                 </span>
//               </div>

//               <Link href={`/browse-tasks/${task._id}`}>
//                 <button className="mt-5 w-full bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold hover:scale-105 transition py-2 rounded-lg">
//                   View Details
//                 </button>
//               </Link>
//             </div>
//           ))}

//         </div>

//         <div className="text-center mt-12">
//           <Link href="/browse-tasks">
//             <button className="px-8 py-3 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition">
//               View All Tasks
//             </button>
//           </Link>
//         </div>

//       </div>
//     </section>
//   );
// }  
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axiosInstance from "@/lib/axios";
import { toast } from "react-hot-toast";

export default function FeaturedTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedTasks();
  }, []);

  const fetchFeaturedTasks = async () => {
    try {
      setLoading(true);

      const { data } = await axiosInstance.get(
        "/tasks?page=1&limit=3"
      );

      setTasks(data.tasks);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 text-center">
        <p className="text-xl font-semibold">
          Loading...
        </p>
      </section>
    );
  }

  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-4">

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">
            Featured Tasks
          </h2>

          <p className="text-gray-500 mt-3">
            Discover the latest freelance opportunities.
          </p>
        </div>

        {tasks.length === 0 ? (
          <div className="bg-white rounded-2xl border p-10 text-center">
            No Tasks Found
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {tasks.map((task) => (

              <div
                key={task._id}
                className="bg-white rounded-2xl border shadow hover:shadow-xl transition p-6 flex flex-col"
              >

                <div className="flex justify-between items-center">

                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                    {task.category}
                  </span>

                  <span className="font-bold text-green-600">
                    ${task.budget}
                  </span>

                </div>

                <h3 className="text-xl font-bold mt-5">
                  {task.title}
                </h3>

                <p className="text-gray-600 mt-3 line-clamp-3">
                  {task.description}
                </p>

                <div className="mt-5 space-y-2 text-sm">

                  <p>
                    <strong>Client:</strong>{" "}
                    {task.clientName || "Anonymous"}
                  </p>

                  <p>
                    <strong>Deadline:</strong>{" "}
                    {task.deadline}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    <span className="text-blue-600 capitalize">
                      {task.status}
                    </span>
                  </p>

                </div>

                <div className="mt-auto pt-6">

                  <Link
                    href={`/browse-tasks/${task._id}`}
                    className="block text-center rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white py-3 font-semibold hover:opacity-90 transition"
                  >
                    View Details
                  </Link>

                </div>

              </div>

            ))}

          </div>
        )}

        <div className="text-center mt-12">

          <Link
            href="/browse-tasks"
            className="inline-block border border-blue-600 text-blue-600 px-8 py-3 rounded-xl hover:bg-blue-600 hover:text-white transition"
          >
            View All Tasks
          </Link>

        </div>

      </div>
    </section>
  );
}