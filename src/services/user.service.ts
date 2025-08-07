import { prisma } from "config/client";
import getConnection from "../config/database"
import { PrismaClient, Prisma } from "@prisma/client";

const handleCreateUser = async (
    fullName: string,
    email: string,
    address: string) => {

    const newUser = await prisma.user.create({
        data: {
            name: fullName,
            email: email,
            address: address
        }
    })
    return newUser;
}

const handleDeleteUser = async (id: string) => {
    try {
        const connection = await getConnection();
        const sql = 'DELETE FROM `users` WHERE `id` = ? ';
        const values = [id];

        const [result, fields] = await connection.execute(sql, values);

        return result
    } catch (err) {
        console.log(err);
        return [];
    }
}

const getAllUsers = async () => {
    const users = await prisma.user.findMany();
    return users;
}

const getUserById = async (id: string) => {
    try {
        const connection = await getConnection();
        const sql = 'SELECT * FROM `user` WHERE `id` = ? ';
        const values = [id];

        const [result, fields] = await connection.execute(sql, values);

        return result
    } catch (err) {
        console.log(err);
        return [];
    }
}

const updateUserbyId = async (id: string, email: string, address: string, fullName: string) => {
    const updatedUser = await prisma.user.update({
        where: { id: +id },
        data: {
            name: fullName,
            email: email,
            address: address
        }
    })
}

export { handleCreateUser, getAllUsers, handleDeleteUser, getUserById, updateUserbyId }