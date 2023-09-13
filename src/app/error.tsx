"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh_-_4rem)]">
      <div className="text-center">
        <h1 className="text-2xl mb-2">Something went wrong!</h1>
        <button
          className="text-xl global_button border rounded border-gray-700 dark:border-gray-200"
          onClick={() => reset()}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
