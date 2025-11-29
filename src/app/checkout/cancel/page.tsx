import { Suspense } from 'react';
import Link from 'next/link';

function CancelContent() {
  return (
    <div className="text-center max-w-lg mx-auto">
      <div className="mb-8">
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-400 rounded-full animate-ping"></div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-400 rounded-full"></div>
        </div>

        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">
          Payment Cancelled
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed mb-6">
          No worries! Your payment was cancelled and no charges were made to your card.
        </p>
      </div>

      <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 mb-8 border border-orange-100 shadow-sm">
        <div className="flex items-center justify-center mb-4">
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">What happened?</h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900">Payment was cancelled</p>
              <p className="text-sm text-gray-600">You chose to cancel the payment process</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900">No charges made</p>
              <p className="text-sm text-gray-600">Your card was not charged during this process</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900">Try again anytime</p>
              <p className="text-sm text-gray-600">You can return and complete your purchase whenever you&apos;re ready</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Link
          href="/"
          className="inline-block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-center"
        >
          Return to Plans
        </Link>

        <Link
          href="/#pricing"
          className="inline-block w-full bg-white border-2 border-gray-200 text-gray-700 font-semibold py-4 px-8 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 text-center"
        >
          Choose Different Plan
        </Link>
      </div>
    </div>
  );
}

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Suspense fallback={<div>Loading...</div>}>
          <CancelContent />
        </Suspense>
      </div>
    </div>
  );
}
