// Image optimization utilities for better LCP and performance

export const getOptimizedImageProps = (src: string, priority: boolean = false) => {
  return {
    src,
    loading: priority ? 'eager' : 'lazy',
    fetchpriority: priority ? 'high' : 'auto',
    decoding: priority ? 'sync' : 'async',
  };
};

export const preloadCriticalImages = (images: string[]) => {
  if (typeof window !== 'undefined') {
    images.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      link.fetchpriority = 'high';
      document.head.appendChild(link);
    });
  }
};

export const createResponsiveImageSizes = (baseWidth: number) => {
  return {
    sm: Math.round(baseWidth * 0.5),
    md: Math.round(baseWidth * 0.75),
    lg: baseWidth,
    xl: Math.round(baseWidth * 1.25),
  };
};

// For generating srcset for responsive images
export const generateSrcSet = (baseUrl: string, sizes: number[]) => {
  return sizes.map(size => `${baseUrl}?w=${size} ${size}w`).join(', ');
};
