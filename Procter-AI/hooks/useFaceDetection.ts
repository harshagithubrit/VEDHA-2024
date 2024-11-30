'use client';

import { useState, useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import { useToast } from '@/components/ui/use-toast';

export function useFaceDetection() {
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [faceDetected, setFaceDetected] = useState(false);
  const [movements, setMovements] = useState<string[]>([]);
  const detector = useRef<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    initializeDetector();
  }, []);

  async function initializeDetector() {
    try {
      await tf.ready();
      detector.current = await faceLandmarksDetection.load(
        faceLandmarksDetection.SupportedPackages.mediapipeFacemesh
      );
      setIsModelLoading(false);
    } catch (error) {
      console.error('Error loading face detection model:', error);
      toast({
        title: 'Error',
        description: 'Failed to load face detection model',
        variant: 'destructive',
      });
    }
  }

  async function detectFace(video: HTMLVideoElement) {
    if (!detector.current) return;

    try {
      const faces = await detector.current.estimateFaces(video);
      const detected = faces.length > 0;
      setFaceDetected(detected);

      if (detected) {
        const face = faces[0];
        analyzeFacePosition(face);
      }
    } catch (error) {
      console.error('Error during face detection:', error);
    }
  }

  function analyzeFacePosition(face: any) {
    const movement = determineFaceMovement(face);
    if (movement) {
      setMovements(prev => [...prev, movement]);
    }
  }

  function determineFaceMovement(face: any) {
    // Simplified movement detection logic
    const rotationY = face.annotations?.rotationY?.[0] || 0;
    if (Math.abs(rotationY) > 30) {
      return rotationY > 0 ? 'looking right' : 'looking left';
    }
    return null;
  }

  return {
    isModelLoading,
    faceDetected,
    movements,
    detectFace,
  };
}