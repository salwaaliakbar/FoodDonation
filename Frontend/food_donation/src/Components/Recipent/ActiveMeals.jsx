import { useState, useEffect } from 'react'
import React from 'react'
import SideBar from './SideBar'
import Header from './Header'
import Loader from '../Loader'
import AppliedMealPostCard from './AppliedMealPostCard'
import { useData } from '../ContextAPIs/UserContext'

const ActiveMeals = () => {
    const [loading, setLoading] = useState(true);
    const [mealPosts, setMealPosts] = useState();
    const { user } = useData()

    useEffect(() => {

        async function fetchActiveMeals() {

            try {
                const response = await fetch(`http://localhost:5000/api/activeFeed?userId=${user._id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });

                const result = await response.json();
                if (result.success) {
                    // use result.campaigns
                    // console.log(result);
                    return result.campaigns;
                } else {
                    console.log("Error:", result.error);
                }
            } catch (error) {
                console.error("Fetch error:", error);
            }

        }

        setTimeout(() => {
            const result = fetchActiveMeals();
            console.log(result);
            setMealPosts(result)
            console.log(mealPosts);
            setLoading(true);
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
