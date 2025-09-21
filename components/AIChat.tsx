import React from 'react';
import { useAIChat } from '../hooks/useAIChat';
import { ChatWindow } from './chat/ChatWindow';
import { Bot } from 'lucide-react';

const AIChat: React.FC = () => {
    const { isOpen, setIsOpen, messages, isLoading, handleSendMessage } = useAIChat();

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="no-print fixed bottom-6 right-6 bg-brand-cyan text-white p-4 rounded-full shadow-lg hover:bg-cyan-500 transition-transform transform hover:scale-110 z-50"
                aria-label="Buka Obrolan AI"
            >
                 <Bot className="h-8 w-8" />
            </button>

            {isOpen && (
                <ChatWindow
                    messages={messages}
                    isLoading={isLoading}
                    onSendMessage={handleSendMessage}
                />
            )}
        </>
    );
};

export default AIChat;