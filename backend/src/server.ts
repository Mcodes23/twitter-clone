import express, { Request, Response } from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const BASE_URL = "https://jsonplaceholder.typicode.com";

app.get("/users", async (req: Request, res: Response) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/users`);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

app.get("/posts", async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId;
    const url = userId
      ? `${BASE_URL}/posts?userId=${userId}`
      : `${BASE_URL}/posts`;
    const { data } = await axios.get(url);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});

app.get("/comments", async (req: Request, res: Response) => {
  try {
    const postId = req.query.postId;
    const url = postId
      ? `${BASE_URL}/comments?postId=${postId}`
      : `${BASE_URL}/comments`;
    const { data } = await axios.get(url);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments" });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
