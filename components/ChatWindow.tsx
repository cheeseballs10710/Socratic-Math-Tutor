import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { ChatMessage, Role } from '../types';

const ThinkingIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin h-5 w-5 mr-2 text-indigo-400">
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

const LoadingIcon: React.FC = () => (
    <div className="flex items-center space-x-1">
        <div className="h-2 w-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-2 w-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-2 w-2 bg-indigo-400 rounded-full animate-bounce"></div>
    </div>
);

interface ChatWindowProps {
  messages: ChatMessage[];
  isLoading: boolean;
  isThinking: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading, isThinking }) => {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, isThinking]);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {messages.map((message, index) => (
        <div key={index} className={`flex items-end gap-3 ${message.role === Role.USER ? 'justify-end' : 'justify-start'}`}>
          {message.role === Role.AI && (
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-xl">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20V16"/></svg>
            </div>
          )}
          <div
            className={`max-w-md lg:max-w-lg px-4 py-3 rounded-2xl shadow ${
              message.role === Role.USER
                ? 'bg-indigo-600 text-white rounded-br-none'
                : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'
            }`}
          >
            <div className="prose prose-sm dark:prose-invert max-w-none text-current">
              <ReactMarkdown
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
              >
                  {message.content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      ))}
      {isLoading && (
         <div className="flex items-end gap-3 justify-start">
             <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20V16"/></svg>
            </div>
            <div className="max-w-xs px-4 py-3 rounded-2xl shadow bg-white dark:bg-gray-700 rounded-bl-none">
                <LoadingIcon />
            </div>
         </div>
      )}
      {isThinking && (
         <div className="flex items-end gap-3 justify-start">
             <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20V16"/></svg>
            </div>
            <div className="flex items-center max-w-xs px-4 py-3 rounded-2xl shadow bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none">
                <ThinkingIcon />
                <span className="text-sm">Thinking...</span>
            </div>
         </div>
      )}
      <div ref={endOfMessagesRef} />
    </div>
  );
};

export default ChatWindow;