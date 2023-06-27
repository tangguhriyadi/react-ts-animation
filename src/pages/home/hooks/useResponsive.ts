import { useState, useEffect } from "react";

interface ResponsiveState {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
}

const useResponsive = (): ResponsiveState => {
    const [isMobile, setIsmobile] = useState<boolean>(false);
    const [isTablet, setIsTablet] = useState<boolean>(false);
    const [isDesktop, setIsDesktop] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = (): void => {
            if (window.innerWidth < 480) {
                setIsmobile(true);
                setIsTablet(false);
                setIsDesktop(false);
            } else if (window.innerWidth < 768) {
                setIsmobile(false);
                setIsTablet(true);
                setIsDesktop(false);
            } else {
                setIsmobile(false);
                setIsTablet(false);
                setIsDesktop(true);
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return { isMobile, isTablet, isDesktop };
};

export default useResponsive;
