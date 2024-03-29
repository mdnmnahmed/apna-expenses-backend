const khataModel = require('../models/khataModel');

/**
 * callback function - Get all Account Data
 * @param {object} req 
 * @param {object} res 
 * 
 */
const getAllKhatas = async (req, res) => {
    try {
        const data = await khataModel.find({
            user: req.user
        });
        if (data.length > 0) {
            res.status(200).json({
                message: 'Khata Data Fetched',
                data: data
            });
        } else {
            res.status(404).json({
                message: 'No Khata Data'
            });
        }
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}


/**
 * callback function - Add new Transaction
 * @param {object} req 
 * @param {object} res 
 * 
 */
const addKhata = async (req, res) => {
    req.body.user = req.user;
    const newKhata = new khataModel(req.body);
    try {
        await newKhata.save();
        res.status(201).json({
            message: 'New Khata added successfully',
            data: newKhata
        });
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

/**
 * callback function - Get a Specific Expense's Data
 * @param {object} req 
 * @param {object} res 
 * 
 */
const getSpecificKhata = async (req, res) => {
    try {
        const specificExpense = await accountModel.findById(req.params.transaction_id);
        if (specificExpense !== null) {
            res.status(200).json({
                message: 'Fetched specific Expense data',
                data: specificExpense
            });
        } else {
            res.status(404).json({
                message: 'Expense not found'
            });
        }
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

/**
 * callback function - Delete a Specific Expense's data
 * @param {object} req 
 * @param {object} res 
 * 
 */
const deleteKhata = async (req, res) => {
    try {
        const deletedExpense = await accountModel.findByIdAndDelete({ _id: req.params.transaction_id });
        if (deletedExpense) {
            res.status(200).json({
                message: "Expense's data deleted",
                data: deletedExpense
            });
        } else {
            res.status(404).json({
                message: "Expense not Found"
            });
        }
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

/**
 * callback function - Update a Specific Expense's data
 * @param {object} req 
 * @param {object} res 
 * 
 */
const updateKhata = async (req, res) => {
    const { transaction_id: _id } = req.params; //Extracting transaction_id & giving a name _id at the same time
    const updateExpenseData = req.body;
    try {
        const updatedExpense = await accountModel.findByIdAndUpdate(_id, updateExpenseData, { new: true });
        if (updatedExpense !== null) {
            res.status(200).json({
                message: "Expense's data Updated",
                data: updatedExpense
            });
        } else {
            res.status(404).json({
                message: 'Expense not Found'
            });
        }
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

module.exports = { getAllKhatas, addKhata, getSpecificKhata, deleteKhata, updateKhata };