import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { resume } from '../data/resumeData';
import { getBotResponse } from '../utils/chatbotLogic';

export default function Chatbot({ onClose }) {
    const [messages, setMessages] = useState([
        { text: "Hi! I'm Anshuman's virtual assistant. Ask me about his skills, projects, or experience!", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = input.trim();
        setMessages(prev => [...prev, { text: userMsg, sender: 'user' }]);
        setInput('');

        // Simulate thinking delay
        setTimeout(() => {
            const botResponse = getBotResponse(userMsg, resume);
            setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
        }, 600);
    };

    return (
        <motion.div
            drag
            dragMomentum={false}
            initial={{ opacity: 0, scale: 0.9, originX: 1, originY: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-72 h-[400px] bg-slate-900/95 backdrop-blur-xl border border-cyan-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50"
        >
            {/* Header */}
            <div className="p-4 bg-slate-800/50 border-b border-white/10 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-cyan-400">
                        <img src={new URL(`../assets/${resume.avatar}`, import.meta.url).href} alt="Bot" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h3 className="font-bold text-white">Anshuman AI</h3>
                        <p className="text-xs text-cyan-400">Online</p>
                    </div>
                </div>
                <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                    ✕
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.sender === 'user'
                                ? 'bg-cyan-600 text-white rounded-tr-none'
                                : 'bg-slate-800 text-slate-200 rounded-tl-none border border-white/10'
                            }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 border-t border-white/10 flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything..."
                    className="flex-1 bg-slate-800 border-none rounded-xl px-4 py-2 text-sm text-white focus:ring-1 focus:ring-cyan-400 outline-none"
                />
                <button type="submit" className="bg-cyan-500 hover:bg-cyan-400 text-white p-2 rounded-xl transition-colors">
                    ➤
                </button>
            </form>
        </motion.div>
    );
}
