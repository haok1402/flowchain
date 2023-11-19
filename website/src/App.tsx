import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { AnimateProvider } from "./contexts/Animate";
import { ThemeProvider } from "./contexts/Theme";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";

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
      <AnimateProvider>
        <RouterProvider router={router} />
      </AnimateProvider>
    </ThemeProvider>
  );
};

export default App;
