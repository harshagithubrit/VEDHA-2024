'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export function ExamQuestion() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sample Exam Question</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            What is the capital of France?
          </p>
          <RadioGroup defaultValue="paris">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="paris" id="paris" />
              <Label htmlFor="paris">Paris</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="london" id="london" />
              <Label htmlFor="london">London</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="berlin" id="berlin" />
              <Label htmlFor="berlin">Berlin</Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
}