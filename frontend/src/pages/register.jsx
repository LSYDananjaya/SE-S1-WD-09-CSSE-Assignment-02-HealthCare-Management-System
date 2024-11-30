import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import Doctor1 from "../assets/doctor1.png";
import Doctor2 from "../assets/doctor2.png";
import axios from "axios";
import QRCode from "react-qr-code"; // Import QRCode from react-qr-code
import { useNavigate } from "react-router-dom";
import { Spinner } from "reactstrap"; // Import Spinner from reactstrap

const Register = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [qrCodeData, setQrCodeData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const slides = [
    {
      image: Doctor1,
      title: "Your Health, Your Schedule",
      subtitle: "Join Us Today",
      description:
        "Sign up and experience a seamless way to manage your health. Create your account now!",
    },
    {
      image: Doctor2,
      title: "Explore Our Amazing Features",
      subtitle: "Create Your Account",
      description:
        "Join our platform to book and manage your doctor appointments with ease.",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setIsSubmitting(true);
    setShowModal(true);

    try {
      const uniqueId = `user-${Date.now()}`;

      const response = await axios.post(
        "http://localhost:3000/api/users/register",
        {
          id: uniqueId,
          name: formData.name,
          email: formData.email,
          password: formData.password,
          userLevel: 0,
        }
      );

      if (response.data) {
        const profileDetails = `Name: ${formData.name}, Email: ${formData.email}`;
        setQrCodeData(profileDetails); // Set the QR code data

        // Simulate loading for 3 seconds
        setTimeout(() => {
          setIsSubmitting(false);
        }, 3000);

        // Optionally, update the QR code in the database
        await axios.put(`http://localhost:3000/api/users/${formData.email}`, {
          QrCode: profileDetails,
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      setIsSubmitting(false);
      setShowModal(false);
    }
  };

  const handleDoneClick = () => {
    setShowModal(false);
    navigate("/");
  };

  return (
    <div className="bg-gradient-to-br from-baseextra4 to-baseprimary w-full min-h-screen flex justify-center items-center p-6">
      <div className="relative flex flex-col sms:w-[95vw] lgs:flex-row h-auto w-auto justify-center items-center bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="flex flex-col sms:w-full sms:h-auto lgs:w-[30vw] lgs:h-[75vh] bg-baseprimary p-8 justify-center items-center rounded-l-3xl">
          <div className="flex flex-col justify-center items-center w-full h-full">
            <div className="flex justify-center items-center w-full h-[60%] overflow-hidden relative">
              <img
                src={slides[currentSlide].image}
                alt="Doctor"
                className="w-full object-cover transition-all duration-700 ease-in-out"
              />
            </div>
            <div className="flex flex-col h-auto justify-center items-center lgs:pt-5">
              <h2 className="flex flex-col font-ibmplexsans lgs:text-md text-primary">
                {slides[currentSlide].title}
                <div className="bg-primary h-[0.15rem] w-auto" />
              </h2>
              <h2 className="font-russoone lgs:text-3xl text-primary font-normal">
                {slides[currentSlide].subtitle}
              </h2>
              <div className="flex flex-col h-auto justify-center items-center lgs:pt-5">
                <p
                  className="font-ibmplexsans text-primary text-md text-center"
                  style={{ fontWeight: "200" }}
                >
                  {slides[currentSlide].description}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sms:w-full sms:h-auto lgs:w-[45vw] lgs:h-[75vh] bg-white justify-center items-center p-10 rounded-r-3xl">
          <form
            className="flex flex-col w-full max-w-sm space-y-6"
            onSubmit={handleSubmit}
          >
            <div className="flex items-center space-x-3 border border-basesecondary rounded-full p-3">
              <FontAwesomeIcon icon={faUser} className="text-baseprimary h-6" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full focus:outline-none"
              />
            </div>
            <div className="flex items-center space-x-3 border border-basesecondary rounded-full p-3">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-baseprimary h-6"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full focus:outline-none"
              />
            </div>
            <div className="flex items-center space-x-3 border border-basesecondary rounded-full p-3">
              <FontAwesomeIcon icon={faLock} className="text-baseprimary h-6" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full focus:outline-none"
              />
            </div>
            <div className="flex items-center space-x-3 border border-basesecondary rounded-full p-3">
              <FontAwesomeIcon icon={faLock} className="text-baseprimary h-6" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-baseprimary text-white rounded-full hover:bg-basesecondary transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Register
            </button>
            <div className="text-center text-sm text-baseextra1 mt-4">
              <p className="flex items-center justify-center space-x-1">
                <span className="text-gray-600">Already have an account?</span>
                <a
                  href="/"
                  className="text-baseprimary font-semibold underline hover:text-basesecondary transition-colors duration-300"
                >
                  Login here
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            {isSubmitting ? (
              <>
                <p className="text-lg font-semibold text-baseprimary">
                  Health ID is generating...
                </p>
                {/* Center the QR code and loading spinner */}
                <div className="flex flex-col items-center mt-4">
                  <Spinner color="primary" />
                  {qrCodeData && (
                    <QRCode value={qrCodeData} size={150} className="mt-4" />
                  )}
                </div>
              </>
            ) : (
              <>
                <p className="text-lg font-semibold text-baseprimary">
                  Registration Successful!
                </p>
                {/* Center the QR code after registration */}
                <div className="flex flex-col items-center mt-4">
                  {qrCodeData && (
                    <QRCode value={qrCodeData} size={150} className="mt-4" />
                  )}
                  <button
                    className="mt-4 bg-baseprimary text-white p-2 rounded"
                    onClick={handleDoneClick}
                  >
                    Done
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
