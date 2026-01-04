
import React, { useState } from 'react';
import { getStyleAdvice } from '../services/geminiService';
import { ChatMessage } from '../types';

export const Assistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Fala, parceiro! Sou o assistente virtual da Verena. Em que posso te ajudar com seu estilo hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const reply = await getStyleAdvice(userMsg);
    setMessages(prev => [...prev, { role: 'model', text: reply }]);
    setIsLoading(false);
  };

  return (
    <div className="bg-black/40 border border-[#d4af37]/30 rounded-xl p-4 md:p-6 backdrop-blur-sm max-w-2xl mx-auto mt-20">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-3 h-3 bg-[#d4af37] rounded-full animate-pulse" />
        <h3 className="uppercase tracking-widest text-sm font-bold accent-gold">Consultoria de Estilo IA</h3>
      </div>
      
      <div className="h-64 overflow-y-auto mb-4 space-y-4 pr-2 custom-scrollbar">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-lg text-sm ${m.role === 'user' ? 'bg-[#d4af37] text-black' : 'bg-white/10 text-gray-200'}`}>
              {m.text}
            </div>
          </div>
        ))}
        {isLoading && <div className="text-xs text-gray-500 italic">Verena's Assistant está pensando...</div>}
      </div>

      <div className="flex gap-2">
        <input 
          type="text" 
          placeholder="Ex: Qual barba combina com rosto redondo?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 bg-black/60 border border-white/10 rounded p-2 text-sm outline-none focus:border-[#d4af37]"
        />
        <button 
          onClick={handleSend}
          className="bg-[#d4af37] text-black p-2 rounded hover:bg-[#b8962d] transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
        </button>
      </div>
    </div>
  );
};
