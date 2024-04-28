import slugify from "slugify";
import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { AppError } from "../utils/AppError.js";
import { ApiFeaturs } from "../utils/apiFeaturs.js";



export const createOne = (model, document) => {
    return catchAsyncError(async (req, res, next) => {
        if (document == 'category') {
            req.body.img = req.file.filename;
        } else {
            req.body.logo = req.file.filename;
        }

        req.body.slug = slugify(req.body.name);
        let result = new model(req.body);
        await result.save();

        res.json({ message: 'success', result });
    })
}
export const getAll = (model) => {
    return catchAsyncError(async (req, res, next) => {

        let apiFeaturs = new ApiFeaturs(model.find({}), req.query)
            .paginate().filter().sort().search().select();

        let result = await apiFeaturs.mongooseQuery;
        res.json({ message: 'success', page: ApiFeaturs.page, result });
    })
}
export const getOne = (model, document) => {
    return catchAsyncError(async (req, res, next) => {
        let { id } = req.params;
        let result = await model.findById(id);
        !result && next(new AppError(`${document} not found`, 404));
        result && res.json({ message: 'success', result });
    })
}
export const updateOne = (model, document) => {
    return catchAsyncError(async (req, res, next) => {
        let { id } = req.params;
        if (document == 'category') {
            req.body.img = req.file.filename;
        } else {
            req.body.logo = req.file.filename;
        }
        req.body.slug = slugify(req.body.name);
        let result = await model.findByIdAndUpdate(id, req.body, { new: true });
        !result && next(new AppError(`${document} not found`, 404));
        result && res.json({ message: 'success', result });
    })
}
export const deleteOne = (model, document) => {
    return catchAsyncError(async (req, res, next) => {
        let { id } = req.params;
        let result = await model.findByIdAndDelete(id);

        if (!result) return next(new AppError(`${document} not found`, 404));
        res.json({ message: 'success', result });
    })
}