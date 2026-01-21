import { useEffect, useState } from 'react';

export const useMediaQuery = (query: string) => {
    const getMatches = () => {
        if (typeof window === 'undefined') return false;
        return window.matchMedia(query).matches;
    };

    const [matches, setMatches] = useState(getMatches);

    useEffect(() => {
        const media = window.matchMedia(query);

        const listener = (e: MediaQueryListEvent) => {
            setMatches(e.matches);
        };

        media.addEventListener('change', listener);
        return () => media.removeEventListener('change', listener);
    }, [query]);

    return matches;
};
