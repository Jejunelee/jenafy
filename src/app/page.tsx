import Hero from '../app/components/Hero';
import Process from '../app/components/Process';
import Clients from '../app/components/Clients'
import Team from '../app/components/Team'
import Lead from '../app/components/Lead'
import Expertise from '../app/components/Expertise'
import Demo from "./components/Demo";

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <main>
        <Hero />
        <Clients />
        <Process />
        <Expertise />
        <Demo />
        <Team />
        <Lead />
      </main>
    </div>
  );
}