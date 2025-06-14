import React, { useState, useEffect } from 'react'
import Header from './Header'
import SideBar from './SideBar'
import StatsSection from '../../Components/StatsSection'
import ActiveMealsSection from '../../Components/ActiveMealsSection'
import userPic from '/src/assets/images/user_pic.jpg';
import { useData } from '../../context/UserContext'
import Loader from '../../Components/Loader';



function Recipent_Dashboard() {

    const { user } = useData();
    const [loading, setLoading] = useState(true);
    const [grantedMeals, setGrantedMeals] = useState([]);
    const [activeMeals, setActiveMeals] = useState([]);


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

        async function fetchActiveMeals() {
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

                let active = await fetchActiveMeals()
                let feedData = await fetchGrantedMeals()

                setActiveMeals(active);
                setGrantedMeals(feedData);

                // console.log(feedData);  // Consoling the data for checking
                // console.log(activeMeals); // Consoling the data for checking

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
                {loading ? (
                    <div className="w-full flex min-h-[85vh] justify-center items-center py-16">
                        <Loader />
                    </div>
                ) :
                    (<div className='px-4'>
                        <StatsSection actives={activeMeals.length} grants={grantedMeals.length} />
                        <ActiveMealsSection Meals={activeMeals} title={'Active'} />
                        <ActiveMealsSection Meals={grantedMeals} title={'Granted'} />
                    </div>)}
            </div>
        </div>
    )
}

export default Recipent_Dashboard