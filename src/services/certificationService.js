const API_BASE = "http://localhost:5137/api";

export async function getCertifications() {
  const response = await fetch(`${API_BASE}/Certifications`);

  if (!response.ok) {
    throw new Error("Failed to fetch certifications");
  }

  return response.json();
}
