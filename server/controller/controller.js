const model = require('../models/model');

async function create_Categories(req, res) {
    try {
        const newCategory = new model.Categories({
            type: 'Savings',
            color: '#ffcd56'
        });

        const savedCategory = await newCategory.save();
        res.json(savedCategory);
    } catch (err) {
        res.status(400).json({ message: `Error while creating category: ${err}` });
    }
}

async function get_Categories(req, res) {
    try {
        const data = await model.Categories.find({});
        const filter = data.map(v => ({ type: v.type, color: v.color }));
        res.json(filter);
    } catch (err) {
        res.status(400).json({ message: `Error while fetching categories: ${err}` });
    }
}

async function create_Transaction(req, res) {
    if (!req.body) return res.status(400).json('Post HTTP Data not Provided');

    const { name, type, amount } = req.body;

    try {
        const newTransaction = new model.Transaction({
            name,
            type,
            amount,
            date: new Date()
        });

        const savedTransaction = await newTransaction.save();
        res.json(savedTransaction);
    } catch (err) {
        res.status(400).json({ message: `Error while creating transaction: ${err}` });
    }
}

async function get_Transaction(req, res) {
    try {
        const data = await model.Transaction.find({});
        res.json(data);
    } catch (err) {
        res.status(400).json({ message: `Error while fetching transactions: ${err}` });
    }
}

async function delete_Transaction(req, res) {
    if (!req.body) return res.status(400).json({ message: 'Request body not Found' });

    try {
        await model.Transaction.deleteOne(req.body);
        res.json('Record Deleted!');
    } catch (err) {
        res.status(400).json({ message: `Error while deleting transaction record: ${err}` });
    }
}

async function get_Labels(req, res) {
    try {
        const result = await model.Transaction.aggregate([
            {
                $lookup: {
                    from: 'categories',
                    localField: 'type',
                    foreignField: 'type',
                    as: 'categories_info'
                }
            },
            {
                $unwind: '$categories_info'
            }
        ]);


        const data = result.map(v => ({
            _id: v._id,
            name: v.name,
            type: v.type,
            amount: v.amount,
            color: v.categories_info.color,
            date: v.date
        }));

        res.json(data);
    } catch (error) {
        res.status(400).json({ message: 'Lookup Collection Error' });
    }
}
async function create_Budget(req, res) {
    try {
        const { budget_name, budget } = req.body;

        if (!budget_name || !budget) {
            return res.status(400).json({ message: 'Budget name and amount are required.' });
        }

        const newBudget = new model.Categories({
            type: budget_name,
            color: '#FF5733', // Default color or allow users to set it
        });

        await newBudget.save();

        res.status(201).json({
            message: 'Budget created successfully!',
            budget: newBudget,
        });
    } catch (err) {
        res.status(500).json({ message: `Error while creating budget: ${err}` });
    }
}
async function get_BudgetProgress(req, res) {
    try {
        const budgets = await model.Categories.find({});
        const transactions = await model.Transaction.aggregate([
            {
                $group: {
                    _id: '$type',
                    totalSavings: { $sum: '$amount' },
                },
            },
        ]);

        // Map budgets with their respective progress
        const progressData = budgets.map((budget) => {
            const matchingTransaction = transactions.find(
                (tx) => tx._id === budget.type
            );

            return {
                budget_name: budget.type,
                goal: budget.budget || 0, // Default to 0 if not set
                current: matchingTransaction?.totalSavings || 0,
                color: budget.color,
            };
        });

        res.status(200).json(progressData);
    } catch (err) {
        res.status(500).json({ message: `Error while fetching progress: ${err}` });
    }
}


module.exports = {
    create_Categories,
    get_Categories,
    create_Transaction,
    get_Transaction,
    delete_Transaction,
    get_Labels,
    create_Budget,
    get_BudgetProgress
};
