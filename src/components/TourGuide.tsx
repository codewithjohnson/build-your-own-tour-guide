import { useState, useEffect, useRef } from "react";
import { Portal } from "@radix-ui/react-portal";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export type TourStep = {
  target: string;
  title: string;
  content: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
};

interface TourGuideProps {
  steps: TourStep[];
  isOpen: boolean;
  onClose: () => void;
  onFinish: () => void;
}

export function TourGuide({ steps, isOpen, onClose, onFinish }: TourGuideProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [tooltipStyle, setTooltipStyle] = useState({});
  const [highlightStyle, setHighlightStyle] = useState({});
  const [animation, setAnimation] = useState('');
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Calculate the position of the tooltip relative to the target element
  const calculatePosition = () => {
    if (!isOpen || steps.length === 0) return;

    const targetElement = document.querySelector(steps[currentStep].target);
    if (!targetElement) return;

    const targetRect = targetElement.getBoundingClientRect();
    const position = steps[currentStep].position || 'bottom';

    // Set highlight position (the spotlight effect)
    setHighlightStyle({
      top: `${targetRect.top}px`,
      left: `${targetRect.left}px`,
      width: `${targetRect.width}px`,
      height: `${targetRect.height}px`,
    });

    // Set tooltip position
    const tooltipWidth = 300; // Fixed width for tooltip
    const tooltipHeight = tooltipRef.current?.getBoundingClientRect().height || 150;
    const spacing = 12; // Space between target and tooltip

    let top = 0;
    let left = 0;

    switch (position) {
      case 'top':
        top = targetRect.top - tooltipHeight - spacing;
        left = targetRect.left + (targetRect.width / 2) - (tooltipWidth / 2);
        break;
      case 'bottom':
        top = targetRect.bottom + spacing;
        left = targetRect.left + (targetRect.width / 2) - (tooltipWidth / 2);
        break;
      case 'left':
        top = targetRect.top + (targetRect.height / 2) - (tooltipHeight / 2);
        left = targetRect.left - tooltipWidth - spacing;
        break;
      case 'right':
        top = targetRect.top + (targetRect.height / 2) - (tooltipHeight / 2);
        left = targetRect.right + spacing;
        break;
    }

    // Ensure tooltip stays within viewport
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (left < 10) left = 10;
    if (left + tooltipWidth > viewportWidth - 10) left = viewportWidth - tooltipWidth - 10;
    if (top < 10) top = 10;
    if (top + tooltipHeight > viewportHeight - 10) top = viewportHeight - tooltipHeight - 10;

    setTooltipStyle({
      top: `${top}px`,
      left: `${left}px`,
      width: `${tooltipWidth}px`,
    });

    // Set animation
    setAnimation('animate-fade-in');
  };

  // Calculate position on step change or window resize
  useEffect(() => {
    calculatePosition();
    window.addEventListener('resize', calculatePosition);
    
    return () => {
      window.removeEventListener('resize', calculatePosition);
    };
  }, [currentStep, isOpen]);

  // Handle next step
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setAnimation('animate-fade-out');
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setAnimation('animate-fade-in');
      }, 200);
    } else {
      handleFinish();
    }
  };

  // Handle previous step
  const handlePrevious = () => {
    if (currentStep > 0) {
      setAnimation('animate-fade-out');
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setAnimation('animate-fade-in');
      }, 200);
    }
  };

  // Handle finish or skip
  const handleFinish = () => {
    setCurrentStep(0);
    onFinish();
  };

  if (!isOpen || steps.length === 0) return null;

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <Portal>
      {/* Overlay with spotlight effect */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 transition-opacity duration-300"
        onClick={onClose}
      >
        {/* Spotlight (transparent hole) */}
        <div 
          className="absolute rounded-md transition-all duration-300 box-content border-2 border-primary z-10"
          style={highlightStyle}
        />
      </div>

      {/* Tooltip */}
      <div 
        ref={tooltipRef}
        className={cn(
          "fixed bg-white rounded-lg shadow-lg z-[60] p-4",
          animation
        )}
        style={tooltipStyle}
      >
        <div className="flex justify-between items-center mb-1">
          <h3 className="font-bold text-lg">{steps[currentStep].title}</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0 rounded-full"
            onClick={onClose}
          >
            ✕
          </Button>
        </div>

        <div className="mb-4">
          <p className="text-muted-foreground">{steps[currentStep].content}</p>
        </div>

        <div className="space-y-4">
          <Progress value={progress} className="h-1" />
          
          <div className="flex justify-between items-center">
            <div className="space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handlePrevious}
                disabled={currentStep === 0}
              >
                Previous
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                onClick={handleNext}
              >
                {currentStep < steps.length - 1 ? 'Next' : 'Finish'}
              </Button>
            </div>
            
            <div className="text-sm text-muted-foreground">
              {currentStep + 1} of {steps.length}
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
}
