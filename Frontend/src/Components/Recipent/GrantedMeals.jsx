import React, { useState, useEffect } from 'react'
import SideBar from './SideBar'
import Header from './Header'
import MealCard from './MealCard'
import userPic from '/src/assets/images/user_pic.jpg';
import Loader from '../Loader';


const GrantedMeals = () => {
    const [grantedMeals, setGrantedMeals] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setTimeout(() => {
            setGrantedMeals([
                {
                    userPhoto: userPic,
                    userName: 'Ali Khan',
                    mealTitle: 'Lunch Pack',
                    mealCount: 3,
                    appliedOn: '20 Apr 2025',
                    totalApplicants: 5,
                    description: 'Freshly cooked rice and curry for lunch.',
                    location: 'Sector 11, Karachi',
                    postedOn: '19 Apr 2025',
                    granted: '20 Apr 2025',
                    appliedFor: 3,
                    acceptedFor: 1
                },
                {
                    userPhoto: userPic,
                    userName: 'Fatima Noor',
                    mealTitle: 'Dinner Boxes',
                    mealCount: 4,
                    appliedOn: '21 Apr 2025',
                    totalApplicants: 3,
                    description: 'Home-cooked meat and bread packs.',
                    location: 'Gulshan Block 5',
                    postedOn: '20 Apr 2025',
                    granted: '20 Apr 2025',
                    appliedFor: 3,
                    acceptedFor: 2
                }
            ]);
            setLoading(false);
        }, 1000);
    }, []);


    return (
        <div className='flex'>
            <SideBar />
            <div className='w-[80%] absolute right-0 bg-gray-200 min-h-[100vh]'>
                <Header />
                <h1 className="text-3xl font-bold mb-8 text-green-600 text-center m-4">Granted Meals</h1>
                {loading ? (
                    <div className="w-full flex min-h-[70vh] justify-center items-center py-16">
                        <Loader />
                    </div>
                ) : (
                    <section className="w-[95%] mx-auto bg-white border-[1px] border-zinc-200 rounded-xl shadow-lg mt-4 mb-4 ">
                        {grantedMeals.map((meal, i) => (
                            <MealCard key={i} meal={meal} />
                        ))}
                    </section>
                )}
            </div>
        </div>
    )
}

export default GrantedMeals
