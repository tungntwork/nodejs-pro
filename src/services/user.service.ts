import { prisma } from "config/client";
import getConnection from "../config/database"
import { PrismaClient, Prisma } from "@prisma/client";
import { ACCOUNT_TYPE } from "config/constant";
import bcrypt from 'bcrypt';
const saltRounds = 10;

const hashPassword = async (plainText: string) => {
    return await bcrypt.hash(plainText, saltRounds);
}
const handleCreateUser = async (
    fullName: string,
    email: string,
    address: string,
    phone: string,
    avatar: string,
    role: string) => {

    const defaultPassword = await hashPassword("123456");
    const newUser = await prisma.user.create({
        data: {
            fullName: fullName,
            username: email,
            address: address,
            password: defaultPassword,
            accountType: ACCOUNT_TYPE.SYSTEM,
            avatar: avatar,
            phone: phone,
            roleId: +role
        }
    })
    return newUser;
}

const handleDeleteUser = async (id: string) => {
    const result = await prisma.user.delete({
        where: { id: +id }
    })
    return result;
}

const getAllUsers = async () => {
    const users = await prisma.user.findMany();
    return users;
}

const getAllRoles = async () => {
    const roles = await prisma.role.findMany();
    return roles;
}

const getUserById = async (id: string) => {
    const users = await prisma.user.findUnique({
        where: {
            id: +id,
        },
    });
    return users;
}

const updateUserbyId = async (
    id: string,
    fullName: string, phone: string,
    role: string,
    address: string,
    avatar: string
) => {
    const updatedUser = await prisma.user.update({
        where: { id: +id },
        data: {
            fullName: fullName,
            phone: phone,
            roleId: +role,
            address: address,
            ...(avatar !== undefined && { avatar: avatar })
        }
    })
}

export { handleCreateUser, getAllUsers, handleDeleteUser, getUserById, updateUserbyId, getAllRoles, hashPassword }