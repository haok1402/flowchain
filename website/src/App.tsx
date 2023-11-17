import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./contexts/Theme";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    errorElement: <NotFound />,
  },
]);

const App = () => {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
