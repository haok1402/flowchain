import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./contexts/Theme";
import { AnimateProvider } from "./contexts/Animate";

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
