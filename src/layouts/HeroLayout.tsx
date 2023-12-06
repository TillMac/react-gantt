import HeroNav from "@/components/heroPage/heroNav";
import { ReactNode } from "react";

type HeroLayoutProps = {
  children: ReactNode;
}

const HeroLayout = ({children}: HeroLayoutProps) => {
  return (
    <div className='w-screen h-screen px-6 lg:px-24 2xl:px-48 hero__bg overflow-x-hidden' style={{ animation: 'fadeInEffect 1.5s ease-in-out' }}>
      <HeroNav />
      {children}
    </div>
  )
}

export default HeroLayout;
