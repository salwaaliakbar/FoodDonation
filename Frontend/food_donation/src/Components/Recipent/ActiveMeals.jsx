import { useState, useEffect } from 'react'
import React from 'react'
import SideBar from './SideBar'
import Header from '../Header'
import Loader from '../Loader'
import AppliedMealPostCard from './AppliedMealPostCard'

const ActiveMeals = () => {
    const [loading, setLoading] = useState(true);
    const [mealPosts, setMealPosts] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setMealPosts([
                {
                    id: 1,
                    donorPic: '/src/assets/images/user_pic.jpg',
                    donorName: 'Alice Johnson',
                    mealTitle: 'Fresh Homemade Pasta',
                    mealDescription: 'Delicious handmade pasta with a rich tomato sauce, suitable for a family.',
                    personCount: 4,
                    location: 'New York, NY',
                    postedAt: '2 hours ago',
                    applicants: 4,
                    applied: true,
                    status: 'Active',
                    appliedAt: '20 May',
                    appliedDetails: [
                        { name: 'John Doe', count: 1 },
                        { name: 'Emily Brown', count: 2 },
                        { name: 'Chris Green', count: 1 },
                        { name: 'Myname', count: 2 }
                    ]
                },
                {
                    id: 2,
                    donorPic: '/src/assets/images/user_pic.jpg',
                    donorName: 'Mark Smith',
                    mealTitle: 'Vegan Buddha Bowls',
                    mealDescription: 'Nutritious vegan bowls packed with fresh veggies and grains.',
                    personCount: 2,
                    location: 'San Francisco, CA',
                    postedAt: '5 hours ago',
                    applicants: 3,
                    applied: true,
                    status: 'Active',
                    appliedAt: '20 May',
                    appliedDetails: [
                        { name: 'Anna Lee', count: 1 },
                        { name: 'David White', count: 1 },
                        { name: 'Myname', count: 2 }
                    ]
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
                <h1 className="text-3xl font-bold mb-8 text-green-600 text-center m-4">Active Meals</h1>

                {loading ? (
                    <div className="w-full flex min-h-[70vh] justify-center items-center py-16">
                        <Loader />
                    </div>
                ) : (
                    <div className="w-[94%] min-h-[70vh] m-auto">
                        {mealPosts.map((post, index) => (
                            <AppliedMealPostCard
                                key={post.id}
                                mealData={post}
                                index={index}
                                setMealPosts={setMealPosts}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ActiveMeals
