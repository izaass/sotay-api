/**
 * github
 */
import { columnModel } from "~/models/columnModel";
import { boardModel } from "~/models/boardModel";
import { cardModel } from "~/models/cardModel";
import ApiError from "~/utils/ApiError";
import { StatusCodes } from "http-status-codes";

const createNew = async (reqBody) => {
  try {
    const newColumn = { ...reqBody };
    const createdColumn = await columnModel.createNew(newColumn);
    const getNewColumn = await columnModel.findOneById(
      createdColumn.insertedId
    );
    if (getNewColumn) {
      //xu ly data truoc khi tra ve
      getNewColumn.cards = [];
      //cap nhat lai mang orderIds
      await boardModel.pushColOrderIds(getNewColumn);
    }
    return getNewColumn;
  } catch (error) {
    throw error;
  }
};

const update = async (columnId, reqBody) => {
  try {
    const updateData = { ...reqBody, updatedAt: Date.now() };
    const upadtedColumn = await columnModel.update(columnId, updateData);

    return upadtedColumn;
  } catch (error) {
    throw error;
  }
};

const deleteItem = async (columnId) => {
  try {
    //* lay ra column de cap nhat lai mang columnOrderIds
    const targetCol = await columnModel.findOneById(columnId);
    if (!targetCol) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Column Not Found!");
    }
    //todo: xoa col
    await columnModel.deleteOneById(columnId);
    //todo: xoa toan bo card thuoc col tren
    await cardModel.deleteAllByColId(columnId);

    //todo: cap nhat lai mang columnOrderIds
    await boardModel.pullColOrderIds(targetCol);
    return { deleteResult: "Colum and Cards are Delete successfully" };
  } catch (error) {
    throw error;
  }
};

export const columnService = {
  createNew,
  update,
  deleteItem,
};
