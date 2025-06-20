import React, { useEffect } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  useLocation,
  useParams,
} from "react-router-dom";
import Navbar from "./components/elements/Navbar";
import Sidebar from "./components/elements/Sidebar";
import Dashboard from "./features/dashboard/Dashboard";
import Login from "./features/login/Login";
import Logout from "./features/login/Logout";
import ResetPassword from "./features/login/ResetPassword";
import SetPassword from "./features/login/SetPassword";
import Register from "./features/register/Register";
import Verification from "./features/register/Verification";
import Error from "./ui/Error";
import Cookies from "js-cookie";
import ResourcePlanner from "./features/resource-planner/ResourcePlanner";
import Profile from "./features/profile/Profile";
import { SnackbarProvider } from "notistack";
import { useSelector } from "react-redux";
import ErrorNonAuth from "./ui/ErrorNonAuth";
import { works_data } from "./components/elements/amdital/allSidebarData";
import MainSidebar from "./components/elements/MainSidebar";
// import MultiSiteNavbar from "../../amdital_task/ip-amdital-web-app/src/components/elements/amdital/MultiSiteNavbar";
// import MultiSitesListView from "../../amdital_task/ip-amdital-web-app/src/components/elements/amdital/MultiSitesListView";
import MultiSiteNavbar from "./components/elements/amdital/MultiSiteNavbar";
import MultiSitesListView from "./components/elements/amdital/MultiSitesListView";
import Shifts from "./features/shift/Shifts";
function App() {
  const showPopupMenu = useSelector((state) => state.general.showPopupMenu);
  const data = Cookies.get("token");
  const cookiesIn = data !== "null" && data ? true : false;

  const user_details = useSelector((state) => state?.employee?.user_details);

  const AuthRoutes = (props) => {
    const data = Cookies.get("token");
    const cookiesIn = data !== "null" && data ? true : false;
    return cookiesIn ? props.children : <Login />;
  };

  const NonAuthRoutes = (props) => {
    return props.children;
  };

  const router = createBrowserRouter([
    {
      element: "",
      errorElement: cookiesIn ? (
        <div className=" flex  w-full">
          <div
            className={` relative z-[100] ${
              showPopupMenu
                ? ` min-w-[50px] max-w-[50px] `
                : ` z-[1100] min-w-[250px] 
                                max-w-[250px] min-[1400px]:min-w-[278px] min-[1400px]:max-w-[278px] `
            }`}
          >
            <MainSidebar activeSidebar={"Dashboard"} />
          </div>
          <div
            className={`relative flex w-[calc(100%-250px)] flex-col  ${
              showPopupMenu
                ? ` w-[calc(100%-50px)] `
                : ` w-[calc(100%-250px)] 
                                 min-[1400px]:w-[calc(100%-278px)] `
            } overflow-visible `}
          >
            <div className=" navbar_new min-h-[56px] w-full ">
              <Navbar breadCrumb="Error" />
            </div>
            <div className=" relative  ">
              <Error />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center bg-[#FFFFFF] pt-10">
          <ErrorNonAuth />
        </div>
      ),
      children: [
        {
          path: "/",
          element: (
            <AuthRoutes>
              <div className=" flex  w-full">
                <div
                  className={`relative z-[100] ${
                    showPopupMenu
                      ? ` min-w-[50px] max-w-[50px] `
                      : ` min-w-[250px] max-w-[250px] 
                                min-[1400px]:min-w-[278px] min-[1400px]:max-w-[278px] `
                  }`}
                >
                  <MainSidebar activeSidebar={"Dashboard"} />
                </div>
                <div
                  className={`relative flex w-[calc(100%-250px)] flex-col  ${
                    showPopupMenu
                      ? ` w-[calc(100%-50px)] `
                      : ` w-[calc(100%-250px)] 
                                 min-[1400px]:w-[calc(100%-278px)] `
                  } overflow-visible `}
                >
                  <div className=" navbar_new min-h-[56px] w-full ">
                    <Navbar breadCrumb="Dashboard" />
                  </div>
                  <div className=" relative ">
                    <Dashboard />
                  </div>
                </div>
              </div>
            </AuthRoutes>
          ),
        },
        {
          path: "/dashboard",
          element: (
            <AuthRoutes>
              <div className=" flex  w-full">
                <div
                  className={`relative z-[100] ${
                    showPopupMenu
                      ? ` min-w-[50px] max-w-[50px] `
                      : ` min-w-[250px] max-w-[250px] 
                                min-[1400px]:min-w-[278px] min-[1400px]:max-w-[278px] `
                  }`}
                >
                  <MainSidebar activeSidebar={"Dashboard"} />
                </div>
                <div
                  className={`relative flex w-[calc(100%-250px)] flex-col  ${
                    showPopupMenu
                      ? ` w-[calc(100%-50px)] `
                      : ` w-[calc(100%-250px)] 
                                 min-[1400px]:w-[calc(100%-278px)] `
                  } overflow-visible `}
                >
                  <div className=" navbar_new min-h-[56px] w-full ">
                    <Navbar breadCrumb="Dashboard" />
                  </div>
                  <div className=" relative ">
                    <Dashboard />
                  </div>
                </div>
              </div>
            </AuthRoutes>
          ),
          loader: async (params) => {
            return params;
          },
        },
        {
          path: "/login",
          element: (
            <AuthRoutes>
              <div className=" flex  w-full">
                <div
                  className={` relative z-[100] ${
                    showPopupMenu
                      ? ` min-w-[50px] max-w-[50px] `
                      : ` min-w-[250px] max-w-[250px] 
                                min-[1400px]:min-w-[278px] min-[1400px]:max-w-[278px] `
                  }`}
                >
                  <MainSidebar activeSidebar={"Dashboard"} />
                </div>
                <div
                  className={`relative flex w-[calc(100%-250px)] flex-col  ${
                    showPopupMenu
                      ? ` w-[calc(100%-50px)] `
                      : ` w-[calc(100%-250px)] 
                                 min-[1400px]:w-[calc(100%-278px)] `
                  } overflow-visible `}
                >
                  <div className=" navbar_new min-h-[56px] w-full ">
                    <Navbar breadCrumb="Dashboard" />
                  </div>
                  <div className=" relative ">
                    <Dashboard />
                  </div>
                </div>
              </div>
            </AuthRoutes>
          ),
        },
        {
          path: "/logout",
          element: <Logout />,
        },
        {
          path: "/register",
          element: (
            <NonAuthRoutes>
              <Register />
            </NonAuthRoutes>
          ),
        },
        {
          path: "/verify",
          element: (
            <NonAuthRoutes>
              <Verification />
            </NonAuthRoutes>
          ),
        },
        {
          path: "/reset-password",
          element: (
            <NonAuthRoutes>
              <ResetPassword />
            </NonAuthRoutes>
          ),
        },
        {
          path: "/set-password",
          element: (
            <NonAuthRoutes>
              <SetPassword />
            </NonAuthRoutes>
          ),
        },

        {
          path: "/branchs-list",
          element: (
            <AuthRoutes>
              <div className=" w-full ">
                <div>
                  <MultiSiteNavbar />
                </div>
                <div>
                  <MultiSitesListView />
                </div>
              </div>
            </AuthRoutes>
          ),
          loader: async (params) => {
            return params;
          },
        },

        {
          path: "/resourceplanner",
          element: (
            <AuthRoutes>
              <div className=" flex  w-full">
                <div
                  className={` relative z-[100] ${
                    showPopupMenu
                      ? ` min-w-[50px] max-w-[50px] `
                      : ` min-w-[250px] max-w-[250px] 
                                min-[1400px]:min-w-[278px] min-[1400px]:max-w-[278px] `
                  }`}
                >
                  <Sidebar
                    sidebar_data={works_data}
                    activeSidebar={"Work"}
                    insideActiveSidebar={"Resource Planner"}
                  />
                </div>
                <div
                  className={`relative flex w-[calc(100%-250px)] flex-col  ${
                    showPopupMenu
                      ? ` w-[calc(100%-50px)] `
                      : ` w-[calc(100%-250px)] 
                                 min-[1400px]:w-[calc(100%-278px)] `
                  } overflow-visible `}
                >
                  <div className=" navbar_new min-h-[56px] w-full ">
                    <Navbar breadCrumb="Resource Planner" />
                  </div>
                  <div className=" relative ">
                    <ResourcePlanner />
                  </div>
                </div>
              </div>
            </AuthRoutes>
          ),
          loader: async (params) => {
            return params;
          },
        },

        {
          path: "/shift",
          element: (
            <AuthRoutes>
              <div className=" flex  w-full">
                <div
                  className={` relative z-[100] ${
                    showPopupMenu
                      ? ` min-w-[50px] max-w-[50px] `
                      : ` min-w-[250px] max-w-[250px] 
                                min-[1400px]:min-w-[278px] min-[1400px]:max-w-[278px] `
                  }`}
                >
                  <Sidebar
                    sidebar_data={works_data}
                    activeSidebar={"Work"}
                    insideActiveSidebar={"Shift"}
                  />
                </div>
                <div
                  className={`relative flex w-[calc(100%-250px)] flex-col  ${
                    showPopupMenu
                      ? ` w-[calc(100%-50px)] `
                      : ` w-[calc(100%-250px)] 
                                 min-[1400px]:w-[calc(100%-278px)] `
                  } overflow-visible `}
                >
                  <div className=" navbar_new min-h-[56px] w-full ">
                    <Navbar breadCrumb="Shift" />
                  </div>
                  <div className=" relative ">
                    <Shifts />
                  </div>
                </div>
              </div>
            </AuthRoutes>
          ),
          loader: async (params) => {
            return params;
          },
        },

        // profiles
        {
          path: "/profile",
          element: (
            <AuthRoutes>
              <div className=" flex  w-full">
                <div
                  className={`  relative z-[100] ${
                    showPopupMenu
                      ? ` min-w-[50px] max-w-[50px] `
                      : ` min-w-[250px] max-w-[250px] 
                                min-[1400px]:min-w-[278px] min-[1400px]:max-w-[278px] `
                  }`}
                >
                  <MainSidebar activeSidebar={"Dashboard"} />
                </div>
                <div
                  className={`relative flex w-[calc(100%-250px)] flex-col  ${
                    showPopupMenu
                      ? ` w-[calc(100%-50px)] `
                      : ` w-[calc(100%-250px)] 
                                 min-[1400px]:w-[calc(100%-278px)] `
                  } overflow-visible `}
                >
                  <div className=" navbar_new min-h-[56px] w-full ">
                    <Navbar breadCrumb="Profile" />
                  </div>
                  <div className=" relative ">
                    <Profile />
                  </div>
                </div>
              </div>
            </AuthRoutes>
          ),
          loader: async (params) => {
            return params;
          },
        },
      ],
    },
  ]);

  useEffect(() => {
    document.body.style.backgroundColor = "#FFFFFF";
  }, []);

  return (
    <SnackbarProvider maxSnack={1}>
      <RouterProvider router={router} />
    </SnackbarProvider>
  );
}

export default App;
