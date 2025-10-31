import { useState } from 'react';
import { signIn, signUp } from '../lib/auth';
import { LogIn, UserPlus } from 'lucide-react';

interface AdminLoginProps {
  onSuccess: () => void;
}

export default function AdminLogin({ onSuccess }: AdminLoginProps) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (isRegistering) {
        if (password !== confirmPassword) {
          setError('A jelszavak nem egyeznek');
          setLoading(false);
          return;
        }
        if (password.length < 6) {
          setError('A jelszónak legalább 6 karakter hosszúnak kell lennie');
          setLoading(false);
          return;
        }
        await signUp(email, password);
        setSuccess('Sikeres regisztráció! Most már beléphetsz.');
        setIsRegistering(false);
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } else {
        await signIn(email, password);
        onSuccess();
      }
    } catch (err: any) {
      setError(err.message || (isRegistering ? 'Hiba a regisztráció során' : 'Hibás email vagy jelszó'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="flex items-center justify-center mb-8">
          <div className="bg-slate-900 p-4 rounded-full">
            {isRegistering ? (
              <UserPlus className="w-8 h-8 text-white" />
            ) : (
              <LogIn className="w-8 h-8 text-white" />
            )}
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center text-slate-900 mb-2">
          {isRegistering ? 'Admin Regisztráció' : 'Admin Belépés'}
        </h1>
        <p className="text-center text-slate-600 mb-8">
          {isRegistering
            ? 'Hozz létre egy új admin fiókot'
            : 'Lépj be az adminisztrációs felületre'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
              {success}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
              Email cím
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition"
              placeholder="admin@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
              Jelszó
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition"
              placeholder="••••••••"
              required
              minLength={6}
            />
            {isRegistering && (
              <p className="text-xs text-slate-500 mt-1">Legalább 6 karakter</p>
            )}
          </div>

          {isRegistering && (
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-2">
                Jelszó megerősítése
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? (isRegistering ? 'Regisztráció...' : 'Belépés...')
              : (isRegistering ? 'Regisztráció' : 'Belépés')}
          </button>
        </form>

        <div className="mt-6 text-center space-y-3">
          <button
            onClick={() => {
              setIsRegistering(!isRegistering);
              setError('');
              setSuccess('');
            }}
            className="text-slate-600 hover:text-slate-900 text-sm transition underline"
          >
            {isRegistering
              ? 'Van már fiókom - Belépés'
              : 'Nincs még fiókom - Regisztráció'}
          </button>

          <div>
            <a href="/" className="text-slate-600 hover:text-slate-900 text-sm transition">
              ← Vissza a főoldalra
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
