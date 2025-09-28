import Header from "@/components/layout/Header";
import CategoryTemplatesView from "@/components/templates/CategoryTemplatesView";

const Templates = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <CategoryTemplatesView />
      </main>
    </div>
  );
};

export default Templates;
