/**
 * github
 */
import { StatusCodes } from "http-status-codes";
// import ApiError from "~/utils/ApiError";
import { columnService } from "~/services/columnService";

const createNew = async (req, res, next) => {
  try {
    const createdColumn = await columnService.createNew(req.body);
    res.status(StatusCodes.CREATED).json(createdColumn);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const columnId = req.params.id;

    const updatedColumn = await columnService.update(columnId, req.body);

    //co kq thi tra ve client
    res.status(StatusCodes.OK).json(updatedColumn);
  } catch (error) {
    next(error);
  }
};

const deleteItem = async (req, res, next) => {
  try {
    const columnId = req.params.id;

    const result = await columnService.deleteItem(columnId);
    console.log("Received id:", req.params.id);
    //co kq thi tra ve client
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

export const columnController = {
  createNew,
  update,
  deleteItem,
};
