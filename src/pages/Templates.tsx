import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { TemplatesContainer } from "@/components/templates";

const Templates = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <TemplatesContainer />
      </main>
      <Footer />
    </div>
  );
};

export default Templates;
