'use client';

import React from 'react';
import Webcam from 'react-webcam';
import { Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface WebcamMonitorProps {
  webcamRef: React.RefObject<Webcam>;
  faceDetected: boolean;
  isExamStarted: boolean;
  onStartExam: () => void;
}

export function WebcamMonitor({ 
  webcamRef, 
  faceDetected, 
  isExamStarted, 
  onStartExam 
}: WebcamMonitorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Exam Monitor</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative rounded-lg overflow-hidden">
            <Webcam
              ref={webcamRef}
              mirrored
              className="w-full"
            />
          </div>
          
          {!faceDetected && isExamStarted && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Face Not Detected</AlertTitle>
              <AlertDescription>
                Please ensure your face is visible in the camera.
              </AlertDescription>
            </Alert>
          )}
          
          {!isExamStarted && (
            <Button
              onClick={onStartExam}
              className="w-full"
              size="lg"
            >
              <Camera className="mr-2 h-4 w-4" />
              Start Exam
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}