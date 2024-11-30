'use client';

import { useState, useEffect } from 'react';
import { useTabMonitor } from '@/hooks/useTabMonitor';
import { ExamProgress } from '@/components/exam/ExamProgress';
import { TabMonitor } from '@/components/exam/TabMonitor';
import { ExamQuestion } from '@/components/exam/ExamQuestion';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function ExamPage() {
  const { tabSwitches, isTabActive, startMonitoring, getElapsedTime, maxTabSwitches } = useTabMonitor();
  const [isExamStarted, setIsExamStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [elapsedTime, setElapsedTime] = useState(0);

  const totalQuestions = 10;

  useEffect(() => {
    if (isExamStarted) {
      const timer = setInterval(() => {
        setElapsedTime(getElapsedTime());
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isExamStarted, getElapsedTime]);

  const startExam = () => {
    setIsExamStarted(true);
    startMonitoring();
    toast.success("Exam Started", {
      description: "Tab monitoring is now active. Please do not switch tabs."
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {!isExamStarted ? (
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">Welcome to the Exam</h1>
            <p className="text-muted-foreground">
              Please note that switching tabs during the exam will be monitored and recorded.
              Maximum {maxTabSwitches} tab switches allowed before termination.
            </p>
            <Button onClick={startExam} size="lg">
              Start Exam
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <ExamQuestion />
              </div>
              <div className="space-y-6">
                <TabMonitor
                  tabSwitches={tabSwitches}
                  isTabActive={isTabActive}
                  elapsedTime={elapsedTime}
                  maxTabSwitches={maxTabSwitches}
                />
                <ExamProgress
                  currentQuestion={currentQuestion}
                  totalQuestions={totalQuestions}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}