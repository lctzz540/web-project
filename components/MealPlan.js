import React from 'react'

function MealPlan({ mealPlan }) {
  return (
    <div className="container mx-auto my-8 px-4">
      <h2 className="mb-4 text-2xl font-bold">Meal Plan</h2>
      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="mb-8 w-full md:w-1/3">
          <h3 className="mb-2 text-lg font-semibold">Breakfast</h3>
          <p>{mealPlan.breakfast}</p>
        </div>
        <div className="mb-8 w-full md:w-1/3">
          <h3 className="mb-2 text-lg font-semibold">Lunch</h3>
          <p>{mealPlan.lunch}</p>
        </div>
        <div className="mb-8 w-full md:w-1/3">
          <h3 className="mb-2 text-lg font-semibold">Dinner</h3>
          <p>{mealPlan.dinner}</p>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="mb-2 text-lg font-semibold">Snacks</h3>
        <ul>
          {mealPlan.snacks &&
            mealPlan.snacks.map((snack, index) => <li key={index}>{snack.name}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default MealPlan
