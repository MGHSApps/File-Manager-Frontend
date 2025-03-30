import React, { useState, useEffect } from "react";
import { useLocation, NavLink, useNavigate } from "react-router"; // Updated import
import { links } from "../routes";
import { IoClose, IoChevronDown, IoChevronUp } from "react-icons/io5";
import { getFolders } from "../services/videoManagerService";

function Submenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState({});
  const [folders, setFolders] = useState([]);
  const [role, setRole] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const hasChildren = (route) =>
    route?.children || (route.path === "/video-resources" && folders.length > 0);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const fetchedFolders = await getFolders();
        setFolders(fetchedFolders);
      } catch (error) {
        console.error("Error fetching folders:", error);
      }
    };

    fetchFolders();
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setRole(parsedUser.role);
    }
  }, []);

  useEffect(() => {
    const newOpenSubmenus = {};
    Object.entries(links).forEach(([key, route]) => {
      if (hasChildren(route)) {
        const isActive =
          (route.children && Object.values(route.children).some((child) => child.path === location.pathname)) ||
          (route.path === "/video-resources" && folders.some((folder) => `/video-resources/${folder.id}` === location.pathname));

        if (isActive) {
          newOpenSubmenus[key] = true;
        }
      }
    });
    setOpenSubmenus(newOpenSubmenus);
  }, [location.pathname, folders]);

  const toggleSubmenu = (key) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div>
      <button
        className="mt-2 md:mt-0 lg:mt-0 p-2 text-left md:hidden z-20 border-b-[1px] border-b-gray-300 w-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "✖ Close" : "☰ Menu"}
      </button>

      <div
        className={`z-20 fixed top-0 left-0 h-screen w-64 border-r-[1px] border-r-gray-300 flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0 md:flex`}
      >
        <button
          className="flex p-2 bg-accent-content w-full text-left md:hidden place-items-center"
          onClick={() => setIsOpen(false)}
        >
          <IoClose /> Close
        </button>

        <ul className="menu bg-accent-content md:bg-transparent lg:bg-transparent menu-md gap-2 h-full w-full">
          {Object.entries(links).map(([key, route]) => {
            if (!route.inSubmenu) return null;
            if (route.requiredRole && route.requiredRole !== role) return null;

            return (
              <li key={key}>
                <div
                  className={`flex items-center justify-between p-2 rounded cursor-pointer ${
                    location.pathname === route.path ? "bg-accent text-white" : ""
                  }`}
                >
                  <NavLink to={route.path} className="flex-1">
                    {route.title}
                  </NavLink>
                  {hasChildren(route) && (
                    <button onClick={() => toggleSubmenu(key)} className="p-2">
                      {openSubmenus[key] ? <IoChevronUp /> : <IoChevronDown />}
                    </button>
                  )}
                </div>
                {route.children && openSubmenus[key] && (
                  <ul className="pl-4">
                    {Object.entries(route.children).map(([childKey, child]) => (
                      <li key={childKey} className="my-2">
                        <NavLink
                          to={child.path}
                          className={({ isActive }) =>
                            `block p-2 rounded ${isActive ? "bg-accent text-white" : ""}`
                          }
                        >
                          {child.title}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
                {route.path === "/video-resources" && openSubmenus[key] && (
                  <ul className="pl-4">
                    {folders.map((folder) => (
                      <li key={folder.id}>
                        <NavLink
                          to={`/video-resources/${folder.id}`}
                          className={({ isActive }) =>
                            `block p-2 rounded ${isActive ? "bg-accent text-white" : ""}`
                          }
                        >
                          {folder.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Submenu;
