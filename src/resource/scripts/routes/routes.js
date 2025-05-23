import LoginPage from '../pages/auth/login/login-page';
import DashboardPage from '../pages/dashboard/dashboard-page';
import PracticePage from '../pages/practice/practice-page';

const routes = {
  '/login': new LoginPage(),
  
  '/dashboard': new DashboardPage(),
  '/practice': new PracticePage(),
};

export default routes;
