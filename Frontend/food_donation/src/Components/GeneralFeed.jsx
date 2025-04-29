import React from 'react';
import MealPostCard from './MealPostCard'; // Adjust the import path if needed
import Header from './Header';
import SideBar from './SideBar';

// Example Data
const mealPosts = [
    {
        id: 1,
        donorPic: '/src/assets/images/user_pic.jpg', // Replace with actual images
        donorName: 'Alice Johnson',
        mealTitle: 'Fresh Homemade Pasta',
        mealDescription: 'Delicious handmade pasta with a rich tomato sauce, suitable for a family.',
        personCount: 4,
        location: 'New York, NY',
        postedAt: '2 hours ago',
        applicants: 3
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
        applicants: 5
    },
    // Add more posts here
];

function GeneralFeed() {
    return (
        <div className='flex'>
            <SideBar />
            {/* <div className="flex flex-col items-center mt-10"> */}
            <div className='w-[80%] absolute right-0'>
                <Header />
                <h1 className="text-3xl font-bold mb-8">General Meal Feed</h1>

                <div className="w-[80%]">
                    {mealPosts.map(post => (
                        <MealPostCard
                            key={post.id}
                            donorPic={post.donorPic}
                            donorName={post.donorName}
                            mealTitle={post.mealTitle}
                            mealDescription={post.mealDescription}
                            personCount={post.personCount}
                            location={post.location}
                            postedAt={post.postedAt}
                            applicants={post.applicants}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GeneralFeed;
