const API_URL = "http://localhost:5000";

export const fetchCollections = async () => {
  const response = await fetch(`${API_URL}/collections`);
  return response.json();
};

export const fetchCollectionById = async (id) => {
  const response = await fetch(`${API_URL}/collections/${id}`);
  return response.json();
};
