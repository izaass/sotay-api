/* eslint-disable no-console */
/**
 * note
 */
import Joi from "joi";
import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "~/utils/validators";
const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    boardId: Joi.string()
      .required()
      .pattern(OBJECT_ID_RULE)
      .message(OBJECT_ID_RULE_MESSAGE),
    title: Joi.string().required().min(3).max(50).trim().strict(),
  });
  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    next(
      new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message)
    );
  }
};

const update = async (req, res, next) => {
  //luu y khong dung require trong truong hop update
  const correctCondition = Joi.object({
    // Nếu cần làm chức năng di chuyen col sang board khac thi moi validate
    // boardId: Joi.string()
    //   .pattern(OBJECT_ID_RULE)
    //   .message(OBJECT_ID_RULE_MESSAGE),
    title: Joi.string().min(3).max(50).trim().strict(),
    cardOrderIds: Joi.array().items(
      Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
    ),
  });
  try {
    //set abortEarly de clg ra tat ca loi
    //cho phep cac truong chua dinh nghia
    await correctCondition.validateAsync(req.body, {
      abortEarly: false,
      allowUnknown: true,
    });
    //validate hop le thi cho request sang controller
    next();
  } catch (error) {
    next(
      new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message)
    );
  }
};

const deleteItem = async (req, res, next) => {
  const correctCondition = Joi.object({
    id: Joi.string()
      .required()
      .pattern(OBJECT_ID_RULE)
      .message(OBJECT_ID_RULE_MESSAGE),
  });
  try {
    await correctCondition.validateAsync(req.params);
    next();
  } catch (error) {
    next(
      new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message)
    );
  }
};

export const columnValidation = {
  createNew,
  update,
  deleteItem,
};
