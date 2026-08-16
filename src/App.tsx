import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import OnboardingPage from "./pages/OnboardingPage";
import DashboardPage from "./pages/DashboardPage";
import SubscriptionsPage from "./pages/SubscriptionsPage";
import ZombieHunterPage from "./pages/ZombieHunterPage";
import PriceWatchPage from "./pages/PriceWatchPage";
import DuplicateFinderPage from "./pages/DuplicateFinderPage";
import AIInsightsPage from "./pages/AIInsightsPage";
import SavingsPage from "./pages/SavingsPage";
import TransactionsPage from "./pages/TransactionsPage";
import UpcomingPaymentsPage from "./pages/UpcomingPaymentsPage";
import CancellationPage from "./pages/CancellationPage";
import ReportsPage from "./pages/ReportsPage";
import NotificationsPage from "./pages/NotificationsPage";
import BudgetPage from "./pages/BudgetPage";
import FamilyPage from "./pages/FamilyPage";
import SettingsPage from "./pages/SettingsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/app/dashboard" element={<DashboardPage />} />
        <Route path="/app/subscriptions" element={<SubscriptionsPage />} />
        <Route path="/app/zombie-hunter" element={<ZombieHunterPage />} />
        <Route path="/app/price-watch" element={<PriceWatchPage />} />
        <Route path="/app/duplicates" element={<DuplicateFinderPage />} />
        <Route path="/app/ai-insights" element={<AIInsightsPage />} />
        <Route path="/app/savings" element={<SavingsPage />} />
        <Route path="/app/transactions" element={<TransactionsPage />} />
        <Route path="/app/upcoming" element={<UpcomingPaymentsPage />} />
        <Route path="/app/cancellation" element={<CancellationPage />} />
        <Route path="/app/reports" element={<ReportsPage />} />
        <Route path="/app/notifications" element={<NotificationsPage />} />
        <Route path="/app/budget" element={<BudgetPage />} />
        <Route path="/app/family" element={<FamilyPage />} />
        <Route path="/app/settings" element={<SettingsPage />} />
        <Route path="/app/help" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
