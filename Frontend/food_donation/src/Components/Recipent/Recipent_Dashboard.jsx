import React, { useState } from 'react'
import Header from '../Header'
import SideBar from './SideBar'
import StatsSection from '../StatsSection'
import ActiveMealsSection from '../ActiveMealsSection'
import userPic from '/src/assets/images/user_pic.jpg';



function Recipent_Dashboard() {

    const [activeMeals, setActiveMeals] = useState([
        {
            userPhoto: userPic,
            userName: 'Ali Khan',
            mealTitle: 'Lunch Pack',
            mealCount: 3,
            appliedOn: '20 Apr 2025',
            totalApplicants: 5,
            description: 'Freshly cooked rice and curry for lunch.',
            location: 'Sector 11, Karachi',
            postedOn: '19 Apr 2025'
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
            postedOn: '20 Apr 2025'
        }
    ])

    const [grantedMeals, setGrantedMeals] = useState([
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
            granted: '20 Apr 2025'
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
            granted: '20 Apr 2025'
        }
    ])



    return (
        <div className='flex'>
            <SideBar />
            <div className='w-[80%] absolute right-0 bg-gray-200'>
                <Header />
                <div className='px-4'>
                    <StatsSection />
                    <ActiveMealsSection activeMeals={activeMeals} title={'Active Meals'} />
                    <ActiveMealsSection activeMeals={grantedMeals} title={'Granted Meals'} />
                </div>
            </div>
        </div>
    )
}

export default Recipent_Dashboard