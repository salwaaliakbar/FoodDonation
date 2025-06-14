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
    // const [activeMeals, setActiveMeals] = useState([]);


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
            <div className='w-[80%] absolute right-0 bg-gray-200'>
                <Header />
                {loading ? (
                    <div className="w-full flex min-h-[70vh] justify-center items-center py-16">
                        <Loader />
                    </div>
                ) :
                    (<div className='px-4'>
                        <StatsSection />
                        {/* <ActiveMealsSection Meals={activeMeals} title={'Active Meals'} /> */}
                        <ActiveMealsSection Meals={grantedMeals} title={'Granted Meals'} />
                    </div>)}
            </div>
        </div>
    )
}

export default Recipent_Dashboard