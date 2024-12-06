import React, { useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { AiOutlinePlus } from 'react-icons/ai';

const ExpenseTracker1 = () => {
  const [goals, setGoals] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [newGoal, setNewGoal] = useState({ name: '', target: '', deadline: '' });
  const [newBudget, setNewBudget] = useState({ name: '', amount: '' });

  // Add new goal
  const addGoal = () => {
    if (newGoal.name && newGoal.target && newGoal.deadline) {
      setGoals([...goals, { ...newGoal, progress: 0 }]);
      setNewGoal({ name: '', target: '', deadline: '' });
    }
  };

  // Add new budget
  const addBudget = () => {
    if (newBudget.name && newBudget.amount) {
      setBudgets([...budgets, { ...newBudget, remaining: newBudget.amount }]);
      setNewBudget({ name: '', amount: '' });
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>TrackMe: Goals & Budgets</h1>

      {/* Goal Setter Section */}
      <section>
        <h2>Goal Setter</h2>
        <div>
          <input
            type="text"
            placeholder="Goal Name"
            value={newGoal.name}
            onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Target Amount"
            value={newGoal.target}
            onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
          />
          <input
            type="date"
            value={newGoal.deadline}
            onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
          />
          <button onClick={addGoal}>
            <AiOutlinePlus /> Add Goal
          </button>
        </div>
        <div>
          {goals.map((goal, index) => (
            <div key={index} style={{ margin: '10px 0' }}>
              <h4>{goal.name}</h4>
              <p>Target: ₹{goal.target} | Deadline: {goal.deadline}</p>
              <CircularProgressbar
                value={(goal.progress / goal.target) * 100}
                text={`${Math.round((goal.progress / goal.target) * 100)}%`}
                styles={buildStyles({ pathColor: '#4caf50', textColor: '#000' })}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Budget Maker Section */}
      <section>
        <h2>Budget Maker</h2>
        <div>
          <input
            type="text"
            placeholder="Budget Name"
            value={newBudget.name}
            onChange={(e) => setNewBudget({ ...newBudget, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Budget Amount"
            value={newBudget.amount}
            onChange={(e) => setNewBudget({ ...newBudget, amount: e.target.value })}
          />
          <button onClick={addBudget}>
            <AiOutlinePlus /> Add Budget
          </button>
        </div>
        <div>
          {budgets.map((budget, index) => (
            <div key={index} style={{ margin: '10px 0' }}>
              <h4>{budget.name}</h4>
              <p>Budget: ₹{budget.amount} | Remaining: ₹{budget.remaining}</p>
              <progress
                value={budget.remaining}
                max={budget.amount}
                style={{ width: '100%' }}
              ></progress>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ExpenseTracker1;
