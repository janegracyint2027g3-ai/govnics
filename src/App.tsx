import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "@/pages/Index";
import IndustryDetailPage from "@/pages/IndustryDetailPage";
import ServiceDetailPage from "@/pages/ServiceDetailPage";
import ResourceHubPage from "@/pages/ResourceHubPage";
import ContactPage from "@/pages/ContactPage";
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";
import TermsOfServicePage from "@/pages/TermsOfServicePage";
import CookiePolicyPage from "@/pages/CookiePolicyPage";
import ManageStaffingPage from "@/pages/ManageStaffingPage";
import CyberSecurityPage from "@/pages/CyberSecurityPage";
import AboutPage from "@/pages/AboutPage";
import ESGPage from "@/pages/ESGPage";
import ManpowerServiceDetailPage from "@/pages/ManpowerServiceDetailPage";
import PartnersPage from "@/pages/PartnersPage";
import GrcPage from "@/pages/GrcPage";
import IndustriesPage from "@/pages/IndustriesPage";
import SgrcServiceDetailPage from "@/pages/SgrcServiceDetailPage";
import SgrceLibraryPage from "@/pages/SgrceLibraryPage";
import SgrcEstimatorPage from "@/pages/SgrcEstimatorPage";
import SgrcServicesListPage from "@/pages/SgrcServicesListPage";
import SgrcResourcesListPage from "@/pages/SgrcResourcesListPage";
import AnalyticsPage from "@/pages/AnalyticsPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import CareersPage from "@/pages/CareersPage";
import SolutionsPage from "@/pages/SolutionsPage";
import { AuthProvider } from "@/context/AuthContext";
import { TelemetryTracker } from "@/components/analytics/TelemetryTracker";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TelemetryTracker />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/grc" element={<GrcPage />} />
          <Route path="/cybersecurity" element={<CyberSecurityPage />} />
          <Route path="/esg" element={<ESGPage />} />
          <Route path="/industries" element={<IndustriesPage />} />
          <Route path="/industries/:clusterId" element={<IndustryDetailPage />} />
          <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
          <Route path="/sgrc/services" element={<SgrcServicesListPage />} />
          <Route path="/sgrc/services/:serviceId" element={<SgrcServiceDetailPage />} />
          <Route path="/sgrc/resources" element={<SgrcResourcesListPage />} />
          <Route path="/sgrc/e-library" element={<SgrceLibraryPage />} />
          <Route path="/sgrc/estimator" element={<SgrcEstimatorPage />} />
          <Route path="/resources" element={<ResourceHubPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsOfServicePage />} />
          <Route path="/cookies" element={<CookiePolicyPage />} />
          <Route path="/staffing" element={<ManageStaffingPage />} />
          <Route path="/staffing/:serviceId" element={<ManpowerServiceDetailPage />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

