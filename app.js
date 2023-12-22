const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config({ path: "./config.env" });
const mongoose = require("mongoose");
const ClientModel = require("./models/ProjectModel");

const app = express();

app.use(express.json());
app.use(cors());

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log("DB Connect Sucessfully");
});

app.listen(4000, () => {
  console.log(`APP is running on PORT ${4000}`);
});

app.post("/v1/createproject", async (req, res) => {
  try {
    const ClientPro = await ClientModel.create(req.body);
    const data = await ClientPro.save();
    res.send(data);
  } catch (err) {
    res.status(404).json({
      status: "Failed",
      message: err,
    });
  }
});

app.get("/v1/getclient", async (req, res) => {
  try {
    const data = await ClientModel.find();
    res.status(200).json({
      status: "Success",
      data,
    });
  } catch (err) {
    res.status(404).json({
      status: "Failed",
      message: err,
    });
  }
});

app.delete("/v1/deleteclient/:id", async (req, res) => {
  try {
    const result = await ClientModel.deleteOne({ _id: req.params.id });
    res.send(result);
  } catch (err) {
    res.status(404).json({
      status: "Failed",
      message: err,
    });
  }
});

app.put("/v1/editclient/:id", async (req, res) => {
  try {
    const result = await ClientModel.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.send(result);
  } catch (err) {
    res.status(404).json({
      status: "Failed",
      message: err,
    });
  }
});

app.get("/v1/getoneclient/:id", async (req, res) => {
  try {
    const data = await ClientModel.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    res.status(404).json({
      status: "Failed",
      message: err,
    });
  }
});
