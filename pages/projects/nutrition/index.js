import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'
import { useEffect, useState } from 'react'
import foodData from '../../../data/food.json'
import useMealPlanner from '../../../hooks/useMealPlanner'

export default function Nutrition() {
  const [age, setAge] = useState('')
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [activityLevel, setActivityLevel] = useState(1.2)
  const [calories, setCalories] = useState('')
  const [bmi, setBmi] = useState()

  const calculateCalories = () => {
    const bmr = 10 * weight + 6.25 * height - 5 * age + 5
    const tdee = bmr * activityLevel
    setCalories(tdee.toFixed(0))
    setBmi(Math.round(weight / (height / 100) ** 2))
  }
  console.log(useMealPlanner(foodData.food, calories))
  return (
    <>
      <PageSEO title={`Projects - ${siteMetadata.author}`} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Nutrition App
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Fill the form below and click "Calculate" button
          </p>
        </div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            <div className="p-4">
              <div className="mb-4">
                <label className="mb-2 block font-medium" htmlFor="age">
                  Age
                </label>
                <input
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  type="number"
                  id="age"
                  value={age}
                  min={1}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="mb-2 block font-medium" htmlFor="weight">
                  Weight (in kg)
                </label>
                <input
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  type="number"
                  id="weight"
                  value={weight}
                  min={1}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="mb-2 block font-medium" htmlFor="height">
                  Height (in cm)
                </label>
                <input
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  type="number"
                  id="height"
                  min={1}
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="mb-2 block font-medium" htmlFor="activityLevel">
                  Activity Level
                </label>
                <select
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  id="activityLevel"
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(parseFloat(e.target.value))}
                >
                  <option value="1.2">Sedentary</option>
                  <option value="1.375">Lightly Active</option>
                  <option value="1.55">Moderately Active</option>
                  <option value="1.725">Very Active</option>
                  <option value="1.9">Extremely Active</option>
                </select>
              </div>
              <div className="mb-4">
                <button
                  className="rounded bg-indigo-500 py-2 px-4 font-bold text-white hover:bg-indigo-700"
                  onClick={calculateCalories}
                >
                  Calculate Calories
                </button>
              </div>
              {calories && (
                <div className="text-lg font-medium text-indigo-700">
                  <div>Your BMI: {bmi}</div> Daily Calorie Needs: {calories} kcal
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
