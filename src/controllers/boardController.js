/**
 * github
 */
import { StatusCodes } from "http-status-codes";
// import ApiError from "~/utils/ApiError";
import { boardService } from "~/services/boardService";
const createNew = async (req, res, next) => {
  try {
    // console.log("req.body:", req.body);
    // console.log("req.params:", req.params);
    // console.log("req.query:", req.query);

    //dieu hieu sang Service
    const createdBoard = await boardService.createNew(req.body);

    //co kq thi tra ve client
    res.status(StatusCodes.CREATED).json(createdBoard);
  } catch (error) {
    next(error);
  }
};
const getDetails = async (req, res, next) => {
  try {
    // console.log("req.params:", req.params);
    const boardId = req.params.id;

    const board = await boardService.getDetails(boardId);

    //co kq thi tra ve client
    res.status(StatusCodes.OK).json(board);
  } catch (error) {
    next(error);
  }
};
export const boardController = {
  createNew,
  getDetails,
};
