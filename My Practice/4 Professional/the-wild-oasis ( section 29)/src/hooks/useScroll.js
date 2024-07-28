import { useEffect, useRef, useState } from "react";

export function useScroll() {
  const [showMenu, setShowMenu] = useState(true);
  console.log(showMenu);
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollThreshold = 2; // Adjust this threshold as needed

      setShowMenu(scrollY <= scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showMenu]);

  return showMenu;

  //   const menuRef = useRef(null);
  //   const [isVisible, setIsVisible] = useState(true);
  //   const observeElement = menuRef.current;
  //   useEffect(() => {
  //     const observer = new IntersectionObserver(([entry]) => {
  //       setIsVisible(entry.isIntersecting);
  //     });

  //     if (menuRef.current) {
  //       observer.observe(menuRef.current);
  //     }

  //     return () => {
  //       observer.unobserve(observeElement);
  //     };
  //   }, []);
  //   return menuRef;
  // }
}
