import { useState, useEffect } from 'react'

function useMealPlanner(foodData, dailyKcal) {
  const [mealPlan, setMealPlan] = useState([])
  const [totalKcal, setTotalKcal] = useState(0)

  useEffect(() => {
    const sortedFoodData = [...foodData].sort(
      (a, b) => b['Năng lượng (Kcal/ 100g)'] - a['Năng lượng (Kcal/ 100g)']
    )

    const breakfastFoods = sortedFoodData.filter((food) => food['Bữa sáng'] === 1)
    const lunchFoods = sortedFoodData.filter((food) => food['Bữa trưa'] === 1)
    const dinnerFoods = sortedFoodData.filter((food) => food['Bữa tối'] === 1)

    const breakfast = breakfastFoods[Math.floor(Math.random() * breakfastFoods.length)]
    const lunch = lunchFoods[Math.floor(Math.random() * lunchFoods.length)]
    const dinner = dinnerFoods[Math.floor(Math.random() * dinnerFoods.length)]

    let remainingKcal =
      dailyKcal -
      breakfast['Năng lượng (Kcal/ 100g)'] -
      lunch['Năng lượng (Kcal/ 100g)'] -
      dinner['Năng lượng (Kcal/ 100g)']
    let snack = []
    let kcalSum = 0

    const snackFoods = sortedFoodData.filter((food) => food['Ăn vặt'] === 1)
    for (let i = 0; i < snackFoods.length; i++) {
      const food = snackFoods[i]
      if (kcalSum + food['Năng lượng (Kcal/ 100g)'] <= remainingKcal + 50) {
        snack.push({
          name: food['Thức Ăn'],
          kcal: food['Năng lượng (Kcal/ 100g)'],
        })
        kcalSum += food['Năng lượng (Kcal/ 100g)']
      } else {
        break
      }
    }

    // Set the meal plan and total kcal
    setMealPlan({
      breakfast: breakfast['Thức Ăn'],
      lunch: lunch['Thức Ăn'],
      dinner: dinner['Thức Ăn'],
      snacks: snack,
    })
    setTotalKcal(
      breakfast['Năng lượng (Kcal/ 100g)'] +
      lunch['Năng lượng (Kcal/ 100g)'] +
      dinner['Năng lượng (Kcal/ 100g)'] +
      kcalSum
    )
  }, [foodData, dailyKcal])

  return { mealPlan, totalKcal }
}

export default useMealPlanner
