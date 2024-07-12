import pool from "../models/movieModel.js";

export const getMovies = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM movies");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createMovie = async (req, res) => {
  const { name, time, year, image, introduce } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO movies (name, time, year, image, introduce) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, time, year, image, introduce]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateMovie = async (req, res) => {
  const { id } = req.params;
  const { name, time, year, image, introduce } = req.body;

  try {
    const result = await pool.query(
      "UPDATE movies SET name = $1, time = $2, year = $3, image = $4, introduce = $5 WHERE id = $6 RETURNING *",
      [name, time, year, image, introduce, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteMovie = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM movies WHERE id = $1", [id]);
    res.json({ message: "Movie deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const searchMovies = async (req, res) => {
  const { name } = req.query;

  try {
    const result = await pool.query(
      "SELECT * FROM movies WHERE name ILIKE $1",
      [`%${name}%`]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const sortMovies = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM movies ORDER BY year");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const uploadImage = (req, res) => {
  const filePath = `http://localhost:${process.env.PORT}/uploads/${req.file.filename}`;
  res.json({ url: filePath });
};
