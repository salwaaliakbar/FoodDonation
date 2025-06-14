// Active Meals Main Page

import { useState, useEffect } from 'react'
import React from 'react'
import SideBar from './SideBar'
import Header from './Header'
import Loader from '../../Components/Loader'
import AppliedMealPostCard from './AppliedMealPostCard'
import { useData } from '../../context/UserContext'

const ActiveMeals = () => {
    const [loading, setLoading] = useState(true);
    const [mealPosts, setMealPosts] = useState();
    const { user } = useData();

    useEffect(() => {

        async function fetchMealFeedData() {
            try {
                const response = await fetch(`http://localhost:5000/api/activeFeed?userId=${user._id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include"
                });

                const data = await response.json();
                // console.log(data.message);  // Error Message or Replied Message from server
                return Array.isArray(data.campaigns) ? data.campaigns : [];
            } catch (err) {
                console.error("Error fetching Feed Campaigns:", err);
                return [];
            }

        }

        const fetchData = async () => {
            setLoading(true);

            setTimeout(async () => {

                const feedData = await fetchMealFeedData()
                setMealPosts(feedData);
                console.log(feedData);  // Consoling the data for checking\
                // console.log

                setLoading(false);
            }, 1000);

        }

        fetchData();
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
