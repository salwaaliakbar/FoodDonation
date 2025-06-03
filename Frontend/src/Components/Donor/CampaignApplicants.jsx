import React, { useState, useEffect } from 'react'
import Header from "./DonorHeader";
import DonorSidebar from "./DonorSidebar";
import Loader from '../Loader'
import { useData } from '../ContextAPIs/UserContext';
import { useSecureFetch } from "../Refresh/SecureFetch";
import MealApplicantCard from './MealApplicantCard';



const CampaignApplicants = () => {
    const [loading, setLoading] = useState(true);
    const [mealPosts, setMealPosts] = useState();
    const { user } = useData();
    const secureFetch = useSecureFetch()


    useEffect(() => {

        async function fetchMealData(status) {
            try {
                const data = await secureFetch(
                    `http://localhost:5000/api/getHistoy?userId=${user?._id}&status=${status}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                return Array.isArray(data.campaigns) ? data.campaigns : [];
            } catch (err) {
                console.error("Error fetching user campaigns:", err);
                return [];
            }
        }
        const fetchData = async () => {
            setTimeout(async () => {

                const activeData = await fetchMealData("Active");
                setMealPosts(activeData);
                console.log(activeData);  // Consoling the data for checking\
                setLoading(false);
            }, 1000);

        }

        fetchData();
    }, []);


    return (
        <div className="flex flex-col md:flex-row overflow-hidden">
            <DonorSidebar />
            <div className="w-full md:w-[80%] md:absolute md:right-0 bg-gray-200 min-h-screen">
                <Header />
                <h1 className="text-3xl font-bold mb-8 text-green-600 text-center m-4">My Active Meals</h1>

                {loading ? (
                    <div className="w-full flex min-h-[70vh] justify-center items-center py-16">
                        <Loader />
                    </div>
                ) : (
                    <div className="w-[94%] min-h-[70vh] m-auto">
                        {mealPosts.map((post, index) => (
                            <MealApplicantCard
                                key={post.id}
                                mealData={post}
                                index={index}
                                setMealPosts={setMealPosts}
                            />
                            // <h1>Hi</h1>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default CampaignApplicants
