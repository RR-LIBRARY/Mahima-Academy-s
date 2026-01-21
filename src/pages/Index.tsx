import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import LeadForm from "@/components/landing/LeadForm";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Mahima Academy" className="h-10 w-10 rounded-xl" />
            <span className="font-bold text-xl text-foreground hidden sm:inline">
              Mahima Academy
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/courses">
              <Button variant="ghost" className="text-foreground hover:bg-muted">
                Courses
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main content with padding for fixed nav */}
      <main className="pt-20">
        <Hero />
        <Features />
        <LeadForm />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
