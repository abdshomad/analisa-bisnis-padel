import { useState, useEffect, useCallback } from 'react';
import { GoogleGenAI, Chat, Type } from "@google/genai";
import type { ChatMessage } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const useAIChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [chat, setChat] = useState<Chat | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpen && !chat) {
            const newChat = ai.chats.create({
                model: 'gemini-2.5-flash',
                config: { systemInstruction: "Anda adalah asisten yang membantu untuk dasbor analisis pasar 'Bisnis Padel'. Jawab pertanyaan secara ringkas berdasarkan konteks pasar Padel di Indonesia. Jika Anda tidak tahu, katakan bahwa Anda tidak memiliki datanya." }
            });
            setChat(newChat);
            setMessages([{ role: 'model', content: 'Halo! Ada yang bisa saya bantu terkait pasar Padel di Indonesia?' }]);
        }
    }, [isOpen, chat]);

    const handleSendMessage = useCallback(async (messageText: string) => {
        if (isLoading || !chat) return;
        setMessages(prev => [...prev, { role: 'user', content: messageText }]);
        setIsLoading(true);

        try {
            const result = await chat.sendMessage({ message: messageText });
            setMessages(prev => [...prev, { role: 'model', content: result.text }]);
        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, { role: 'model', content: 'Maaf, terjadi kesalahan. Silakan coba lagi.' }]);
        } finally {
            setIsLoading(false);
        }
    }, [isLoading, chat]);

    return {
        isOpen,
        setIsOpen,
        messages,
        isLoading,
        handleSendMessage,
    };
};

export const useExamplePrompts = (onPromptClick: (prompt: string) => void) => {
    const initialPrompts = ["Pasar terbesarnya di mana?", "Seberapa cepat pertumbuhan pasarnya?", "Siapa pemain utamanya?"];
    const initialHidden = ["Apa risiko terbesar berinvestasi di Padel?", "Berapa estimasi biaya membangun satu lapangan?", "Bagaimana demografi pemain Padel di Jakarta?"];
    
    const [prompts, setPrompts] = useState(initialPrompts);
    const [hiddenPrompts, setHiddenPrompts] = useState(initialHidden);
    const [isGenerating, setIsGenerating] = useState(false);
    
    const handleShowMore = useCallback(async () => {
        setIsGenerating(true);
        if (hiddenPrompts.length > 0) {
            setPrompts(prev => [...prev, ...hiddenPrompts]);
            setHiddenPrompts([]);
        }

        try {
            const schema = { type: Type.OBJECT, properties: { prompts: { type: Type.ARRAY, items: { type: Type.STRING } } } };
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: "Berikan 3 contoh pertanyaan singkat dan unik untuk AI dasbor pasar Padel Indonesia, fokus pada strategi atau kompetisi. Jawab dalam JSON.",
                config: { responseMimeType: "application/json", responseSchema: schema }
            });
            const newPrompts = JSON.parse(response.text).prompts || [];
            if (newPrompts.length > 0) {
                setPrompts(prev => [...prev, ...newPrompts]);
            }
        } catch (error) {
            console.error("Error generating more prompts:", error);
        } finally {
            setIsGenerating(false);
        }
    }, [hiddenPrompts]);
    
    return { prompts, isGenerating, handleShowMore };
};
