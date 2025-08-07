import { Request, Response } from "express";
import { getAllUsers, getUserById, handleCreateUser, handleDeleteUser, updateUserbyId } from "services/user.service";

const getHomePage = async (req: Request, res: Response) => {
    const users = await getAllUsers();

    return res.render("home", {
        users: users
    });
}

const getCreateUserPage = (req: Request, res: Response) => {
    return res.render("create.user.ejs");
}

const postCreateUser = async (req: Request, res: Response) => {
    // object destructuring
    const { fullName, email, address } = req.body;

    // handle create user
    const a = await handleCreateUser(fullName, email, address);
    return res.redirect("/");
}

const postDeleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    await handleDeleteUser(id);
    return res.redirect("/");
}

const getViewUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    // get user by id
    const user = await getUserById(id);

    return res.render("view-user.ejs", {
        id: id,
        user: user
    })
}

const postUpdateUser = async (req: Request, res: Response) => {
    const { id, email, address, fullName } = req.body;
    // update user by id
    await updateUserbyId(id, email, address, fullName);
    return res.redirect("/");
}

export { getHomePage, getCreateUserPage, postCreateUser, postDeleteUser, getViewUser, postUpdateUser };