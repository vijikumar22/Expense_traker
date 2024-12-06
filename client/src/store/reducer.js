/*import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categories: [],
    transaction: []
};

export const expenseSlice = createSlice({
    name: 'Expense',
    initialState,
    reducers: {
        getTransactions: (state) => {
            // get code
        },
        setBudgets: (state, action) => {
            state.budgets = action.payload;
        },
        setBudgetProgress: (state, action) => {
            state.budgetProgress = action.payload;
        }
    }
});

export const { getTransactions } = expenseSlice.actions;
export default expenseSlice.reducer;
*/
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categories: [],
    transactions: [],
    budgets: [],
    budgetProgress: [] // Add this to manage budget progress
};

export const expenseSlice = createSlice({
    name: 'Expense',
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        setTransactions: (state, action) => {
            state.transactions = action.payload;
        },
        setBudgets: (state, action) => {
            state.budgets = action.payload;
        },
        setBudgetProgress: (state, action) => { // Add this reducer
            state.budgetProgress = action.payload;
        }
    }
});

export const { setCategories, setTransactions, setBudgets, setBudgetProgress } = expenseSlice.actions; // Ensure all actions are exported

export default expenseSlice.reducer;
