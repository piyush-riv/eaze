import express from "express";

const app = express();

app.get("/health", (req, res) => {
    res.json({
        status: "success",
        message: "EverydayOS Core is running"
    });
});

app.listen(3000, () => {
    console.log("Core service running on port 3000");
});