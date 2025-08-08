import { Request, Response } from "express";

const getProductPage = async (req: Request, res: Response) => {
    return res.render("client/product/detail.js");
}

export {
    getProductPage
}