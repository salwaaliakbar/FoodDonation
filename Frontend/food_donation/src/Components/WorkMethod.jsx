import gift from "../assets/images/gift.png";
import search from "../assets/images/magnifying-glass.png";
function WorkMethod() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
        <div className="mx-auto px-4 pb-16">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-4xl font-bold mb-6 text-gray-900">
              Making Food Sharing Safe & Easy
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Join our community of donors and recipients to make a difference
              in fighting food waste
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-15 max-w-6xl mx-30">
            {/* Donors Section */}
            <div
              className="p-8 bg-gradient-to-r from-green-100 to-[rgba(72,202,128,0.12)] shadow-lg transition-all duration-300 border-2 border-green-200 rounded-lg" 
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-green-200 rounded-full">
                  <img src={gift} className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  For Donors
                </h2>
              </div>
              <div className="space-y-6">
                <StepItem
                  number="1"
                  title="Create an Account"
                  description="Sign up or log in to start donating"
                />
                <StepItem
                  number="2"
                  title="List Your Donation"
                  description="Navigate to 'Donate Food' and add details"
                />
                <StepItem
                  number="3"
                  title="Submit Details"
                  description="Provide food information and photos"
                />
                <StepItem
                  number="4"
                  title="Complete Donation"
                  description="Get confirmation and coordinate delivery"
                />
              </div>
            </div>

            {/* Recipients Section */}
            <div className="p-8 bg-gradient-to-r from-green-100 to-[rgba(72,202,128,0.12)] hover:shadow-lg transition-all duration-300 border-2 border-green-200 rounded-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-green-200 rounded-full">
                  <img src={search} className="w-6 h-6 " />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  For Recipients
                </h2>
              </div>
              <div className="space-y-6">
                <StepItem
                  number="1"
                  title="Join FoodSecure"
                  description="Create your recipient account"
                />
                <StepItem
                  number="2"
                  title="Find Food"
                  description="Browse available donations nearby"
                />
                <StepItem
                  number="3"
                  title="Request Items"
                  description="Select food items you need"
                />
                <StepItem
                  number="4"
                  title="Pickup/Delivery"
                  description="Arrange collection with the donor"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Step Item Component
function StepItem(props) {
  return (
    <>
      <div className="flex gap-4 items-start group hover:transform hover:translate-x-2 transition-all duration-300 delay-75">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white border-2 border-current text-gray-400 flex items-center justify-center font-semibold group-hover:text-green-500 transition-colors">
          {props.number}
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 mb-1">{props.title}</h3>
          <p className="text-gray-600 text-sm">{props.description}</p>
        </div>
      </div>
    </>
  );
}
export default WorkMethod;
