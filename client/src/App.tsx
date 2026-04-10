import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Home from "@/pages/home";
import ThankYou from "@/pages/thank-you";
import NotFound from "@/pages/not-found";

function App() {
  return (
    <WouterRouter base="/hospitality-mattresses">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />

          <Switch>
            <Route path="/" component={Home} />
            <Route path="/thank-you" component={ThankYou} />
            <Route component={NotFound} />
          </Switch>

        </TooltipProvider>
      </QueryClientProvider>
    </WouterRouter>
  );
}

export default App;