"use client";

export const delayRedirect = (routeUrl: string, intervalTimeout?: number) => {
  const timer = setTimeout(() => {
    location.href = `${location.origin}${routeUrl}`;
  }, intervalTimeout ?? 3000);

  return () => clearTimeout(timer);
};
