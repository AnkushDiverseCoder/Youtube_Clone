import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Routes
import Home from "./pages/Home";
import Video from "./pages/Video";
import SignIn from "./pages/SignIn";
import Root from "./layout/Outlet";
import Search from "./pages/Search";


function App() {

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    // loader: rootLoader,
    children: [
      {
        path: "/",
        element: <Home type="random" />,
      },
      {
        path: "trends",
        element: <Home type="trend" />,
      },
      {
        path: "subscriptions",
        element: <Home type="sub" />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "video/:id",
        element: <Video />,
      },
    ],
  },
  {
     path: "*",
     element: <>
       page Not Found
     </>
  }
]);

