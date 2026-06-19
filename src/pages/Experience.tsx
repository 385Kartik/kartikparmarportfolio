import { SEO } from "../components/SEO";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";

const Experience = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO 
        title="Experience | Kartik Parmar"
        description="Experience and background of Kartik Parmar, including Full Stack Developer role at Numberwale and internship at Get Analyticx."
      />
      <Navbar />
      
      <main className="pt-24 pb-16 px-4 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 tracking-tight">Experience</h1>
        
        <div className="space-y-12">
          {/* Numberwale */}
          <section className="relative pl-8 md:pl-0">
            <div className="md:grid md:grid-cols-4 md:gap-8 items-start">
              <div className="mb-4 md:mb-0 md:col-span-1 md:text-right md:pr-8">
                <p className="text-muted-foreground font-medium">Present</p>
                <p className="text-sm text-muted-foreground mt-1">Remote</p>
              </div>
              <div className="md:col-span-3 border-l-2 border-primary/20 pl-8 pb-8 md:pl-8 md:border-l-2">
                <div className="absolute w-3 h-3 bg-primary rounded-full left-[27.5px] md:left-[24.3%] md:-ml-[1.5px] mt-1.5" />
                <h3 className="text-2xl font-bold">Full Stack Developer</h3>
                <h4 className="text-xl text-primary mt-1 mb-4">Numberwale</h4>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>Building AI automation systems and agentic workflows to streamline business operations.</li>
                  <li>Developing full-stack web applications using modern technologies including React, Node.js, and specialized AI frameworks.</li>
                  <li>Designing robust architectures for scalable business tools and internal platforms.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Get Analyticx */}
          <section className="relative pl-8 md:pl-0">
            <div className="md:grid md:grid-cols-4 md:gap-8 items-start">
              <div className="mb-4 md:mb-0 md:col-span-1 md:text-right md:pr-8">
                <p className="text-muted-foreground font-medium">Past</p>
                <p className="text-sm text-muted-foreground mt-1">Internship</p>
              </div>
              <div className="md:col-span-3 border-l-2 border-primary/20 pl-8 md:pl-8 md:border-l-2">
                <div className="absolute w-3 h-3 bg-primary rounded-full left-[27.5px] md:left-[24.3%] md:-ml-[1.5px] mt-1.5" />
                <h3 className="text-2xl font-bold">Web Development Intern</h3>
                <h4 className="text-xl text-primary mt-1 mb-4">Get Analyticx</h4>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>Developed the College Predictor tool to assist students in finding appropriate educational institutions.</li>
                  <li>Contributed to Hackathonix (VibeTix), building features for event management and ticketing.</li>
                  <li>Collaborated with team members to implement responsive designs and optimize application performance.</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </main>

      <FooterSection />
    </div>
  );
};

export default Experience;
