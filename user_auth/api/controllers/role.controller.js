import Role from "../models/Role.js";

export const createRole = async (req, res, next) => {
    try {
        if (req.body.role && req.body.role !== '') {
            const newRole = new Role(req.body);
            await newRole.save();
            return res.send("Role Created");
        } else {
            return res.status(400).send('Bad Request')
        }
    }
    catch (error) {
        return res.status(500).send("Internal Server Error")
    }
}

export const updateRole = async (req, res, next) => {
    try {
        const role = await Role.findById({
            _id: req.params.id
        })
        if (role) {
            const newData = await Role.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            )
            return res.status(200).send("Role updated !")
        } else {
            return res.status(404).send("Role not foumd !")
        }

    } catch (error) {

    }
}

export const getAllRoles = async (req, res, next) => {
    try {
        const roles = await Role.find({});
        if (roles) {
            return res.status(200).send(roles);
        }
    } catch (error) {
        res.status(500).send("Internal Server Error !")
    }
}

export const deleteRole = async (req, res, next) => {
    try {
        const roleId = req.params.id;
        const role = await Role.findById({ _id: roleId });
        if (role) {
            const deleteRole = await Role.findByIdAndDelete(role)
            return res.status(200).send("Role Deleted !")
        } else {
            return res.status(404).send("Role not foumd !")
        }
    } catch (error) {
        return res.status(500).send("Internal Server Error !")

    }
}