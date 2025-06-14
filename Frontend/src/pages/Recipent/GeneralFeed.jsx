// GeneralFeed.jsx
import React, { useEffect, useState } from 'react';
import MealPostCard from './MealPostCard';
import Header from './Header';
import SideBar from './SideBar';
import Loader from '../../Components/Loader';
import { useData } from '../../context/UserContext';

const GeneralFeed = () => {
    const [loading, setLoading] = useState(true);
    const [mealPosts, setMealPosts] = useState([]);
    const { user } = useData()

    useEffect(() => {

        async function fetchMealFeedData() {
            try {
                const response = await fetch(`http://localhost:5000/api/generalFeed?userId=${user._id}&status=${'Active'}`, {
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
                // console.log(feedData);  // Consoling the data for checking\
                // console.log

                setLoading(false);
            }, 1000);

        }

        fetchData();
    }, []);

    return (
        <div className='flex'>
            <SideBar />
            <div className='w-[80%] absolute right-0 bg-gray-200'>
                <Header />
                <h1 className="text-3xl font-bold mb-8 text-green-600 text-center m-4">General Meal Feed</h1>

                {loading ? (
                    <div className="w-full flex min-h-[70vh] justify-center items-center py-16">
                        <Loader />
                    </div>
                ) : mealPosts.length ? (
                    <div className="w-[94%] min-h-[70vh] m-auto">
                        {mealPosts.map((post, index) => (
                            <MealPostCard
                                key={post._id}
                                meal={post}
                                index={index}
                                setMealPosts={setMealPosts}
                            />
                        ))}
                    </div>
                ) : <div className="w-[94%] min-h-[70vh] m-auto"><div className='bg-white rounded-lg shadow-md p-6 mb-4 w-full cursor-pointer'><h1>There is no any Data</h1></div></div>}
            </div>
        </div>
    );
};

export default GeneralFeed;