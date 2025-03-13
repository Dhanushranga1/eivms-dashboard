const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const admin = require("firebase-admin");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Initialize Firebase Admin
const serviceAccount = require("./firebase-admin-key.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

app.use(cors());
app.use(express.json());

// WebSocket connection
io.on("connection", (socket) => {
    console.log("Client connected");

    // Listen for new analytics data
    socket.on("sendAnalytics", async (data) => {
        try {
            await db.collection("analytics").add(data);
            io.emit("newAnalytics", data);
        } catch (error) {
            console.error("Error saving data:", error);
        }
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

// API Endpoint to Fetch Analytics
app.get("/analytics", async (req, res) => {
    try {
        const snapshot = await db.collection("analytics").get();
        const analyticsData = snapshot.docs.map((doc) => doc.data());
        res.json(analyticsData);
    } catch (error) {
        res.status(500).send("Error fetching analytics data");
    }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
