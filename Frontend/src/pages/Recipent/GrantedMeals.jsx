// Granted Meals Main Page

import React, { useState, useEffect } from 'react'
import SideBar from './SideBar'
import Header from './Header'
import MealCard from './MealCard'
import userPic from '/src/assets/images/user_pic.jpg';
import Loader from '../../Components/Loader';
import { useData } from '../../context/UserContext';


const GrantedMeals = () => {
    const [grantedMeals, setGrantedMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useData();


    useEffect(() => {

        async function fetchGrantedMeals() {
            try {
                const response = await fetch(`http://localhost:5000/api/grantedMeals?userId=${user._id}`, {
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
                console.error("Error fetching Granted Campaigns:", err);
                return [];
            }

        }

        const fetchData = async () => {
            setLoading(true);

            setTimeout(async () => {

                const feedData = await fetchGrantedMeals()
                setGrantedMeals(feedData);
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
            <div className='w-[80%] absolute right-0 bg-gray-200 min-h-[100vh]'>
                <Header />
                <h1 className="text-3xl font-bold mb-8 text-green-600 text-center m-4">Granted Meals</h1>
                {loading ? (
                    <div className="w-full flex min-h-[70vh] justify-center items-center py-16">
                        <Loader />
                    </div>
                ) : (grantedMeals.length > 0 ?
                    <section className="w-[95%] mx-auto bg-white border-[1px] border-zinc-200 rounded-xl shadow-lg mt-4 mb-4 ">
                        {grantedMeals.map((meal, i) => (
                            <MealCard key={i} meal={meal} />
                        ))}
                    </section>
                    : // Show fallback UI when no posts are available
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                        <p className="text-lg font-semibold">No Granted Meals to display</p>
                        <p className="text-sm">
                            Once Donor Awards Meal, they’ll appear here in your feed.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default GrantedMeals
