import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";

import authService from "./services/auth/auth.service";

import Home from "./pages/home/Home";
import SignUp from "./pages/auth/signup/SignUp";
import SignIn from "./pages/auth/signin/SignIn";
import Events from "./pages/event/events/Events";
import EventDetails from "./pages/event/eventDetails/EventDetails";
import EventTasks from "./pages/task/eventTasks/EventTasks";
import TaskMessages from "./pages/task/taskMessages/TaskMessages";
import UserTickets from "./pages/ticket/userTickets/UserTickets";
import User from "./pages/user/User";
import Manager from "./pages/manager/Manager";
import AdminDashboard from "./pages/admin/AdminDashboard";
import NotFound from "./pages/notFound/NotFound";
import { UserProvider } from "./components/UserProvider";
import { Toaster } from "@/components/ui/toaster";
import CreateEvent from "./pages/event/createEvent/CreateEvent";
import CreateTicketType from "./pages/ticket/createTicketType/CreateTicketType";
import CreateTasks from "./pages/task/createTasks/CreateTasks";
import AssignManagers from "./pages/manager/assignManagers/AssignManagers";
import BuyTicket from "./pages/ticket/buyTicket/BuyTicket";
import AdminDashboardLayout from "./components/layout/AdminDashboardLayout";
import ManagerDashboardLayout from "./components/layout/ManagerDashboardLayout";
import UserDashboardLayout from "./components/layout/UserDashboardLayout";
import CommonLayout from "./components/layout/CommonLayout";

function App() {
  return (
    <Router>
      <UserProvider>
        <ThemeProvider defaultTheme="system" storageKey="ThemeMode">
          <Routes>
            {/* Routes With Default/Common Layout */}
            <Route path="/" element={<CommonLayout />}>
              <Route path="/" element={<Home />} />

              {/* Authentication Routes */}
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              {/* End of Authentication routes */}

              {/* Ticket Routes */}

              <Route
                path="/:eventId/buy-ticket/:ticketId"
                element={
                  <authService.RequireAuth requiredRoles={["ROLE_USER"]}>
                    <BuyTicket />
                  </authService.RequireAuth>
                }
              />

              {/* End of Ticket Routes */}

              {/* 404 NOT FOUND */}
              <Route path="*" element={<NotFound />} />

              {/* Event Routes */}
              <Route
                path="/events"
                element={
                  <authService.RequireAuth
                    requiredRoles={["ROLE_USER", "ROLE_MANAGER", "ROLE_ADMIN"]}
                  >
                    <Events />
                  </authService.RequireAuth>
                }
              />
              <Route
                path="/event/:slug"
                element={
                  <authService.RequireAuth
                    requiredRoles={["ROLE_USER", "ROLE_MANAGER", "ROLE_ADMIN"]}
                  >
                    <EventDetails />
                  </authService.RequireAuth>
                }
              />

              {/* End of Event Routes */}
            </Route>
            {/* End of Routes With Default Layout */}

            {/* Admin Routes */}
            <Route path="/admin/*" element={<AdminDashboardLayout />}>
              <Route
                path=":username"
                element={
                  <authService.RequireAuth requiredRoles={["ROLE_ADMIN"]}>
                    <AdminDashboard />
                  </authService.RequireAuth>
                }
              />
              <Route
                path="create-event"
                element={
                  <authService.RequireAuth requiredRoles={["ROLE_ADMIN"]}>
                    <CreateEvent />
                  </authService.RequireAuth>
                }
              />
              <Route
                path="create-ticket/:eventId"
                element={
                  <authService.RequireAuth requiredRoles={["ROLE_ADMIN"]}>
                    <CreateTicketType />
                  </authService.RequireAuth>
                }
              />
              <Route
                path="assign-managers/:eventId"
                element={
                  <authService.RequireAuth requiredRoles={["ROLE_ADMIN"]}>
                    <AssignManagers />
                  </authService.RequireAuth>
                }
              />
              <Route
                path="create-tasks/:eventId"
                element={
                  <authService.RequireAuth requiredRoles={["ROLE_ADMIN"]}>
                    <CreateTasks />
                  </authService.RequireAuth>
                }
              />
              {/* Task Routes */}
              <Route
                path="event/:eventId/tasks"
                element={
                  <authService.RequireAuth requiredRoles={["ROLE_ADMIN"]}>
                    <EventTasks />
                  </authService.RequireAuth>
                }
              />

              <Route
                path="task/:taskId/messages"
                element={
                  <authService.RequireAuth requiredRoles={["ROLE_ADMIN"]}>
                    <TaskMessages />
                  </authService.RequireAuth>
                }
              />
              {/* End of Task Routes */}
            </Route>
            {/* End of Admin Routes */}

            {/* Manager Routes */}
            <Route path="/manager/*" element={<ManagerDashboardLayout />}>
              <Route
                path=":username"
                element={
                  <authService.RequireAuth requiredRoles={["ROLE_MANAGER"]}>
                    <Manager />
                  </authService.RequireAuth>
                }
              />
              {/* Task Routes */}
              <Route
                path="event/:eventId/tasks"
                element={
                  <authService.RequireAuth requiredRoles={["ROLE_MANAGER"]}>
                    <EventTasks />
                  </authService.RequireAuth>
                }
              />

              <Route
                path="task/:taskId/messages"
                element={
                  <authService.RequireAuth requiredRoles={["ROLE_MANAGER"]}>
                    <TaskMessages />
                  </authService.RequireAuth>
                }
              />
              {/* End of Task Routes */}
            </Route>
            {/* End of Manager Routes */}

            {/* User Routes */}
            <Route path="/user/*" element={<UserDashboardLayout />}>
              <Route
                path=":username"
                element={
                  <authService.RequireAuth requiredRoles={["ROLE_USER"]}>
                    <User />
                  </authService.RequireAuth>
                }
              />
              <Route
                path=":userId/tickets"
                element={
                  <authService.RequireAuth requiredRoles={["ROLE_USER"]}>
                    <UserTickets />
                  </authService.RequireAuth>
                }
              />
            </Route>
            {/* End of User Routes */}
          </Routes>
          <Toaster />
        </ThemeProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
