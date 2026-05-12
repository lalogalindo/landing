import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatTeardropDots, X, PaperPlaneTilt, WhatsappLogo, User, Robot } from "@phosphor-icons/react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const PHONE = import.meta.env.VITE_CONTACT_PHONE || "2221401900";
const WHATSAPP_URL = `https://wa.me/52${PHONE}?text=Hola!%20Vengo%20desde%20la%20web%20y%20me%20gustaría%20saber%20más%20sobre...`;

const INITIAL_MESSAGES = [
  { id: 1, type: "bot", text: "¡Hola! 👋 Bienvenido a MercSoft. ¿En qué puedo ayudarte hoy?" }
];

const OPTIONS = [
  { id: "project", label: "Quiero iniciar un proyecto", next: "Genial! Cuéntanos un poco más por WhatsApp para darte una atención personalizada." },
  { id: "info", label: "Duda sobre servicios", next: "Nuestros expertos en IA y Software están listos para responderte. Hablemos por WhatsApp." },
  { id: "other", label: "Otro motivo", next: "Perfecto. Haz clic abajo para conectar con nuestro equipo." }
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [showOptions, setShowOptions] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleOptionClick = (option) => {
    const userMsg = { id: Date.now(), type: "user", text: option.label };
    const botResponse = { id: Date.now() + 1, type: "bot", text: option.next, isCta: true };
    
    setMessages([...messages, userMsg]);
    setShowOptions(false);

    setTimeout(() => {
      setMessages(prev => [...prev, botResponse]);
    }, 600);
  };

  const resetChat = () => {
    setMessages(INITIAL_MESSAGES);
    setShowOptions(true);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[350px] sm:w-[400px]"
          >
            <Card className="glass-strong border-white/10 shadow-2xl overflow-hidden flex flex-col h-[500px]">
              {/* Header */}
              <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border border-cyan-500/30">
                    <AvatarFallback className="bg-cyan-500/10 text-cyan-400">
                      <Robot size={24} weight="duotone" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-none">MercBot</h4>
                    <span className="text-[10px] text-cyan-400 font-medium uppercase tracking-wider">En línea</span>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full hover:bg-white/10 text-white/60 hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  <X size={20} />
                </Button>
              </div>

              {/* Messages Area */}
              <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10"
              >
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, x: msg.type === "bot" ? -10 : 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex ${msg.type === "bot" ? "justify-start" : "justify-end"}`}
                  >
                    <div 
                      className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                        msg.type === "bot" 
                        ? "bg-white/10 text-white rounded-tl-none border border-white/5" 
                        : "bg-cyan-600 text-white rounded-tr-none shadow-lg shadow-cyan-900/20"
                      }`}
                    >
                      {msg.text}
                      {msg.isCta && (
                        <div className="mt-3">
                          <a 
                            href={WHATSAPP_URL} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-4 py-2 rounded-xl font-bold transition-colors w-full justify-center"
                          >
                            <WhatsappLogo size={20} weight="fill" />
                            Hablar por WhatsApp
                          </a>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
                
                {showOptions && (
                  <div className="grid gap-2 pt-2">
                    {OPTIONS.map((opt) => (
                      <motion.button
                        key={opt.id}
                        whileHover={{ x: 4 }}
                        onClick={() => handleOptionClick(opt)}
                        className="text-left p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm text-cyan-400 transition-colors"
                      >
                        {opt.label}
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-white/10 bg-black/20 flex items-center gap-2">
                <div className="flex-1 text-[11px] text-white/40 italic">
                  Pronto con inteligencia artificial...
                </div>
                {!showOptions && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs text-cyan-500 hover:text-cyan-400 h-auto p-1"
                    onClick={resetChat}
                  >
                    Reiniciar chat
                  </Button>
                )}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`h-14 w-14 rounded-full flex items-center justify-center shadow-2xl transition-colors ${
          isOpen ? "bg-white text-black" : "bg-cyan-500 text-white"
        }`}
      >
        {isOpen ? <X size={28} weight="bold" /> : <ChatTeardropDots size={32} weight="fill" />}
      </motion.button>
    </div>
  );
}
