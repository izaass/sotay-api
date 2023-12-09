/**
 * github
 */
import express from "express";
import { StatusCodes } from "http-status-codes";
import { boardRoute } from "~/routes/v1/boardRoute";
import { columnRoute } from "~/routes/v1/columnRoute";
import { cardRoute } from "~/routes/v1/cardRoute";
const Router = express.Router();

//check apis v1
Router.get("/status", (req, res) => {
  res.status(StatusCodes.OK).json({ message: "APIs V1 ready to use." });
});
//board API
Router.use("/boards", boardRoute);
//columns API
Router.use("/columns", columnRoute);
//cards API
Router.use("/cards", cardRoute);
export const APIs_V1 = Router;
