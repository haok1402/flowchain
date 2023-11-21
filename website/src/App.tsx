import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import { AnimateProvider } from "./contexts/Animate";
import { FirebaseProvider } from "./contexts/Firebase";
import { NotificationProvider } from "./contexts/Notification";
import { ThemeProvider } from "./contexts/Theme";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <ThemeProvider>
      <AnimateProvider>
        <NotificationProvider>
          <FirebaseProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route element={<PrivateRoute />}>
                  <Route path="dashboard" element={<div>Dashboard</div>} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
          </FirebaseProvider>
        </NotificationProvider>
      </AnimateProvider>
    </ThemeProvider>
  );
};

export default App;
