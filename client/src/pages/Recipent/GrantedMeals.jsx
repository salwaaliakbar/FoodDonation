import React, { useState, useEffect } from 'react';
import SideBar from './SideBar';
import MealCard from './MealCard';
import Loader from '../../Components/Loader';
import { useData } from '../../context/UserContext';
import Header from '../../Components/Header';

const GrantedMeals = () => {
  const [grantedMeals, setGrantedMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useData();

  useEffect(() => {
    async function fetchGrantedMeals() {
      try {
        const response = await fetch(
          `http://localhost:5000/api/grantedMeals?userId=${user._id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          }
        );

        const data = await response.json();
        return Array.isArray(data.campaigns) ? data.campaigns : [];
      } catch (err) {
        console.error('Error fetching Granted Campaigns:', err);
        return [];
      }
    }

    const fetchData = async () => {
      setLoading(true);
      setTimeout(async () => {
        const feedData = await fetchGrantedMeals();
        setGrantedMeals(feedData);
        setLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />

      <div className="flex flex-col min-h-screen bg-gray-200">
        <div className="w-full pt-25 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-green-800 text-center mb-6">
            Granted Meals
          </h1>

          {loading ? (
            <div className="flex justify-center items-center min-h-[60vh]">
              <Loader />
            </div>
          ) : grantedMeals.length > 0 ? (
            <section className="w-full max-w-7xl mx-auto bg-white border border-zinc-200 rounded-xl shadow-lg p-4 sm:p-6 mb-8 space-y-4">
              {grantedMeals.map((meal, i) => (
                <MealCard key={i} meal={meal} />
              ))}
            </section>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <p className="text-lg font-semibold">No Granted Meals to display</p>
              <p className="text-sm">
                Once Donor Awards Meal, they’ll appear here in your feed.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GrantedMeals;
