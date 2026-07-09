require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const ecRoutes = require("./routes/ecRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// ✅ Swagger Route (ADD THIS)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/ec", ecRoutes);

// Test Route
app.get("/", (req, res) => {
    res.json({
        message: "Bhu Bharati EC API is running..."
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});