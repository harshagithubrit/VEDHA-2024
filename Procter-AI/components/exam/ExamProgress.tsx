'use client';

import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ExamProgressProps {
  currentQuestion: number;
  totalQuestions: number;
}

export function ExamProgress({ currentQuestion, totalQuestions }: ExamProgressProps) {
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Exam Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <Progress value={progress} className="w-full" />
        <p className="text-sm text-muted-foreground mt-2">
          Question {currentQuestion} of {totalQuestions}
        </p>
      </CardContent>
    </Card>
  );
}