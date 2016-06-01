import express from "express";
import path from "path";

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.resolve(__dirname, "public")));

app.get("*", (req, res) => {
  res.render("index");
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('listening...' + port);
});
