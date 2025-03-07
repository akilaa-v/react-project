import { create, router as _router, defaults } from "json-server";
import { get } from "axios";

const server = create();
const router = _router({ collections: [] }); // Initial empty object
const middlewares = defaults();

const MUSIC_API = "https://api.musiccollection.com/v1/collections";

server.use(middlewares);

// Fetch data from the API before responding
server.get("/collections", async (req, res) => {
  try {
    const response = await get(MUSIC_API);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data from API" });
  }
});

server.use(router);
server.listen(3001, () => {
  console.log("JSON Server running on http://localhost:3001");
});
