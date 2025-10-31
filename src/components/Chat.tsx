import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export default function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ text: 'Üdvözöljük!', sender: 'agent' }]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: 'user' }]);
    setInput('');
    setTimeout(() => setMessages(prev => [...prev, { text: 'Köszönjük! Válaszolunk hamarosan.', sender: 'agent' }]), 1000);
  };

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-cyan-500 to-pink-500 text-white rounded-full shadow-xl z-40 flex items-center justify-center">
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 bg-white rounded-2xl shadow-2xl z-40">
          <div className="bg-gradient-to-r from-cyan-500 to-pink-500 text-white p-4 rounded-t-2xl">
            <h3 className="font-bold">Chat</h3>
          </div>
          <div className="h-80 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] px-4 py-2 rounded-2xl ${m.sender === 'user' ? 'bg-cyan-500 text-white' : 'bg-gray-100'}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="Üzenet..." className="flex-1 px-4 py-2 border rounded-full" />
              <button onClick={handleSend} className="w-10 h-10 bg-cyan-500 text-white rounded-full flex items-center justify-center">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
