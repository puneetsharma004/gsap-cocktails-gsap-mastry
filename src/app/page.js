import gsap from "gsap"
import {ScrollTrigger, SplitText} from "gsap/all"
import NavBar from "@/app/components/NavBar";
import Hero from "@/app/components/Hero";
gsap.registerPlugin(ScrollTrigger, SplitText)

export default function Home() {
  return (
   <>
       <main>
           <NavBar/>
           <Hero/>
       </main>

   </>
  );
}
