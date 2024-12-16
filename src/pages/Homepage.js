import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../assets/logo.png";
import { GreenButton } from '../components/buttonStyles';
import { Button } from '@mui/material';

const Homepage = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <img src={Logo} alt="Logo" />
            <div className="flex items-center max-w-5xl gap-4">
                <div className="flex flex-col gap-3 text-center">
                    <h1 className="text-4xl font-bold text-gray-900">
                        Welcome to
                        <br />
                        SMIT Student Portal
                    </h1>
                    <p>
                        Streamline school management, class organization, and add students and faculty.
                        Seamlessly track attendance, assess performance, and provide feedback.
                        Access records, view marks, and communicate effortlessly.
                    </p>
                    <div className="flex items-center gap-4">
                        <Link to="/choose" className="w-full">
                            <GreenButton variant="contained">
                                Login
                            </GreenButton>
                        </Link>
                    </div>
                        <p>
                            Don't have an account?{' '}
                            <Link to="/Adminregister" className="text-[#0a73be]">
                                Sign up
                            </Link>
                        </p>
                </div>
            </div>
        </div>
    );
};

export default Homepage;
