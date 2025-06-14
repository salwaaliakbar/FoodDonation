import React from 'react'
import MealCard from '../pages/Recipent/MealCard'

const ActiveMealsSection = ({ activeMeals, title: name }) => {
    return (
        <section className="w-full mx-auto bg-white border-[1px] border-zinc-200 rounded-xl shadow-lg mt-4 mb-4">
            <h2 className="text-xl font-bold text-green-700 p-4 border-b">{name}</h2>
            {activeMeals.map((meal, i) => (
                <MealCard key={i} meal={meal} />
            ))}
        </section>
    )
}

export default ActiveMealsSection
