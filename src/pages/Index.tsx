import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AppLayout } from "@/components/AppLayout";
import { TourGuide, TourStep } from "@/components/TourGuide";

const Index = () => {
  const [isTourOpen, setIsTourOpen] = useState(false);

  // Define tour steps
  const tourSteps: TourStep[] = [
    {
      target: "#header",
      title: "Welcome to TourGuide",
      content: "This is a demonstration of an in-app guided tour. Let's explore the interface together!",
      position: "bottom"
    },
    {
      target: "#create-tour",
      title: "Create New Tours",
      content: "Click here to create a new tour for your application. You can customize each step and target specific elements.",
      position: "bottom"
    },
    {
      target: "#main-card",
      title: "Tour Dashboard",
      content: "This is your main dashboard where you can see all your tours and their status.",
      position: "top"
    },
    {
      target: "#tabs-list",
      title: "Manage Tour States",
      content: "Toggle between active, draft, and archived tours using these tabs.",
      position: "bottom"
    },
    {
      target: "#search-tours",
      title: "Find Tours",
      content: "Quickly search through your tours to find the one you need.",
      position: "bottom"
    },
    {
      target: "#stats-card",
      title: "Analytics Overview",
      content: "Monitor how users interact with your tours. Track completion rates and other important metrics.",
      position: "left"
    },
    {
      target: "#help-card",
      title: "Additional Resources",
      content: "Need more help? Check out our documentation for best practices and advanced tips.",
      position: "left"
    }
  ];

  const startTour = () => {
    setIsTourOpen(true);
  };

  const endTour = () => {
    setIsTourOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-4 right-4 z-40">
        <Button onClick={startTour} className="shadow-lg">
          Start Tour
        </Button>
      </div>
      
      <AppLayout />
      
      <TourGuide 
        steps={tourSteps}
        isOpen={isTourOpen}
        onClose={endTour}
        onFinish={endTour}
      />
    </div>
  );
};

export default Index;
