const express = require("express");
const db = require("../db/db");
const router = express.Router();

router.get("/", async (req, res) => {
  const {
    sort,
    brand,
    year,
    gearshift,
    colors,
    situation,
    minPrice,
    maxPrice,
  } = req.query;

  let orderBy = "";
  let where = [];

  if (brand) where.push(`marca.brand_name = '${brand}'`);
  if (year) where.push(`carro.release_year = '${year}'`);
  if (gearshift) where.push(`carro.gearshift = '${gearshift}'`);
  if (situation) where.push(`carro.condition = '${situation}'`);

  if (colors) {
    let colorArray = Array.isArray(colors) ? colors : [colors];
    const colorConditions = colorArray.map(
      (color) => `carro.car_color = '${color}'`
    );
    where.push(`(${colorConditions.join(" OR ")})`);
  }

  if (minPrice && maxPrice) {
    where.push(
      `carro.car_price > ${minPrice} AND carro.car_price < ${maxPrice}`
    );
  }

  let query = `
        SELECT carro.* 
        FROM anuncio 
        INNER JOIN carro ON carro.id_carro = anuncio.id_carro 
        INNER JOIN marca ON marca.id_marca = carro.id_marca
        `;

  if (where.length > 0) query += " WHERE " + where.join(" AND ");

  switch (sort) {
    case "higher-price":
      orderBy = "ORDER BY carro.car_price DESC";
      break;

    case "lower-price":
      orderBy = "ORDER BY carro.car_price ASC";
      break;

    case "latest":
      orderBy = "ORDER BY carro.id_carro DESC";
      break;

    case "lower-distance":
      orderBy = "ORDER BY carro.distance ASC";
      break;
  }

  if (orderBy) query += " " + orderBy;

  console.log("QUERY FINAL:", query);

  try {
    const [rows] = await db.promise().query(query);
    res.json(rows);
  } catch (error) {
    console.error("ERRO NO DB:", error);
    res.status(500).json({ error: "Erro no servidor" });
  }
});

router.get("/destaques", (req, res) => {
  const SQL =
    "select carro.* from anuncio inner join carro on anuncio.id_carro = carro.id_Carro order by id_anuncio desc limit 10";

  db.query(SQL, (err, result) =>
    err ? console.log("erro no /destaques") : res.send(result)
  );
});

router.get("/marcas", (req, res) => {
  const SQL = "SELECT brand_name from marca";

  db.query(SQL, (err, result) => (err ? console.log(err) : res.send(result)));
});

module.exports = router;
