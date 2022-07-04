import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../components/Layout";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useMountedEffect } from "../hooks/useMountedEffect";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useMountedEffect(() => {
    /** Helps with migration from old react hashrouter */
    if (window.location.href.includes("/#/")) {
      router.replace(window.location.href.replace("/#/", "/"));
    }
  }, [router.asPath]);

  return (
    <Layout>
      <AnimatePresence
        exitBeforeEnter
        initial={false}
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <Component {...pageProps} key={router.asPath} />
      </AnimatePresence>
    </Layout>
  );
}

export default MyApp;
