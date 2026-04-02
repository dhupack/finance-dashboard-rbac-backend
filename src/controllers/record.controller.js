export const updateRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, type, category, date, notes } = req.body;
    const record = await Record.findById(id);
    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }
    if (amount !== undefined) record.amount = amount;
    if (type !== undefined) record.type = type;
    if (category !== undefined) record.category = category;
    if (date !== undefined) record.date = date;
    if (notes !== undefined) record.notes = notes;
    await record.save();
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await Record.findById(id);
    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }
    await record.deleteOne();
    res.json({ message: "Record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getRecords = async (req, res) => {
  try {
    const { type, category, startDate, endDate, page = 1, limit = 10 } = req.query;
    const query = {};
    if (type) query.type = type;
    if (category) query.category = category;
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Record.countDocuments(query);
    const records = await Record.find(query)
      .sort({ date: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    res.json({
      records,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / parseInt(limit)),
      totalRecords: total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
import Record from "../models/record.model.js";

export const createRecord = async (req, res) => {
  try {
    const { amount, type, category, date, notes } = req.body;
    if (!amount || !type || !category) {
      return res.status(400).json({ message: "Amount, type, and category are required." });
    }
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const record = await Record.create({
      amount,
      type,
      category,
      date,
      notes,
      createdBy: userId,
    });
    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
