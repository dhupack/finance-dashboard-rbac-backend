import Record from "../models/record.model.js";

export const getSummary = async (req, res) => {
  try {
    // Aggregate total income and expenses
    const totals = await Record.aggregate([
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" },
        },
      },
    ]);

    let totalIncome = 0;
    let totalExpenses = 0;
    totals.forEach((item) => {
      if (item._id === "income") totalIncome = item.total;
      if (item._id === "expense") totalExpenses = item.total;
    });
    const netBalance = totalIncome - totalExpenses;

    // Aggregate category-wise totals
    const categoryBreakdown = await Record.aggregate([
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          total: 1,
        },
      },
    ]);

    res.json({
      totalIncome,
      totalExpenses,
      netBalance,
      categoryBreakdown,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
