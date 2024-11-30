'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface MonitoringStatsProps {
  examDuration: number;
  tabSwitches: number;
  movementsCount: number;
}

export function MonitoringStats({ examDuration, tabSwitches, movementsCount }: MonitoringStatsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monitoring Statistics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Exam Duration</p>
          <p className="text-2xl font-bold">
            {Math.floor(examDuration / 60)}:{(examDuration % 60).toString().padStart(2, '0')}
          </p>
        </div>
        <Separator />
        <div>
          <p className="text-sm text-muted-foreground">Tab Switches</p>
          <p className="text-2xl font-bold">{tabSwitches}</p>
        </div>
        <Separator />
        <div>
          <p className="text-sm text-muted-foreground">Face Movements</p>
          <p className="text-2xl font-bold">{movementsCount}</p>
        </div>
      </CardContent>
    </Card>
  );
}