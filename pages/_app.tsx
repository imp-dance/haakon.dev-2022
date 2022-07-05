import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../components/Layout";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { useRouter } from "next/router";
import { useMountedEffect } from "../hooks/useMountedEffect";
import { DarkmodeProvider } from "@ryfylke-react/ui";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const setAppHeight = () => {
    if (typeof window !== undefined) {
      const doc = document.documentElement;
      doc.style.setProperty(
        "--app-height",
        `${window.innerHeight}px`
      );
    }
  };

  useEffect(() => {
    window.addEventListener("resize", setAppHeight);
    setAppHeight();
    return () =>
      window.removeEventListener("resize", setAppHeight);
  }, []);

  useMountedEffect(() => {
    /** Helps with migration from old react hashrouter */
    if (window.location.href.includes("/#/")) {
      router.replace(window.location.href.replace("/#/", "/"));
    }
    document.body.style.overflow = "hidden";
  }, [router.asPath]);

  return (
    <DarkmodeProvider>
      <MotionConfig
        reducedMotion="user"
        transition={{
          duration: 0.001,
          delay: 0,
          ease: "linear",
        }}
      >
        <Layout>
          <AnimatePresence
            exitBeforeEnter
            onExitComplete={() => {
              window.scrollTo(0, 0);
              setTimeout(() => {
                document.body.style.overflow = "unset";
              }, 400);
            }}
          >
            <Component {...pageProps} key={router.asPath} />
          </AnimatePresence>
        </Layout>
      </MotionConfig>
    </DarkmodeProvider>
  );
}

export default MyApp;
