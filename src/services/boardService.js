/* eslint-disable no-useless-catch */
/**
 * github
 */
import { slugify } from "~/utils/formatters";
import { boardModel } from "~/models/boardModel";
import { StatusCodes } from "http-status-codes";
import { cloneDeep } from "lodash";
import ApiError from "~/utils/ApiError";
import { columnModel } from "~/models/columnModel";
import { cardModel } from "~/models/cardModel";
const createNew = async (reqBody) => {
  try {
    //xu ly logic du lieu
    const newBoard = { ...reqBody, slug: slugify(reqBody.title) };

    //goi toi model de xu ly luu newboard vao database
    const createdBoard = await boardModel.createNew(newBoard);
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId);

    //lam notification

    //luon phai co return ko se crash
    return getNewBoard;
  } catch (error) {
    throw error;
  }
};

const getDetails = async (boardId) => {
  try {
    const board = await boardModel.getDetails(boardId);
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Board not found");
    }
    const resBoard = cloneDeep(board);
    //dua card ve dung column
    resBoard.columns.forEach((column) => {
      column.cards = resBoard.cards.filter(
        (card) => card.columnId.equals(column._id)
        //card.columnId.toString() === column._id.toString()
      );
    });
    //xoa mang card khoi board ban dau
    delete resBoard.cards;
    //luon phai co return ko se crash
    return resBoard;
  } catch (error) {
    throw error;
  }
};

const update = async (boardId, reqBody) => {
  try {
    const updateData = { ...reqBody, updatedAt: Date.now() };
    const upadtedBoard = await boardModel.update(boardId, updateData);

    return upadtedBoard;
  } catch (error) {
    throw error;
  }
};

const moveCardToDiffCol = async (reqBody) => {
  try {
    // b1: cap nhat mang CardOrderIds cua col ban dau cua no (xoa card ra khoi mang)
    await columnModel.update(reqBody.prevColumnId, {
      cardOrderIds: reqBody.prevCardOrderIds,
      updatedAt: Date.now(),
    });
    // b2: cap nhat mang cardOrderIds của col tiep theo (them _id của card vao mang)
    await columnModel.update(reqBody.nextColumnId, {
      cardOrderIds: reqBody.nextCardOrderIds,
      updatedAt: Date.now(),
    });
    // b3: Cap nhat lại truong column id mới của card da xoa
    await cardModel.update(reqBody.currentCardId, {
      columnId: reqBody.nextColumnId,
    });
    return { updateResult: "Successfully !!" };
  } catch (error) {
    throw error;
  }
};
export const boardService = {
  createNew,
  getDetails,
  update,
  moveCardToDiffCol,
};
