'use client'
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const useUrl = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [host, setHost] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHost(window.location.origin);
    }
  }, []);

  return {
    host,
    pathname,
    search: searchParams.toString(),
    query: Object.fromEntries(searchParams.entries())
  };
};

export default useUrl;
