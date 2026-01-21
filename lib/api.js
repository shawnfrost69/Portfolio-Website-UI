// const API = process.env.NEXT_PUBLIC_API_URL || "";

// async function req(path, options = {}) {
//   const res = await fetch(`${API}${path}`, { ...options, cache: "no-store" });
//   if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
//   return res.json();
// }

// export const api = {
//   projects: () => req("/api/projects"),
//   skills: () => req("/api/skills"),
//   experience: () => req("/api/experience"),
//   education: () => req("/api/education"),
//   achievements: () => req("/api/achievements"),
//   contact: (payload) =>
//     req("/api/contact", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     }),
// };
