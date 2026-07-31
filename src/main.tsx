
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import PrivacyPolicy from "./app/PrivacyPolicy.tsx";
  import TermsConditions from "./app/TermsConditions.tsx";
  import BookACall from "./app/BookACall.tsx";
  import Booked from "./app/Booked.tsx";
  import Checkout from "./app/Checkout.tsx";
  import ThankYou from "./app/ThankYou.tsx";
  import Apply from "./app/Apply.tsx";
  import ThankYouForApplying from "./app/ThankYouForApplying.tsx";
  import "./styles/index.css";

  function resolvePage() {
    switch (window.location.pathname) {
      case "/privacy-policy":
        return <PrivacyPolicy />;
      case "/terms-conditions":
        return <TermsConditions />;
      case "/book-a-call":
        return <BookACall />;
      case "/booked":
        return <Booked />;
      case "/checkout":
        return <Checkout />;
      case "/thank-you":
        return <ThankYou />;
      case "/apply":
        return <Apply />;
      case "/thank-you-for-applying":
        return <ThankYouForApplying />;
      default:
        return <App />;
    }
  }

  createRoot(document.getElementById("root")!).render(resolvePage());
