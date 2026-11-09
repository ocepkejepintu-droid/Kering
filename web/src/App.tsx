import { TooltipProvider } from "@/components/ui/tooltip";
import { StoreProvider, useStore } from "@/lib/store";
import { Shell } from "@/components/Shell";
import { Assistant } from "@/components/Assistant";
import { MapView } from "@/views/MapView";
import { VillagesView } from "@/views/VillagesView";
import { SatelliteView } from "@/views/SatelliteView";
import { PlannerView } from "@/views/PlannerView";
import { PitchView } from "@/views/PitchView";
import { DataView } from "@/views/DataView";

function Views() {
  const { view, internal } = useStore();
  switch (view) {
    case "villages": return <VillagesView />;
    case "satellite": return <SatelliteView />;
    case "planner": return <PlannerView />;
    case "data": return <DataView />;
    case "pitch": return internal ? <PitchView /> : <MapView />;
    default: return <MapView />;
  }
}

export function App() {
  return (
    <StoreProvider>
      <TooltipProvider delayDuration={200}>
        <Shell assistant={<Assistant />}><Views /></Shell>
      </TooltipProvider>
    </StoreProvider>
  );
}
