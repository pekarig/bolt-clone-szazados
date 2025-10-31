import { useState, useEffect } from 'react';
import { Router } from './components/Router';
import HomePage from './components/HomePage';
import FlatListPage from './components/FlatListPage';
import PropertyDetailPage from './components/PropertyDetailPage';
import TechnicalPage from './components/TechnicalPage';
import GalleryPage from './components/GalleryPage';
import QuotePage from './components/QuotePage';
import Modal from './components/Modal';
import Chat from './components/Chat';

function AppContent() {
  const [showModal, setShowModal] = useState(false);
  const path = window.location.pathname;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (path === '/') {
    return <HomePage />;
  } else if (path === '/flat-list') {
    return <FlatListPage />;
  } else if (path.startsWith('/property/')) {
    return <PropertyDetailPage />;
  } else if (path === '/technical') {
    return <TechnicalPage />;
  } else if (path === '/gallery') {
    return <GalleryPage />;
  } else if (path === '/quote') {
    return <QuotePage />;
  }

  return <HomePage />;
}

function App() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem('hasSeenModal');
    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setShowModal(true);
        sessionStorage.setItem('hasSeenModal', 'true');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <Router>
      <AppContent />
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} />
      <Chat />
    </Router>
  );
}

export default App;
