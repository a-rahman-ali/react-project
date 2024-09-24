import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';


function Header() {
    const redirect = (e) => {
        if (isLoggedIn) {
            e.preventDefault();
            location.href = '/home';
        } else {
            e.preventDefault();
            alert('You must be logged in')
            location.href = '/login';
        }
    }
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('user'));
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem('user') === 'admin');

    return (
        <>
            <header className="shadow sticky z-50 top-0">
                <nav className="bg-white border-gray-200 px-4 lg:px-6">
                    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                        <div onClick={redirect} className="flex items-center cursor-pointer">
                            <img
                                src="https://www.ece.ufl.edu/wp-content/uploads/2023/09/non-zoom-meeting.png"
                                className="mr-3 h-16"
                                alt="Logo"
                            />
                            <h4>Conference Rooms Manager</h4>
                        </div>
                        <div className="flex flex-row items-center lg:order-2">
                            {
                                (!isAdmin && isLoggedIn) && (
                                    <NavLink
                                        to="home"
                                        className={({ isActive }) =>
                                            `block py-2 pr-4 pl-3 mr-5 mt-0 duration-200 font-medium no-underline ${isActive ? "text-orange-700" : "text-gray-700"} 
                                             border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                        }
                                    >
                                        Home
                                    </NavLink>
                                )
                            }

                            {
                                (!isAdmin && isLoggedIn) && (
                                    <NavLink
                                        to="history"
                                        className={({ isActive }) =>
                                            `block py-2 pr-4 pl-3 mr-5 mt-0 duration-200 font-medium no-underline ${isActive ? "text-orange-700" : "text-gray-700"} 
                                             border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                        }
                                    >
                                        History
                                    </NavLink>
                                )
                            }

                            <h5 className="text-gray-700 mr-2 mt-[5%]">
                                {localStorage.getItem('user')?.toLocaleUpperCase()}
                            </h5>
                            <button
                                onClick={(e) => {
                                    if (localStorage.getItem('user')) {
                                        setIsLoggedIn(!isLoggedIn)
                                    }
                                    localStorage.removeItem('user');
                                    localStorage.removeItem('role');
                                    location.href = "/login"
                                    e.preventDefault();
                                }}
                                className="text-gray-800 hover:bg-gray-300 focus:ring-4 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                            >
                                {isLoggedIn ? "Logout" : "Login"}
                            </button>
                        </div>

                        {
                            isAdmin && (

                                <div
                                    className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                                    id="mobile-menu-2"
                                >
                                    <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                                        <li>
                                            <NavLink
                                                to="/admin-home"
                                                className={({ isActive }) =>
                                                    `block py-2 pr-4 pl-3 duration-200 no-underline ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                                }
                                            >
                                                Home
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to="manage-users"
                                                className={({ isActive }) =>
                                                    `block py-2 pr-4 pl-3 duration-200 no-underline ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                                }
                                            >
                                                Users
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to="manage-rooms"
                                                className={({ isActive }) =>
                                                    `block py-2 pr-4 pl-3 duration-200 no-underline ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                                }
                                            >
                                                Rooms
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to="manage-bookings"
                                                className={({ isActive }) =>
                                                    `block py-2 pr-4 pl-3 duration-200 no-underline ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                                }
                                            >
                                                Bookings
                                            </NavLink>
                                        </li>

                                    </ul>
                                </div>
                            )
                        }
                    </div>
                </nav>
            </header >
        </>
    )
}

export default Header
