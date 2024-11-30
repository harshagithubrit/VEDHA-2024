'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

interface TabMonitorProps {
  tabSwitches: number;
  isTabActive: boolean;
  elapsedTime: number;
  maxTabSwitches: number;
}

export function TabMonitor({ tabSwitches, isTabActive, elapsedTime, maxTabSwitches }: TabMonitorProps) {
  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;
  const switchesProgress = (tabSwitches / maxTabSwitches) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monitoring Statistics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Elapsed Time</p>
          <p className="text-2xl font-bold">
            {minutes}:{seconds.toString().padStart(2, '0')}
          </p>
        </div>
        <Separator />
        <div>
          <p className="text-sm text-muted-foreground">Tab Switches</p>
          <div className="space-y-2">
            <p className="text-2xl font-bold">{tabSwitches} / {maxTabSwitches}</p>
            <Progress value={switchesProgress} className="w-full" 
              indicatorClassName={switchesProgress > 60 ? "bg-red-500" : ""}
            />
          </div>
        </div>
        
        {!isTabActive && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Tab Switch Detected</AlertTitle>
            <AlertDescription>
              Please return to the exam tab immediately. {maxTabSwitches - tabSwitches} switches remaining.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}