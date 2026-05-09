// import { Routes, Route, Navigate } from "react-router-dom";
// import { Component } from "react";
// import LandingPage from "./pages/LandingPage";
// import PublicJobs from "./pages/Publicjobs";
// import PublicCompanies from "./pages/Publiccompanies";
// import PublicServices from "./pages/Publicservices";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Jobs from "./pages/Jobs";
// import ApplyJob from "./pages/ApplyJob";
// import HrDashboard from "./pages/HrDashboard";
// import Applicants from "./pages/Applicants";
// import MyApplications from "./pages/MyApplications";
// import CandidateDashboard from "./pages/CandidateDashboard";
// import { useAuth } from "./context/AuthContext";
// import "./styles/animations.css";

// // Error Boundary Component
// class ErrorBoundary extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false, error: null };
//   }

//   static getDerivedStateFromError(error) {
//     return { hasError: true, error };
//   }

//   componentDidCatch(error, errorInfo) {
//     console.error("Error Boundary Caught:", error, errorInfo);
//   }

//   render() {
//     if (this.state.hasError) {
//       return (
//         <div style={{ textAlign: "center", padding: "50px" }}>
//           <h2>Something went wrong!</h2>
//           <p>{this.state.error?.message || "An unexpected error occurred."}</p>
//           <button onClick={() => window.location.reload()}>Reload Page</button>
//         </div>
//       );
//     }

//     return this.props.children;
//   }
// }

// function App() {
//   const { user, isAuthenticated, isHR, isCandidate } = useAuth();

//   console.log("App.jsx - Auth state:", { user, isAuthenticated, isHR, isCandidate });

//   return (
//     <Routes>
//       {/* LANDING PAGE - Public route (root path) */}
//       <Route 
//         path="/" 
//         element={
//           isAuthenticated ? (
//             <Navigate to={isHR ? "/hr/dashboard" : "/candidate/dashboard"} replace />
//           ) : (
//             <LandingPage />
//           )
//         } 
//       />

//       {/* PUBLIC PAGES - Jobs, Companies, Services */}
//       <Route path="/public-jobs" element={<PublicJobs />} />
//       <Route path="/public-companies" element={<PublicCompanies />} />
//       <Route path="/public-services" element={<PublicServices />} />

//       {/* PUBLIC ROUTES - Login & Signup */}
//       <Route 
//         path="/login" 
//         element={
//           isAuthenticated ? (
//             <Navigate to={isHR ? "/hr/dashboard" : "/candidate/dashboard"} replace />
//           ) : (
//             <Login />
//           )
//         } 
//       />
      
//       <Route 
//         path="/signup" 
//         element={
//           isAuthenticated ? (
//             <Navigate to={isHR ? "/hr/dashboard" : "/candidate/dashboard"} replace />
//           ) : (
//             <Signup />
//           )
//         } 
//       />

//       {/* CANDIDATE ROUTES */}
//       <Route
//         path="/candidate/dashboard"
//         element={isCandidate ? <CandidateDashboard /> : <Navigate to="/login" replace />}
//       />

//       <Route
//         path="/jobs"
//         element={isCandidate ? <Jobs /> : <Navigate to="/login" replace />}
//       />

//       <Route
//         path="/apply/:jobId"
//         element={isCandidate ? <ApplyJob /> : <Navigate to="/login" replace />}
//       />

//       <Route
//         path="/my-applications"
//         element={isCandidate ? <MyApplications /> : <Navigate to="/login" replace />}
//       />

//       {/* HR ROUTES */}
//       <Route
//         path="/hr/dashboard"
//         element={
//           isHR ? (
//             <ErrorBoundary>
//               <HrDashboard />
//             </ErrorBoundary>
//           ) : (
//             <Navigate to="/login" replace />
//           )
//         }
//       />

//       <Route
//         path="/applicants/:jobId"
//         element={isHR ? <Applicants /> : <Navigate to="/login" replace />}
//       />

//       {/* FALLBACK - Redirect unknown routes */}
//       <Route
//         path="*"
//         element={
//           isAuthenticated ? (
//             <Navigate to={isHR ? "/hr/dashboard" : "/candidate/dashboard"} replace />
//           ) : (
//             <Navigate to="/" replace />
//           )
//         }
//       />
//     </Routes>
//   );
// }

// export default App;

// import { Routes, Route, Navigate } from "react-router-dom";
// import { Component } from "react";
// import LandingPage from "./pages/LandingPage";
// import ProOfferPage from "./pages/ProOfferPage"; // NEW
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Jobs from "./pages/Jobs";
// import ApplyJob from "./pages/ApplyJob";
// import HrDashboard from "./pages/HrDashboard";
// import Applicants from "./pages/Applicants";
// import MyApplications from "./pages/MyApplications";
// import CandidateDashboard from "./pages/CandidateDashboard";
// import { useAuth } from "./context/AuthContext";
// import "./styles/animations.css";

// // Error Boundary Component
// class ErrorBoundary extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false, error: null };
//   }

//   static getDerivedStateFromError(error) {
//     return { hasError: true, error };
//   }

//   componentDidCatch(error, errorInfo) {
//     console.error("Error Boundary Caught:", error, errorInfo);
//   }

//   render() {
//     if (this.state.hasError) {
//       return (
//         <div style={{ textAlign: "center", padding: "50px" }}>
//           <h2>Something went wrong!</h2>
//           <p>{this.state.error?.message || "An unexpected error occurred."}</p>
//           <button onClick={() => window.location.reload()}>Reload Page</button>
//         </div>
//       );
//     }

//     return this.props.children;
//   }
// }

// function App() {
//   const { user, isAuthenticated, isHR, isCandidate } = useAuth();

//   console.log("App.jsx - Auth state:", { user, isAuthenticated, isHR, isCandidate });

//   return (
//     <Routes>
//       {/* LANDING PAGE - Public route (root path) */}
//       <Route 
//         path="/" 
//         element={
//           isAuthenticated ? (
//             <Navigate to={isHR ? "/hr/dashboard" : "/candidate/dashboard"} replace />
//           ) : (
//             <LandingPage />
//           )
//         } 
//       />

//       {/* PRO OFFER PAGE - Public route */}
//       <Route path="/pro-offer" element={<ProOfferPage />} />

//       {/* PUBLIC ROUTES */}
//       <Route 
//         path="/login" 
//         element={
//           isAuthenticated ? (
//             <Navigate to={isHR ? "/hr/dashboard" : "/candidate/dashboard"} replace />
//           ) : (
//             <Login />
//           )
//         } 
//       />
      
//       <Route 
//         path="/signup" 
//         element={
//           isAuthenticated ? (
//             <Navigate to={isHR ? "/hr/dashboard" : "/candidate/dashboard"} replace />
//           ) : (
//             <Signup />
//           )
//         } 
//       />

//       {/* CANDIDATE ROUTES */}
//       <Route
//         path="/candidate/dashboard"
//         element={isCandidate ? <CandidateDashboard /> : <Navigate to="/login" replace />}
//       />

//       <Route
//         path="/jobs"
//         element={isCandidate ? <Jobs /> : <Navigate to="/login" replace />}
//       />

//       <Route
//         path="/apply/:jobId"
//         element={isCandidate ? <ApplyJob /> : <Navigate to="/login" replace />}
//       />

//       <Route
//         path="/my-applications"
//         element={isCandidate ? <MyApplications /> : <Navigate to="/login" replace />}
//       />

//       {/* HR ROUTES */}
//       <Route
//         path="/hr/dashboard"
//         element={
//           isHR ? (
//             <ErrorBoundary>
//               <HrDashboard />
//             </ErrorBoundary>
//           ) : (
//             <Navigate to="/login" replace />
//           )
//         }
//       />

//       <Route
//         path="/applicants/:jobId"
//         element={isHR ? <Applicants /> : <Navigate to="/login" replace />}
//       />

//       {/* FALLBACK - Redirect unknown routes */}
//       <Route
//         path="*"
//         element={
//           isAuthenticated ? (
//             <Navigate to={isHR ? "/hr/dashboard" : "/candidate/dashboard"} replace />
//           ) : (
//             <Navigate to="/" replace />
//           )
//         }
//       />
//     </Routes>
//   );
// }

// export default App;

// import { Routes, Route, Navigate } from "react-router-dom";
// import { Component } from "react";
// import LandingPage from "./pages/LandingPage";
// import ProOfferPage from "./pages/ProOfferPage";
// import PublicJobs from "./pages/Publicjobs";
// import PublicCompanies from "./pages/Publiccompanies";
// import PublicServices from "./pages/Publicservices";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Jobs from "./pages/Jobs";
// import ApplyJob from "./pages/ApplyJob";
// import HrDashboard from "./pages/HrDashboard";
// import Applicants from "./pages/Applicants";
// import MyApplications from "./pages/MyApplications";
// import CandidateDashboard from "./pages/CandidateDashboard";
// import { useAuth } from "./context/AuthContext";
// import "./styles/animations.css";

// // Error Boundary Component
// class ErrorBoundary extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false, error: null };
//   }

//   static getDerivedStateFromError(error) {
//     return { hasError: true, error };
//   }

//   componentDidCatch(error, errorInfo) {
//     console.error("Error Boundary Caught:", error, errorInfo);
//   }

//   render() {
//     if (this.state.hasError) {
//       return (
//         <div style={{ textAlign: "center", padding: "50px" }}>
//           <h2>Something went wrong!</h2>
//           <p>{this.state.error?.message || "An unexpected error occurred."}</p>
//           <button onClick={() => window.location.reload()}>Reload Page</button>
//         </div>
//       );
//     }

//     return this.props.children;
//   }
// }

// function App() {
//   const { user, isAuthenticated, isHR, isCandidate } = useAuth();

//   console.log("App.jsx - Auth state:", { user, isAuthenticated, isHR, isCandidate });

//   return (
//     <Routes>
//       {/* LANDING PAGE - Public route (root path) */}
//       <Route 
//         path="/" 
//         element={
//           isAuthenticated ? (
//             <Navigate to={isHR ? "/hr/dashboard" : "/candidate/dashboard"} replace />
//           ) : (
//             <LandingPage />
//           )
//         } 
//       />

//       {/* PRO OFFER PAGE - Public route */}
//       <Route path="/pro-offer" element={<ProOfferPage />} />

//       {/* PUBLIC PAGES - Jobs, Companies, Services */}
//       <Route path="/public-jobs" element={<PublicJobs />} />
//       <Route path="/public-companies" element={<PublicCompanies />} />
//       <Route path="/public-services" element={<PublicServices />} />

//       {/* PUBLIC ROUTES - Login & Signup */}
//       <Route 
//         path="/login" 
//         element={
//           isAuthenticated ? (
//             <Navigate to={isHR ? "/hr/dashboard" : "/candidate/dashboard"} replace />
//           ) : (
//             <Login />
//           )
//         } 
//       />
      
//       <Route 
//         path="/signup" 
//         element={
//           isAuthenticated ? (
//             <Navigate to={isHR ? "/hr/dashboard" : "/candidate/dashboard"} replace />
//           ) : (
//             <Signup />
//           )
//         } 
//       />

//       {/* CANDIDATE ROUTES */}
//       <Route
//         path="/candidate/dashboard"
//         element={isCandidate ? <CandidateDashboard /> : <Navigate to="/login" replace />}
//       />

//       <Route
//         path="/jobs"
//         element={isCandidate ? <Jobs /> : <Navigate to="/login" replace />}
//       />

//       <Route
//         path="/apply/:jobId"
//         element={isCandidate ? <ApplyJob /> : <Navigate to="/login" replace />}
//       />

//       <Route
//         path="/my-applications"
//         element={isCandidate ? <MyApplications /> : <Navigate to="/login" replace />}
//       />

//       {/* HR ROUTES */}
//       <Route
//         path="/hr/dashboard"
//         element={
//           isHR ? (
//             <ErrorBoundary>
//               <HrDashboard />
//             </ErrorBoundary>
//           ) : (
//             <Navigate to="/login" replace />
//           )
//         }
//       />

//       <Route
//         path="/applicants/:jobId"
//         element={isHR ? <Applicants /> : <Navigate to="/login" replace />}
//       />

//       {/* FALLBACK - Redirect unknown routes */}
//       <Route
//         path="*"
//         element={
//           isAuthenticated ? (
//             <Navigate to={isHR ? "/hr/dashboard" : "/candidate/dashboard"} replace />
//           ) : (
//             <Navigate to="/" replace />
//           )
//         }
//       />
//     </Routes>
//   );
// }

// export default App;




// import { Routes, Route, Navigate } from "react-router-dom";
// import { Component } from "react";
// import LandingPage from "./pages/LandingPage";
// import PublicJobs from "./pages/PublicJobs";
// import PublicCompanies from "./pages/PublicCompanies";
// import PublicServices from "./pages/PublicServices";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import Privacy from "./pages/Privacy";
// import Help from "./pages/Help";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Jobs from "./pages/Jobs";
// import ApplyJob from "./pages/ApplyJob";
// import HrDashboard from "./pages/HrDashboard";
// import Applicants from "./pages/Applicants";
// import MyApplications from "./pages/MyApplications";
// import CandidateDashboard from "./pages/CandidateDashboard";
// import { useAuth } from "./context/AuthContext";
// import "./styles/animations.css";

// // Error Boundary Component
// class ErrorBoundary extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false, error: null };
//   }

//   static getDerivedStateFromError(error) {
//     return { hasError: true, error };
//   }

//   componentDidCatch(error, errorInfo) {
//     console.error("Error Boundary Caught:", error, errorInfo);
//   }

//   render() {
//     if (this.state.hasError) {
//       return (
//         <div style={{ textAlign: "center", padding: "50px" }}>
//           <h2>Something went wrong!</h2>
//           <p>{this.state.error?.message || "An unexpected error occurred."}</p>
//           <button onClick={() => window.location.reload()}>Reload Page</button>
//         </div>
//       );
//     }

//     return this.props.children;
//   }
// }

// function App() {
//   const { user, isAuthenticated, isHR, isCandidate } = useAuth();

//   console.log("App.jsx - Auth state:", { user, isAuthenticated, isHR, isCandidate });

//   return (
//     <Routes>
//       {/* LANDING PAGE - Public route (root path) */}
//       <Route 
//         path="/" 
//         element={
//           isAuthenticated ? (
//             <Navigate to={isHR ? "/hr/dashboard" : "/candidate/dashboard"} replace />
//           ) : (
//             <LandingPage />
//           )
//         } 
//       />

//       {/* PUBLIC PAGES - Jobs, Companies, Services */}
//       <Route path="/public-jobs" element={<PublicJobs />} />
//       <Route path="/public-companies" element={<PublicCompanies />} />
//       <Route path="/public-services" element={<PublicServices />} />

//       {/* FOOTER PAGES - About, Contact, Privacy, Help */}
//       <Route path="/about" element={<About />} />
//       <Route path="/contact" element={<Contact />} />
//       <Route path="/privacy" element={<Privacy />} />
//       <Route path="/help" element={<Help />} />

//       {/* PUBLIC ROUTES - Login & Signup */}
//       <Route 
//         path="/login" 
//         element={
//           isAuthenticated ? (
//             <Navigate to={isHR ? "/hr/dashboard" : "/candidate/dashboard"} replace />
//           ) : (
//             <Login />
//           )
//         } 
//       />
      
//       <Route 
//         path="/signup" 
//         element={
//           isAuthenticated ? (
//             <Navigate to={isHR ? "/hr/dashboard" : "/candidate/dashboard"} replace />
//           ) : (
//             <Signup />
//           )
//         } 
//       />

//       {/* CANDIDATE ROUTES */}
//       <Route
//         path="/candidate/dashboard"
//         element={isCandidate ? <CandidateDashboard /> : <Navigate to="/login" replace />}
//       />

//       <Route
//         path="/jobs"
//         element={isCandidate ? <Jobs /> : <Navigate to="/login" replace />}
//       />

//       <Route
//         path="/apply/:jobId"
//         element={isCandidate ? <ApplyJob /> : <Navigate to="/login" replace />}
//       />

//       <Route
//         path="/my-applications"
//         element={isCandidate ? <MyApplications /> : <Navigate to="/login" replace />}
//       />

//       {/* HR ROUTES */}
//       <Route
//         path="/hr/dashboard"
//         element={
//           isHR ? (
//             <ErrorBoundary>
//               <HrDashboard />
//             </ErrorBoundary>
//           ) : (
//             <Navigate to="/login" replace />
//           )
//         }
//       />

//       <Route
//         path="/applicants/:jobId"
//         element={isHR ? <Applicants /> : <Navigate to="/login" replace />}
//       />

//       {/* FALLBACK - Redirect unknown routes */}
//       <Route
//         path="*"
//         element={
//           isAuthenticated ? (
//             <Navigate to={isHR ? "/hr/dashboard" : "/candidate/dashboard"} replace />
//           ) : (
//             <Navigate to="/" replace />
//           )
//         }
//       />
//     </Routes>
//   );
// }

// export default App;

// import { Routes, Route, Navigate } from "react-router-dom";
// import { Component } from "react";
// import LandingPage from "./pages/LandingPage";
// import ProOfferPage from "./pages/ProOfferPage";
// import PublicJobs from "./pages/PublicJobs";
// import PublicCompanies from "./pages/PublicCompanies";
// import PublicServices from "./pages/PublicServices";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import Privacy from "./pages/Privacy";
// import Help from "./pages/Help";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Jobs from "./pages/Jobs";
// import ApplyJob from "./pages/ApplyJob";
// import HrDashboard from "./pages/HrDashboard";
// import Applicants from "./pages/Applicants";
// import MyApplications from "./pages/MyApplications";
// import CandidateDashboard from "./pages/CandidateDashboard";
// import { useAuth } from "./context/AuthContext";
// import "./styles/animations.css";

// // Error Boundary Component
// class ErrorBoundary extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false, error: null };
//   }

//   static getDerivedStateFromError(error) {
//     return { hasError: true, error };
//   }

//   componentDidCatch(error, errorInfo) {
//     console.error("Error Boundary Caught:", error, errorInfo);
//   }

//   render() {
//     if (this.state.hasError) {
//       return (
//         <div style={{ textAlign: "center", padding: "50px" }}>
//           <h2>Something went wrong!</h2>
//           <p>{this.state.error?.message || "An unexpected error occurred."}</p>
//           <button onClick={() => window.location.reload()}>Reload Page</button>
//         </div>
//       );
//     }

//     return this.props.children;
//   }
// }

// function App() {
//   const { user, isAuthenticated, isHR, isCandidate } = useAuth();

//   console.log("App.jsx - Auth state:", { user, isAuthenticated, isHR, isCandidate });

//   return (
//     <Routes>
//       {/* LANDING PAGE - Public route (root path) */}
//       <Route 
//         path="/" 
//         element={
//           isAuthenticated ? (
//             <Navigate to={isHR ? "/hr/dashboard" : "/candidate/dashboard"} replace />
//           ) : (
//             <LandingPage />
//           )
//         } 
//       />

//       {/* PRO OFFER PAGE - Public route */}
//       <Route path="/pro-offer" element={<ProOfferPage />} />

//       {/* PUBLIC PAGES - Jobs, Companies, Services */}
//       <Route path="/public-jobs" element={<PublicJobs />} />
//       <Route path="/public-companies" element={<PublicCompanies />} />
//       <Route path="/public-services" element={<PublicServices />} />

//       {/* FOOTER PAGES - About, Contact, Privacy, Help */}
//       <Route path="/about" element={<About />} />
//       <Route path="/contact" element={<Contact />} />
//       <Route path="/privacy" element={<Privacy />} />
//       <Route path="/help" element={<Help />} />

//       {/* PUBLIC ROUTES - Login & Signup */}
//       <Route 
//         path="/login" 
//         element={
//           isAuthenticated ? (
//             <Navigate to={isHR ? "/hr/dashboard" : "/candidate/dashboard"} replace />
//           ) : (
//             <Login />
//           )
//         } 
//       />
      
//       <Route 
//         path="/signup" 
//         element={
//           isAuthenticated ? (
//             <Navigate to={isHR ? "/hr/dashboard" : "/candidate/dashboard"} replace />
//           ) : (
//             <Signup />
//           )
//         } 
//       />

//       {/* CANDIDATE ROUTES */}
//       <Route
//         path="/candidate/dashboard"
//         element={isCandidate ? <CandidateDashboard /> : <Navigate to="/login" replace />}
//       />

//       <Route
//         path="/jobs"
//         element={isCandidate ? <Jobs /> : <Navigate to="/login" replace />}
//       />

//       <Route
//         path="/apply/:jobId"
//         element={isCandidate ? <ApplyJob /> : <Navigate to="/login" replace />}
//       />

//       <Route
//         path="/my-applications"
//         element={isCandidate ? <MyApplications /> : <Navigate to="/login" replace />}
//       />

//       {/* HR ROUTES */}
//       <Route
//         path="/hr/dashboard"
//         element={
//           isHR ? (
//             <ErrorBoundary>
//               <HrDashboard />
//             </ErrorBoundary>
//           ) : (
//             <Navigate to="/login" replace />
//           )
//         }
//       />

//       <Route
//         path="/applicants/:jobId"
//         element={isHR ? <Applicants /> : <Navigate to="/login" replace />}
//       />

//       {/* FALLBACK - Redirect unknown routes */}
//       <Route
//         path="*"
//         element={
//           isAuthenticated ? (
//             <Navigate to={isHR ? "/hr/dashboard" : "/candidate/dashboard"} replace />
//           ) : (
//             <Navigate to="/" replace />
//           )
//         }
//       />
//     </Routes>
//   );
// }

// export default App;


import { Routes, Route, Navigate } from "react-router-dom";
import { Component } from "react";

import LandingPage from "./pages/LandingPage";
import ProOfferPage from "./pages/ProOfferPage";
import PublicJobs from "./pages/PublicJobs";
import PublicCompanies from "./pages/PublicCompanies";
import PublicServices from "./pages/PublicServices";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Help from "./pages/Help";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Jobs from "./pages/Jobs";
import ApplyJob from "./pages/ApplyJob";
import MyApplications from "./pages/MyApplications";

import CandidateDashboard from "./pages/CandidateDashboard";
import CandidateProfile from "./pages/CandidateProfile";

import HrDashboard from "./pages/HrDashboard";
import Applicants from "./pages/Applicants";

import { useAuth } from "./context/AuthContext";
import "./styles/animations.css";

/* =========================
   Error Boundary
========================= */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error Boundary Caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ textAlign: "center", padding: "50px" }}>
          <h2>Something went wrong!</h2>
          <p>{this.state.error?.message || "Unexpected error occurred."}</p>
          <button onClick={() => window.location.reload()}>
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

/* =========================
   App Routes
========================= */
function App() {
  const { user, isAuthenticated, isHR, isCandidate } = useAuth();

  console.log("Auth State:", { user, isAuthenticated, isHR, isCandidate });

  return (
    <Routes>
      {/* ROOT */}
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate
              to={isHR ? "/hr/dashboard" : "/candidate/dashboard"}
              replace
            />
          ) : (
            <LandingPage />
          )
        }
      />

      {/* PUBLIC PAGES */}
      <Route path="/pro-offer" element={<ProOfferPage />} />
      <Route path="/public-jobs" element={<PublicJobs />} />
      <Route path="/public-companies" element={<PublicCompanies />} />
      <Route path="/public-services" element={<PublicServices />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/help" element={<Help />} />

      {/* AUTH */}
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate
              to={isHR ? "/hr/dashboard" : "/candidate/dashboard"}
              replace
            />
          ) : (
            <Login />
          )
        }
      />

      <Route
        path="/signup"
        element={
          isAuthenticated ? (
            <Navigate
              to={isHR ? "/hr/dashboard" : "/candidate/dashboard"}
              replace
            />
          ) : (
            <Signup />
          )
        }
      />

      {/* CANDIDATE */}
      <Route
        path="/candidate/dashboard"
        element={
          isCandidate ? <CandidateDashboard /> : <Navigate to="/login" />
        }
      />

      <Route
        path="/candidate/profile"
        element={
          isCandidate ? <CandidateProfile /> : <Navigate to="/login" />
        }
      />

      <Route
        path="/jobs"
        element={isCandidate ? <Jobs /> : <Navigate to="/login" />}
      />

      <Route
        path="/apply/:jobId"
        element={isCandidate ? <ApplyJob /> : <Navigate to="/login" />}
      />

      <Route
        path="/my-applications"
        element={isCandidate ? <MyApplications /> : <Navigate to="/login" />}
      />

      {/* HR */}
      <Route
        path="/hr/dashboard"
        element={
          isHR ? (
            <ErrorBoundary>
              <HrDashboard />
            </ErrorBoundary>
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path="/applicants/:jobId"
        element={isHR ? <Applicants /> : <Navigate to="/login" />}
      />

      {/* FALLBACK */}
      <Route
        path="*"
        element={
          isAuthenticated ? (
            <Navigate
              to={isHR ? "/hr/dashboard" : "/candidate/dashboard"}
              replace
            />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
    </Routes>
  );
}

export default App;
