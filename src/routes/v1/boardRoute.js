/**
 * github
 */
import express from "express";
import { StatusCodes } from "http-status-codes";
import { boardValidation } from "~/validations/boardValidation";
import { boardController } from "~/controllers/boardController";
const Router = express.Router();

Router.route("/")
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: "GET: API get list boards." });
  })
  .post(boardValidation.createNew, boardController.createNew);

Router.route("/:id")
  .get(boardController.getDetails)
  .put(boardValidation.update, boardController.update); //update board;

//api ho tro di chuyen card trong board
Router.route("/supports/moving_card").put(
  boardValidation.moveCardToDiffCol,
  boardController.moveCardToDiffCol
);
export const boardRoute = Router;
