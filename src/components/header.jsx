import React from 'react';
import { useLocation } from 'react-router';
import { links } from '../routes';

function findRouteByPath(routes, path) {
  for (const route of Object.values(routes)) {
    if (route.path === path) return route;
    if (route.children) {
      const nestedRoute = findRouteByPath(route.children, path);
      if (nestedRoute) return nestedRoute;
    }

    if (route.path === "/video-resources") {
      const match = path.match(/\/video-resources\/(\d+)/);
      if (match) {
        return { title: `Video Resources`, path: path };
      }
    } else if (route.path === "/video/:id" || route.path === "/video") { 
      const match = path.match(/\/video\/(\d+)/);
      if (match) {
        return { title: `Video`, path: path };
      }
    }
    else if (route.path === "/submission-manager/:id" || route.path === "/submission-manager") { 
      const match = path.match(/\/submission-manager\/(\d+)/);
      if (match) {
        return { title: `Submission`, path: path };
      }
    }
  }
  return null;
}

function Header() {
  const location = useLocation();
  const currentPage = findRouteByPath(links, location.pathname);
  const pageTitle = currentPage ? currentPage.title : "Unknown Page";

  return (
    <div className="flex w-full h-12 border-b-[1px] border-b-gray-300 place-items-center px-2 font-semibold">
      {pageTitle}
    </div>
  );
}

export default Header;