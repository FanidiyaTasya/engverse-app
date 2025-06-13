import LoginPage from "../pages/auth/login/login-page";
import RegisterPage from "../pages/auth/register/register-page";
import DashboardPage from "../pages/dashboard/dashboard-page";
import PracticePage from "../pages/practice/practice-page";
import ReadingPage from "../pages/quiz-page/reading-page";
// import ResultPage from '../pages/result/result-page';
import ListeningPage from "../pages/quiz-page/listening-page";
import StructurePage from "../pages/quiz-page/structure-page";
import ListeningResultPage from "../pages/result/listening-result-page";
import StructureResultPage from "../pages/result/structure-result-page";
import ReadingResultPage from "../pages/result/reading-result-page";

const routes = {
  "/login": new LoginPage(),
  "/register": new RegisterPage(),

  "/dashboard": new DashboardPage(),
  "/practice": new PracticePage(),
  "/reading": new ReadingPage(),
  "/listening": new ListeningPage(),
  "/structure": new StructurePage(),
  // '/result': new ResultPage(),
  "/result-listening": new ListeningResultPage(),
  "/result-structure": new StructureResultPage(),
  "/result-reading": new ReadingResultPage(),
};

export default routes;
