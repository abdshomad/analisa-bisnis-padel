import React from 'react';

const parseInline = (text: string): React.ReactNode => {
    if (!text) return text;
    
    const elements: (string | React.ReactElement)[] = [];
    let lastIndex = 0;
    
    // Regex untuk **bold** dan *italic*. Tidak mendukung penumpukan.
    const regex = /(\*\*(.*?)\*\*)|(\*(.*?)\*)/g;
    let match;

    while ((match = regex.exec(text)) !== null) {
        // Teks sebelum kecocokan
        if (match.index > lastIndex) {
            elements.push(text.substring(lastIndex, match.index));
        }
        
        // Kecocokan tebal
        if (match[2] !== undefined) {
            elements.push(<strong key={match.index} className="font-bold text-slate-900 dark:text-white">{match[2]}</strong>);
        } 
        // Kecocokan miring
        else if (match[4] !== undefined) {
            elements.push(<em key={match.index}>{match[4]}</em>);
        }
        
        lastIndex = regex.lastIndex;
    }

    // Teks sisa setelah kecocokan terakhir
    if (lastIndex < text.length) {
        elements.push(text.substring(lastIndex));
    }

    return <>{elements}</>;
};

const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
    if (!content) return null;

    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let currentList: { type: 'ul' | 'ol'; items: string[] } | null = null;

    const flushList = () => {
        if (currentList) {
            const ListTag = currentList.type;
            elements.push(
                <ListTag
                    key={elements.length}
                    className={`pl-5 space-y-1 ${ListTag === 'ul' ? 'list-disc' : 'list-decimal'}`}
                >
                    {currentList.items.map((item, index) => (
                        <li key={index}>{parseInline(item)}</li>
                    ))}
                </ListTag>
            );
            currentList = null;
        }
    };

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Header
        const headingMatch = line.match(/^(#+)\s+(.*)/);
        if (headingMatch) {
            flushList();
            const level = headingMatch[1].length;
            const text = headingMatch[2];
            switch (level) {
                case 1: elements.push(<h2 key={i} className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">{parseInline(text)}</h2>); break;
                case 2: elements.push(<h3 key={i} className="text-xl font-semibold text-brand-cyan mt-6 mb-3">{parseInline(text)}</h3>); break;
                case 3: elements.push(<h4 key={i} className="text-lg font-semibold text-brand-cyan mt-4 mb-2">{parseInline(text)}</h4>); break;
                default: elements.push(<p key={i} className="font-bold">{parseInline(line)}</p>); break;
            }
            continue;
        }

        // Item Daftar Tidak Berurutan
        const ulMatch = line.match(/^(\s*)(-|\*)\s+(.*)/);
        if (ulMatch) {
            if (!currentList || currentList.type !== 'ul') {
                flushList();
                currentList = { type: 'ul', items: [] };
            }
            currentList.items.push(ulMatch[3]);
            continue;
        }
        
        // Item Daftar Berurutan
        const olMatch = line.match(/^(\s*)(\d+)\.\s+(.*)/);
        if (olMatch) {
            if (!currentList || currentList.type !== 'ol') {
                flushList();
                currentList = { type: 'ol', items: [] };
            }
            currentList.items.push(olMatch[3]);
            continue;
        }

        // Ini bukan baris khusus, jadi selesaikan daftar apa pun dan anggap sebagai paragraf
        flushList();
        
        if (line.trim().length > 0) {
            elements.push(<p key={i}>{parseInline(line)}</p>);
        }
    }

    flushList(); // Pastikan untuk menyelesaikan daftar terakhir jika ada

    return (
        <div className="text-slate-600 dark:text-brand-text-muted leading-relaxed space-y-4">
            {elements}
        </div>
    );
};

export default MarkdownRenderer;
