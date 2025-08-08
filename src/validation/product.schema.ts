import { z } from "zod";

export const ProductSchema = z.object({
    name: z.string().trim().min(1, { message: "Tên không được để trống" }),
    price: z.string()
        .transform((val) => (val === "" ? 0 : Number(val)))
        .refine((num) => num > 0, {
            message: "Số tiền tối thiểu là 1",
        }),
    detailDedsc: z.string().trim().min(1, { message: "detailDesc không được để trống" }),
    shortDesc: z.string().trim().min(1, { message: "shortDesc không được để trống" }),
    quantity: z.string()
        .transform((val) => (val === "" ? 0 : Number(val)))
        .refine((num) => num > 0, {
            message: "Số lượng tối thiểu là 1",
        }),
    factory: z.string().trim().min(1, { message: "Factory không được để trống" }),
    target: z.string().trim().min(1, { message: "Target không được để trống" }),
});

export type TProductSchema = z.infer<typeof ProductSchema>;