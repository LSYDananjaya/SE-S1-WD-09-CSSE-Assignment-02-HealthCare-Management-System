// images
import Doctor1 from "../assets/doctor1.png";
import heroBackground from "../assets/heroBackground.png"; // Import heroBackground
import heroImage from "../assets/heroImage.png"; // Import heroImage
import { Link } from "react-router-dom"; // Make sure to import Link

const Home = () => {
  return (
    <div className="bg-gradient-to-br from-baseextra4 to-baseprimary w-full min-h-screen flex flex-col justify-center items-center">
      <div className="hidden lgs:flex mds:flex bg-transparent lgs:w-full lgs:h-[4rem]" />

      {/* Booking Appointment Interface */}
      <div className="relative flex flex-col md:flex-row w-full max-w-[1200px] justify-center items-center p-4">
        {/* Booking Appointments */}
        <div
          className="flex flex-col md:flex-row w-full bg-primary drop-shadow-lg items-center justify-center rounded-3xl"
          style={{
            boxShadow: "inset 0 2px 10px rgba(0,0,0,0.5)",
          }}
        >
          {/* Booking 1st Interface - Left Half */}
          <div
            className="flex flex-col w-full md:w-[55%] bg-baseprimary p-4 md:h-[75vh] justify-center items-center rounded-l-3xl relative"
            style={{
              backgroundImage: `url(${heroBackground})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Topic Section */}
            <div className="flex flex-col items-center mb-4">
              <h2 className="font-ibmplexsans text-center text-primary text-lg md:text-xl">
                Your Health, Your Schedule
                <div className="bg-primary h-[0.15rem] w-full mt-1" />
              </h2>
              <h2 className="font-russoone text-2xl md:text-3xl text-primary font-normal">
                Book Your Appointment
              </h2>
            </div>

            {/* Paragraph Section */}
            <div className="flex flex-col justify-center items-center mb-4">
              <p className="font-ibmplexsans text-primary text-md text-center">
                Schedule your doctor appointments quickly and conveniently
                through our easy-to-use interface. Select your preferred doctor,
                choose a suitable date and time, and provide any necessary
                details—all in just a few steps. Get reminders and manage your
                bookings effortlessly from anywhere!
              </p>
            </div>

            {/* Design Section */}
            <div className="flex justify-center items-center space-x-3 mb-4">
              <div
                className="bg-primary h-[0.2rem] rounded-full w-[5rem]"
                data-aos="fade-right"
              />
              <div
                className="bg-primary h-3 w-3 rounded-full"
                data-aos="zoom-in"
              />
              <div
                className="bg-primary h-3 w-3 rounded-full"
                data-aos="zoom-in"
              />
              <div
                className="bg-primary h-[0.2rem] rounded-full w-[5rem]"
                data-aos="fade-left"
              />
            </div>

            {/* Book Appointment Button */}
            <Link
              to="/Appointment"
              className="flex bg-blue-600 mt-4 items-center justify-center w-[12rem] h-[3rem] font-ibmplexsans rounded-full hover:scale-110 transition-transform duration-300 ease-in-out"
              style={{
                boxShadow:
                  "inset 0 2px 5px rgba(255,255,255,0.5), 0px 5px 10px rgba(0,0,0,0.4)",
              }}
            >
              Book an Appointment
            </Link>
          </div>

          {/* Booking 2nd Interface - Right Half */}
          <div className="flex w-full md:w-[55%] bg-baseprimary drop-shadow-lg justify-center items-center rounded-r-3xl relative">
            <img
              src={heroImage}
              alt="Hero"
              className="h-full w-full object-cover rounded-r-3xl"
            />
            {/* Optional overlay to darken the image */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
