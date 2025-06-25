import React, { useState, useEffect } from "react";
import StatsSection from "../../Components/StatsSection";
import ActiveMealsSection from "../../Components/ActiveMealsSection";
import { useData } from "../../context/UserContext";
import Loader from "../../Components/Loader";
import Header from "../../Components/Header";

function Recipent_Dashboard() {
  const { user } = useData();
  const [loading, setLoading] = useState(true);
  const [grantedMeals, setGrantedMeals] = useState([]);
  const [activeMeals, setActiveMeals] = useState([]);
  const [statistics, setStatistics] = useState({});

  useEffect(() => {
    async function fetchGrantedMeals() {
      try {
        const response = await fetch(
          `http://localhost:5000/api/grantedMeals?userId=${user._id}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        const data = await response.json();
        return Array.isArray(data.campaigns) ? data.campaigns : [];
      } catch (err) {
        console.error("Error fetching Granted Campaigns:", err);
        return [];
      }
    }

    async function fetchActiveMeals() {
      try {
        const response = await fetch(
          `http://localhost:5000/api/activeFeed?userId=${user._id}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        const data = await response.json();
        return Array.isArray(data.campaigns) ? data.campaigns : [];
      } catch (err) {
        console.error("Error fetching Feed Campaigns:", err);
        return [];
      }
    }

    async function fetchMealsStatistics() {
      try {
        const response = await fetch(
          `http://localhost:5000/api/mealStatistics?userId=${user._id}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        const data = await response.json();
        return {
          applied: typeof data.statistics.applied === "number" ? data.statistics.applied : 0,
          awarded: typeof data.statistics.awarded === "number" ? data.statistics.awarded : 0,
        };
      } catch (err) {
        console.error("Error fetching Statistics of Campaigns:", err);
        return { applied: 0, awarded: 0 };
      }
    }

    const fetchData = async () => {
      setLoading(true);
      setTimeout(async () => {
        const active = await fetchActiveMeals();
        const granted = await fetchGrantedMeals();
        const stats = await fetchMealsStatistics();

        setActiveMeals(active);
        setGrantedMeals(granted);
        setStatistics(stats);
        setLoading(false);
      }, 1000);
    };

    fetchData();
  }, [user._id]);

  return (
    <>
      <Header />

      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-200">
        {/* If Sidebar needed: Uncomment next line */}
        {/* <SideBar /> */}

        {/* Main Content */}
        <div className="flex-1 w-full pt-20 px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center min-h-[70vh] py-12">
              <Loader />
            </div>
          ) : (
            <div className="space-y-6">
              <StatsSection
                actives={statistics.applied}
                grants={statistics.awarded}
              />
              <ActiveMealsSection Meals={activeMeals} title={"Active"} />
              <ActiveMealsSection Meals={grantedMeals} title={"Granted"} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Recipent_Dashboard;
