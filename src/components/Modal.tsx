import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
        <div className="relative">
          <img src="https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Akció" className="w-full h-64 object-cover rounded-t-2xl" />
          <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center"><X size={20} /></button>
        </div>
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-4">Ajándék konyhabútor!</h2>
          <p className="text-gray-600 mb-6">Minden lakáshoz ajándékba adunk egy modern konyhabútort!</p>
          <button onClick={onClose} className="bg-gradient-to-r from-cyan-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold">Részletek</button>
        </div>
      </div>
    </div>
  );
}
