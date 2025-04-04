import { useEffect } from "react";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Prevent duplicate script injection
    if (!document.querySelector("script[data-account='8V0GARqqgp']")) {
      const script = document.createElement("script");
      script.setAttribute("src", "https://cdn.userway.org/widget.js");
      script.setAttribute("data-account", "8V0GARqqgp");
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  return <Component {...pageProps} />;
}
