import { RouterProvider } from 'react-router';
import { router } from './routes/router';
import { ReactLenis, useLenis } from 'lenis/react';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function GSAPSync() {
  const lenis = useLenis();
  
  useEffect(() => {
    if (!lenis) return;
    
    // Notify ScrollTrigger to update every time Lenis scrolls
    lenis.on('scroll', ScrollTrigger.update);

    // Take over the RAF loop using GSAP's ticker to sync perfectly
    function update(time: number) {
      lenis?.raf(time * 1000);
    }
    
    gsap.ticker.add(update);
    // lagSmoothing(0) is required to prevent stuttering on long frames
    gsap.ticker.lagSmoothing(0); 
    
    return () => {
      lenis.off('scroll', ScrollTrigger.update);
      gsap.ticker.remove(update);
    };
  }, [lenis]);

  return null;
}

function App() {
  return (
    <ReactLenis root autoRaf={false}>
      <GSAPSync />
      <RouterProvider router={router} />
    </ReactLenis>
  );
}

export default App;
