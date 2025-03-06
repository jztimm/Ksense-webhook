import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Display Server Running
app.get("/", (req: Request, res: Response) => {
  res.send("Webhook server is running!");
});

// Temp storage of the secret message
let secretMessage: string | null = null;

// Webhook Route that takes in the Payload
app.post("/webhook", (req: Request, res: Response) => {
  console.log("Received Payload:", JSON.stringify(req.body, null, 2));

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "Invalid payload: Missing body" });
  }

  secretMessage = req.body.secret || null; // Store the secret if available

  return res.status(200).json({ message: "Payload received successfully" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
