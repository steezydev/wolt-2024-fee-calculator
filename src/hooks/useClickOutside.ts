import { useEffect, useRef } from 'react';

/**
 * useClickOutside Hook
 *
 * @param callback - Function to call on click outside
 * @returns - A ref to attach to the target element
 */
function useClickOutside<T extends HTMLElement = HTMLElement>(
    callback: (e: MouseEvent | TouchEvent) => void
): React.RefObject<T> {
    const ref = useRef<T>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback(event);
            }
        };

        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);

        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [ref, callback]);

    return ref;
}

export default useClickOutside;
