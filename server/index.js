import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Проверка здоровья сервера и подключения к PostgreSQL
app.get("/api/health", async (req, res) => {
  try {
    const result = await pool.query("SELECT COUNT(*) FROM cars;");
    res.json({
      status: "ok",
      database: "PostgreSQL",
      carsCount: Number(result.rows[0].count),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Database connection failed",
      error: error.message,
    });
  }
});

// Получить список всех автомобилей (с фильтрацией и сортировкой)
app.get("/api/cars", async (req, res) => {
  try {
    const { body, fuel, transmission, minPrice, maxPrice, sort } = req.query;

    let query = "SELECT * FROM cars WHERE 1=1";
    const params = [];

    if (body) {
      params.push(body.toLowerCase());
      query += ` AND LOWER(overview->>'body') = $${params.length}`;
    }

    if (fuel) {
      params.push(fuel.toLowerCase());
      query += ` AND LOWER(quick_specs->>'fuel') = $${params.length}`;
    }

    if (transmission) {
      params.push(transmission.toLowerCase());
      query += ` AND LOWER(quick_specs->>'transmission') = $${params.length}`;
    }

    if (minPrice) {
      params.push(Number(minPrice));
      query += ` AND price >= $${params.length}`;
    }

    if (maxPrice) {
      params.push(Number(maxPrice));
      query += ` AND price <= $${params.length}`;
    }

    if (sort === "price_asc") {
      query += " ORDER BY price ASC";
    } else if (sort === "price_desc") {
      query += " ORDER BY price DESC";
    } else if (sort === "year_desc") {
      query += " ORDER BY (overview->>'year')::int DESC";
    } else {
      query += " ORDER BY id ASC";
    }

    const result = await pool.query(query, params);

    // Маппим колонки в привычный camelCase для фронтенда
    const cars = result.rows.map((row) => ({
      id: row.id,
      slug: row.slug,
      name: row.name,
      subtitle: row.subtitle,
      image: row.image_key,
      badge: row.badge,
      badges: row.badges,
      hasVideo: row.has_video,
      price: Number(row.price),
      formattedPrice: row.formatted_price,
      oldPrice: row.old_price ? Number(row.old_price) : null,
      formattedOldPrice: row.formatted_old_price,
      instantSaving: row.instant_saving,
      quickSpecs: row.quick_specs,
      overview: row.overview,
      dealer: row.dealer,
      description: row.description,
      features: row.features,
      dimensions: row.dimensions,
      engineAndTransmission: row.engine_and_transmission,
    }));

    res.json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ error: error.message });
  }
});

// Получить один автомобиль по id или slug
app.get("/api/cars/:idOrSlug", async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    const isNumeric = /^\d+$/.test(idOrSlug);

    const query = isNumeric
      ? "SELECT * FROM cars WHERE id = $1 LIMIT 1;"
      : "SELECT * FROM cars WHERE slug = $1 LIMIT 1;";

    const result = await pool.query(query, [isNumeric ? Number(idOrSlug) : idOrSlug]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Car not found" });
    }

    const row = result.rows[0];
    const car = {
      id: row.id,
      slug: row.slug,
      name: row.name,
      subtitle: row.subtitle,
      image: row.image_key,
      badge: row.badge,
      badges: row.badges,
      hasVideo: row.has_video,
      price: Number(row.price),
      formattedPrice: row.formatted_price,
      oldPrice: row.old_price ? Number(row.old_price) : null,
      formattedOldPrice: row.formatted_old_price,
      instantSaving: row.instant_saving,
      quickSpecs: row.quick_specs,
      overview: row.overview,
      dealer: row.dealer,
      description: row.description,
      features: row.features,
      dimensions: row.dimensions,
      engineAndTransmission: row.engine_and_transmission,
    };

    res.json(car);
  } catch (error) {
    console.error("Error fetching car:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Boxcars API server running on port ${PORT}`);
});
