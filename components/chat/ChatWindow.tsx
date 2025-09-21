import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../../types';
import { useExamplePrompts } from '../../hooks/useAIChat';
import { MoreHorizontal } from 'lucide-react';

const MessageBubble: React.FC<{ message: ChatMessage }> = ({ message }) => (
    <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
        <div className={`max-w-[80%] rounded-lg px-4 py-2 ${message.role === 'user' ? 'bg-brand-cyan text-white' : 'bg-slate-200 text-slate-900 dark:bg-slate-700 dark:text-white'}`}>
            {message.content}
        </div>
    </div>
);

const ChatHistory: React.FC<{ messages: ChatMessage[], isLoading: boolean }> = ({ messages, isLoading }) => {
    const historyRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        historyRef.current?.scrollTo({ top: historyRef.current.scrollHeight, behavior: 'smooth' });
    }, [messages, isLoading]);

    return (
        <div ref={historyRef} className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg, index) => <MessageBubble key={index} message={msg} />)}
            {isLoading && <div className="flex justify-start"><div className="bg-slate-200 dark:bg-slate-700 rounded-lg px-4 py-2"><span className="animate-pulse">...</span></div></div>}
        </div>
    );
};

const ExamplePrompts: React.FC<{ onPromptClick: (prompt: string) => void }> = ({ onPromptClick }) => {
    const { prompts, isGenerating, handleShowMore } = useExamplePrompts(onPromptClick);
    return (
        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-500 dark:text-brand-text-muted mb-2">Coba contoh:</p>
            <div className="flex flex-wrap gap-2">
                {prompts.map((q, i) => <button key={i} onClick={() => onPromptClick(q)} className="text-xs bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-full px-3 py-1 transition-colors">{q}</button>)}
                <button onClick={handleShowMore} disabled={isGenerating} className="text-xs bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-full px-3 py-1 disabled:opacity-50 flex items-center">
                    {isGenerating ? <MoreHorizontal className="animate-pulse h-4 w-4" /> : 'lainnya ...'}
                </button>
            </div>
        </div>
    );
};

const ChatForm: React.FC<{ onSend: (message: string) => void; isLoading: boolean }> = ({ onSend, isLoading }) => {
    const [input, setInput] = useState('');
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            onSend(input);
            setInput('');
        }
    };
    return (
        <form onSubmit={handleSubmit} className="p-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center">
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ajukan pertanyaan..." disabled={isLoading} className="w-full bg-slate-100 dark:bg-slate-700 rounded-l-md px-4 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-cyan" />
                <button type="submit" disabled={isLoading} className="bg-brand-cyan text-white px-4 py-2 rounded-r-md hover:bg-cyan-500 disabled:bg-slate-500">Kirim</button>
            </div>
        </form>
    );
};

interface ChatWindowProps {
    messages: ChatMessage[];
    isLoading: boolean;
    onSendMessage: (message: string) => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading, onSendMessage }) => (
    <div className="no-print fixed bottom-24 right-6 w-full max-w-sm h-[60vh] bg-white dark:bg-brand-light-dark rounded-lg shadow-2xl flex flex-col z-50 animate-pop-in">
        <header className="p-4 bg-slate-100 dark:bg-brand-dark rounded-t-lg">
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">Asisten Pasar AI</h3>
        </header>
        <ChatHistory messages={messages} isLoading={isLoading} />
        {messages.length <= 1 && <ExamplePrompts onPromptClick={onSendMessage} />}
        <ChatForm onSend={onSendMessage} isLoading={isLoading} />
    </div>
);