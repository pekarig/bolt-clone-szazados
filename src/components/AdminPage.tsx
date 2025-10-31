import { useState, useEffect } from 'react';
import { Property } from '../lib/supabase';
import { onAuthStateChange } from '../lib/auth';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import PropertyEditor from './PropertyEditor';

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editingProperty, setEditingProperty] = useState<Property | null | undefined>(undefined);

  useEffect(() => {
    const { data: { subscription } } = onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLoginSuccess = () => {
    setLoading(true);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleEditProperty = (property: Property | null) => {
    setEditingProperty(property);
  };

  const handleCloseEditor = () => {
    setEditingProperty(undefined);
  };

  const handleSaveProperty = () => {
    setEditingProperty(undefined);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return <AdminLogin onSuccess={handleLoginSuccess} />;
  }

  return (
    <>
      <AdminDashboard onLogout={handleLogout} onEditProperty={handleEditProperty} />
      {editingProperty !== undefined && (
        <PropertyEditor
          property={editingProperty}
          onClose={handleCloseEditor}
          onSave={handleSaveProperty}
        />
      )}
    </>
  );
}
