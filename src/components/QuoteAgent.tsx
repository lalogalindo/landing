import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { trackEvent } from '../analytics/events';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faTimes, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';

type Message = { role: 'bot' | 'user', text: string };

export const QuoteAgent = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [step, setStep] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && step === 0 && messages.length === 0) {
      setTimeout(() => {
        setMessages([{ role: 'bot', text: t('agent.q1') }]);
        setStep(1);
      }, 500);
    }
  }, [isOpen, step, messages.length, t]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleOpen = () => {
    setIsOpen(true);
    trackEvent('open_quote_agent');
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMsg: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, newMsg]);
    setInput('');

    if (step === 1) {
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'bot', text: t('agent.q2') }]);
        setStep(2);
      }, 800);
    } else if (step === 2) {
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'bot', text: t('agent.q3') }]);
        setStep(3);
      }, 800);
    } else if (step === 3) {
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'bot', text: t('agent.success') }]);
        setStep(4);
        trackEvent('submit_quote_agent', { service: messages[1]?.text });
      }, 1000);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={handleOpen}
            className="fixed bottom-6 right-6 w-16 h-16 bg-brand-900 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-brand-800 transition-colors z-50 group"
          >
            <FontAwesomeIcon icon={faRobot} className="text-2xl group-hover:scale-110 transition-transform" />
            {/* Ping effect */}
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-brand-accent"></span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 w-[350px] bg-white rounded-2xl shadow-2xl overflow-hidden z-50 border border-gray-100 flex flex-col h-[450px]"
          >
            {/* Header */}
            <div className="bg-brand-900 text-white p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faRobot} />
                </div>
                <span className="font-semibold">{t('agent.header')}</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    m.role === 'user' ? 'bg-brand-accent text-white rounded-br-sm' : 'bg-white border border-gray-200 text-brand-800 rounded-bl-sm'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-gray-100 bg-white flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                disabled={step >= 4}
                placeholder={t('agent.placeholder')}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-brand-accent"
              />
              <button 
                onClick={handleSend}
                disabled={step >= 4 || !input.trim()}
                className="w-10 h-10 bg-brand-accent text-white rounded-full flex items-center justify-center disabled:opacity-50 hover:bg-brand-hover transition-colors"
              >
                <FontAwesomeIcon icon={faPaperPlane} className="text-xs" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
