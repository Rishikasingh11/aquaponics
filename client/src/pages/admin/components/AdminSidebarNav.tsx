import { Link } from "react-router-dom";

const routes = [
  { path: "/admin/create-event", text: "Create Event" },
  { path: "/admin/manage-events", text: "Manage Events" },
];

const AdminSidebarNav = () => {
  return (
    <div className="mt-5">
      <ul className="space-y-2.5">
        {routes.map((route, index) => (
          <li key={index}>
            <Link
              className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-neutral-900 dark:text-neutral-50 rounded-lg dark:bg-secondary dark:hover:bg-neutral-900 dark:hover:text-neutral-300"
              to={route.path}
            >
              {route.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminSidebarNav;
