import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="space-y-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Secure Exam Monitoring System
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              Advanced tab monitoring to ensure exam integrity
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg">
              <AlertCircle className="w-12 h-12 text-blue-500 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900">Tab Monitoring</h2>
              <p className="mt-2 text-gray-600 text-center">
                Real-time tracking of tab switches and browser focus
              </p>
            </div>

            <div className="mt-8">
              <Link href="/exam">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Exam
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}