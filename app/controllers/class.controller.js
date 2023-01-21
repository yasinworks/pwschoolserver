import Class from "../models/class.model.js";

// CREATE CLASS
export const createClass = async (req, res) => {
    try {
        const {name} = req.body;
        const isUsed = await Class.findOne({name})

        if (isUsed) {
            return res.status(402).json('Class already exist')
        }

        const newClass = new Class({
            name
        })

        await newClass.save();
        res.json({newClass, message:"Class successfully created"});

    } catch (err) {
        res.status(402).json(err)
    }
}

// DELETE CLASS
export const deleteClass = async (req, res) => {
    try {
        const {name} = req.query;
        const doesExist = await Class.findOne({name})

        if (!doesExist) {
            return res.status(403).json({message: "Class does not exist"})
        }

        await Class.findByIdAndDelete( doesExist._id)

        res.json({message: "Deleted successfully"})

    } catch (err) {
        res.status(403).json(err)
    }
}

// GET ALL CLASSES
export const getAll = async (req, res) => {
    try {
        const classes = await Class.find();

        res.json(classes)
    } catch (err) {
        res.json({message: err})
    }
}
