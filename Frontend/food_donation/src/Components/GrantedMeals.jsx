import React from 'react'
import MealCard from './MealCard'

function GrantedMeals({ grantedMeals }) {
    return (
        <section className='w-full max-w-5xl bg-white border-[1px] border-zinc-100 rounded-xl shadow-lg mt-4'>
            <h1 className="text-xl font-bold text-green-700 p-4 border-b">Granted Meals</h1>
            {grantedMeals.map((meal, i) => (
                <MealCard key={i} meal={meal} />
            ))}
        </section>
    )
}

export default GrantedMeals
