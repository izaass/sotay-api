/**
 * github
 */
import express from "express";
import { StatusCodes } from "http-status-codes";
import { boardRoute } from "~/routes/v1/boardRoute";
const Router = express.Router();

//check apis v1
Router.get("/status", (req, res) => {
  res.status(StatusCodes.OK).json({ message: "APIs V1 ready to use." });
});
//board API
Router.use("/boards", boardRoute);
export const APIs_V1 = Router;
