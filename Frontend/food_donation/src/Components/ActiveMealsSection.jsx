import React from 'react'
import MealCard from './MealCard'

const ActiveMealsSection = ({ activeMeals, title: name }) => {
    return (
        // <section className='w-full p-6 shadow-2xl'>
        //     <h2 className='text-2xl font-bold text-green-700 mb-4'>Active Meal Applications</h2>
        //     <div className=''>
        //         {activeMeals.map((meal, idx) => (
        //             <MealCard key={idx} meal={meal} />
        //         ))}
        //     </div>
        // </section>
        <section className="w-full max-w-5xl mx-auto bg-white border-[1px] border-zinc-200 rounded-xl shadow-lg mt-4">
            <h2 className="text-xl font-bold text-green-700 p-4 border-b">{name}</h2>
            {activeMeals.map((meal, i) => (
                <MealCard key={i} meal={meal} />
            ))}
        </section>

    )
}

export default ActiveMealsSection
