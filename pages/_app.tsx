import {
  DarkmodeProvider,
  ToastProvider,
} from "@ryfylke-react/ui";
import { AnimatePresence, MotionConfig } from "framer-motion";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { useMountedEffect } from "../hooks/useMountedEffect";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [firstRender, setFirstRender] = useState(true);
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
    /** Helps with migration from old react hashrouter (old links/bookmarks) */
    if (window.location.href.includes("/#/")) {
      router.replace(window.location.href.replace("/#/", "/"));
    }
    if (!firstRender) {
      document.body.style.overflow = "hidden";
    } else {
      setFirstRender(true);
    }
  }, [router.asPath]);

  return (
    <DarkmodeProvider>
      <ToastProvider />
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
            <Head>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1, maximum-scale=1"
              ></meta>
            </Head>
            <Component {...pageProps} key={router.asPath} />
          </AnimatePresence>
        </Layout>
      </MotionConfig>
    </DarkmodeProvider>
  );
}

export default MyApp;
