import { User } from "../model/user.js";

export class UsersController {
    constructor() {}

    async updateUser(req, res) {
        const { id } = req.params;

        try {
            // update user in our database
            await User.updateOne({ _id: id }, req.body);
            // get updated product to return
            const user = await User.findById(id);

            res.status(201).json(user);
        } catch (err) {
            console.log(err);
            res.status(400).json("Could'nt update user")
        }
    }

    async deleteUser(req, res) {
        const { id } = req.params;
      
        try {
            if (!id) {
                res.status(404).send("User by current id not found");
            }

            // delete user in database
            await User.deleteOne({ _id: id }).then(() => {
                res.status(201).json(`User with id: ${id} deleted`);
            });

        } catch (err) {
            console.log(err);
            res.status(400).json('Can not delete user')
        }
    }

    async getUsers(req, res) {
        const { page, limit } = req.query;
        try {
            const users = await User.find({  })
            // We multiply the "limit" variables by one just to make sure we pass a number and not a string
            .limit(limit * 1)
            // I don't think i need to explain the math here
            .skip((page - 1) * limit)
            // We sort the data by the date of their creation in descending order (user 1 instead of -1 to get ascending order)
            .sort({ createdAt: -1 })
         
            res.status(200).json(users);
        } catch (err) {
            console.log(err);
            res.status(400).json('Users Not found')
        }
    }

    async getUser(req, res) {
        const { id } = req.params;
        try {
            const user = await User.findBy(id);
         
            res.status(200).json(user);
        } catch (err) {
            console.log(err);
            res.status(400).json('Users Not found')
        }
    }
}