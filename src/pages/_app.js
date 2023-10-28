import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "@/styles/globals.css";
import Image from "next/image";
import Loader from "@/components/Loading/Loader.js";
import Bg from "@components/BG/bg";


export default function App({ Component, pageProps }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let timer;
        const handleComplete = () => (timer = setTimeout(() => setLoading(false), 1000));
        const handleStart = () => {
            if (timer) {
                clearTimeout(timer);
            }
            setLoading(true);
        };

        router.events.on("routeChangeStart", handleStart);
        router.events.on("routeChangeComplete", handleComplete);
        router.events.on("routeChangeError", handleComplete);

        return () => {
            router.events.off("routeChangeStart", handleStart);
            router.events.off("routeChangeComplete", handleComplete);
            router.events.off("routeChangeError", handleComplete);
        };
    }, [router.events]);
    return (
        <main>
            <Bg/>
            {loading ? <Loader /> : <Component {...pageProps} />}
            <div className="flex-center w-full bg-njathbg h-fit">
            <Image
            src="/assets/foot_cap.svg"
            alt="footer caption"
            height={29}
            width={565}
            className="foot_cap"
            />
            </div>
        </main>
    );
}
