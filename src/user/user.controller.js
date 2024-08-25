
import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { AppError } from "../utils/AppError.js";
import { ApiFeaturs } from "../utils/apiFeaturs.js";
import { userModel } from './../../database/models/user.model.js';

export const createUser = catchAsyncError(async (req, res, next) => {
    let user = await userModel.findOne({ email: req.body.email })
    if (user) return next(new AppError('email already exist', 409))
    if (req.file.filename) req.body.profilImg = req.file.filename;
    let result = new userModel(req.body);
    await result.save();

    res.json({ message: 'success', result });
})

export const getAllUser = catchAsyncError(async (req, res, next) => {

    let apiFeaturs = new ApiFeaturs(userModel.find({}), req.query)
        .paginate().filter().sort().search().select();

    let result = await apiFeaturs.mongooseQuery;

    res.status(200).json({
        status: 'success',
        page: ApiFeaturs.page,
        result: result.length,
        message: 'users founded successfully',
        data: result
    });
})
export const getUser = catchAsyncError(async (req, res, next) => {
    let { id } = req.params;
    let result = await userModel.findById(id);
    !result && next(new AppError('User not found', 404));
    result && res.status(200).json({
        status: 'success',
        message: 'User founded successfully',
        data: result
    });
})
export const updateUser = catchAsyncError(async (req, res, next) => {
    let { id } = req.params;
    req.body.profilImg = req.file.filename;
    let result = await userModel.findByIdAndUpdate(id, req.body, { new: true });
    !result && next(new AppError('User not found', 404));
    result && res.status(200).json({
        status: 'success',
        message: 'user updated successfully',
        data: result
    });
})
export const ChangeUserPassword = catchAsyncError(async (req, res, next) => {
    let { id } = req.params;
    req.body.PasswordChangeDate = Date.now();
    let result = await userModel.findByIdAndUpdate(id, req.body, { new: true });
    !result && next(new AppError('User not found', 404));
    result && res.status(200).json({
        status: 'success',
        message: 'user password updated successfully',
        data: result
    });
})
export const deleteUser = catchAsyncError(async (req, res, next) => {
    let { id } = req.params;
    let result = await userModel.findByIdAndDelete(id);

    if (!result) return next(new AppError('User not found', 404));
    res.status(200).json({
        status: 'success',
        message: 'user deleted successfully',
        data: result
    });
})
