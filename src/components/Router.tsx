import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface RouterContextType {
  path: string;
  navigate: (path: string) => void;
}

const RouterContext = createContext<RouterContextType | null>(null);

export function Router({ children }: { children: ReactNode }) {
  const getHashPath = () => {
    const hash = window.location.hash.slice(1);
    return hash || '/';
  };

  const [path, setPath] = useState(getHashPath());

  useEffect(() => {
    const handleHashChange = () => {
      setPath(getHashPath());
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (newPath: string) => {
    window.location.hash = newPath;
    setPath(newPath);
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');

      if (anchor && anchor.getAttribute('href')?.startsWith('/')) {
        e.preventDefault();
        const newPath = anchor.getAttribute('href') || '/';
        navigate(newPath);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return <RouterContext.Provider value={{ path, navigate }}>{children}</RouterContext.Provider>;
}

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) throw new Error('useRouter must be used within Router');
  return context;
}

export function useParams() {
  const { path } = useRouter();
  const parts = path.split('/').filter(Boolean);

  if (parts[0] === 'property' && parts[1]) {
    return { id: parts[1] };
  }

  return {};
}
