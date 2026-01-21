const API_BASE = `${import.meta.env.VITE_API_BASE_URL}/api`;

export async function getCertifications() {
  const response = await fetch(`${API_BASE}/Certifications`);

  if (!response.ok) {
    throw new Error("Failed to fetch certifications");
  }

  return response.json();
}
