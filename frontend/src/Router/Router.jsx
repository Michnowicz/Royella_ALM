import { createBrowserRouter } from "react-router-dom";
import { useState } from "react";

// Home And Main Home1
import Main from "../Main/Main";
import Home1 from "../Pages/Home1/Home1";


// All InnerPage
import About from "../Pages/InnerPage/About";
import Room from "../Pages/InnerPage/Room";
import FindRoom from "../Pages/InnerPage/FindRoom";
import RoomDetails from "../Pages/InnerPage/RoomDetails";
import Services from "../Pages/InnerPage/Services";
import ServiceDetails from "../Pages/InnerPage/ServiceDetails";
import Team from "../Pages/InnerPage/Team";
import Pricing from "../Pages/InnerPage/Pricing";
import Blog from "../Pages/InnerPage/Blog";
import BlogDetails from "../Pages/InnerPage/BlogDetails";
import Contact from "../Pages/InnerPage/Contact";
import ErrorPage from "../Shared/ErrorPage/ErrorPage";


// Custom pages
import Backoffice from "../Pages/Backoffice/Backoffice";
import Banner from "../Pages/Backoffice/Banner/Banner";

// Starting React Router.
const router = createBrowserRouter([

  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home1 />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/room",
        element: <Room />,
      },
      {
        path: "/find_room",
        element: <FindRoom />,
      },
      {
        path: "/room_details",
        element: <RoomDetails />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/service_details",
        element: <ServiceDetails />,
      },
      {
        path: "/our_team",
        element: <Team />,
      },
      {
        path: "/pricing",
        element: <Pricing />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/blog_details",
        element: <BlogDetails />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },

  {
    path: "/backoffice",
    element: <Backoffice />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/backoffice/banner",
        element: <Banner/>,
      },
    ],
  },
]);

export default router;
