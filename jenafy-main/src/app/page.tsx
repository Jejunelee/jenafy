import Hero from '../app/components/Hero';
import Process from '../app/components/Process';
import Clients from '../app/components/Clients'
import Team from '../app/components/Team'
import Lead from '../app/components/Lead'
import Expertise from '../app/components/Expertise'

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <main>
        <Hero />
        <Clients />
        <Process />
        <Expertise />
        <Team />
        <Lead />
      </main>
    </div>
  );
}