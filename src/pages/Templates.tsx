import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CategoryTemplatesView from "@/components/templates/CategoryTemplatesView";

const Templates = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <CategoryTemplatesView />
      </main>
      <Footer />
    </div>
  );
};

export default Templates;
