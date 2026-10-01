import { useState } from "react";
import { Link } from "react-router-dom";
import { QUICK_QUESTIONS } from "../../data/chatbotQuestions";

function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);

  const handleQuestion = (question) => {
    setMessages((prev) => [
      ...prev,
      { type: "user", text: question.label },
      {
        type: "bot",
        text: question.answer,
        link: question.link,
        linkText: question.linkText,
      },
    ]);
  };

  const resetChat = () => {
    setMessages([]);
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open LovoPet Assistant"
          className="fixed bottom-6 right-6 z-[9999] w-16 h-16 rounded-full bg-gradient-to-br from-[#F36C32] to-[#E85D27] text-white shadow-[0_10px_30px_rgba(243,108,50,0.45)] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_12px_36px_rgba(243,108,50,0.6)] active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#F36C32]/40"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M21 11.5C21 16.19 16.97 20 12 20C10.78 20 9.62 19.77 8.56 19.36L4 21L5.2 17.1C3.82 15.76 3 13.72 3 11.5C3 6.81 7.03 3 12 3C16.97 3 21 6.81 21 11.5Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <circle cx="8.5" cy="11.5" r="1.1" fill="currentColor" />
            <circle cx="12" cy="11.5" r="1.1" fill="currentColor" />
            <circle cx="15.5" cy="11.5" r="1.1" fill="currentColor" />
          </svg>
          <span className="absolute top-1 right-1 flex w-3.5 h-3.5">
            <span className="absolute inline-flex w-full h-full rounded-full bg-[#32183D] opacity-60 animate-ping" />
            <span className="relative inline-flex w-3.5 h-3.5 rounded-full bg-[#32183D] border-2 border-white" />
          </span>
        </button>
      )}

      {isOpen && (
        <>
          {/* Mobile backdrop */}
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[9997] bg-[#32183D]/30 backdrop-blur-sm md:hidden"
          />

          {/* Chat Window */}
          <div className="fixed z-[9998] bottom-0 right-0 md:bottom-6 md:right-6 w-full md:w-[390px] h-[100dvh] md:h-[620px] bg-[#F8F3EC] md:rounded-3xl shadow-[0_20px_60px_rgba(50,24,61,0.35)] border border-[#E8DDD3] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#32183D] to-[#4A2558] px-5 py-4 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-full bg-white flex items-center justify-center overflow-hidden ring-2 ring-[#F36C32]/60">
                  <img
                    src="/logo.png"
                    alt="LovoPet"
                    className="w-9 h-9 object-contain"
                  />
                  <span className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-base leading-tight">
                    LovoPet Assistant
                  </h3>
                  <p className="text-white/70 text-xs">How can we help you?</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/25 hover:rotate-90 transition-all duration-200"
                aria-label="Close chatbot"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 6L18 18M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Chat Content */}
            <div className="flex-1 overflow-y-auto px-4 py-5 scroll-smooth">
              {/* Initial Bot Message */}
              <div className="flex gap-2 mb-5">
                <div className="w-8 h-8 shrink-0 rounded-full bg-[#32183D] flex items-center justify-center overflow-hidden">
                  <img
                    src="/logo.png"
                    alt="LovoPet"
                    className="w-7 h-7 object-contain"
                  />
                </div>
                <div className="max-w-[82%]">
                  <div className="bg-white border border-[#E8DDD3] rounded-2xl rounded-tl-sm px-4 py-3 text-sm leading-relaxed text-[#32183D] shadow-sm">
                    Hi! 👋 I'm the LovoPet Assistant. What can I help you with?
                  </div>
                </div>
              </div>

              {/* Messages */}
              {messages.map((message, index) => (
                <div key={index} className="mb-4">
                  {message.type === "user" ? (
                    <div className="flex justify-end">
                      <div className="bg-gradient-to-br from-[#F36C32] to-[#E85D27] text-white rounded-2xl rounded-tr-sm px-4 py-3 text-sm leading-relaxed max-w-[82%] shadow-md">
                        {message.text}
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <div className="w-8 h-8 shrink-0 rounded-full bg-[#32183D] flex items-center justify-center overflow-hidden">
                        <img
                          src="/logo.png"
                          alt="LovoPet"
                          className="w-7 h-7 object-contain"
                        />
                      </div>
                      <div className="max-w-[82%]">
                        <div className="bg-white border border-[#E8DDD3] rounded-2xl rounded-tl-sm px-4 py-3 text-sm leading-relaxed text-[#32183D] shadow-sm">
                          <p>{message.text}</p>

                          {message.link && (
                            <Link
                              to={message.link}
                              onClick={() => setIsOpen(false)}
                              className="mt-3 inline-flex items-center gap-2 bg-[#F36C32] text-white px-4 py-2 rounded-full text-xs font-semibold shadow-sm hover:bg-[#E85D27] hover:gap-3 transition-all"
                            >
                              {message.linkText}
                              <span>→</span>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Quick Questions */}
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#32183D]/55 mb-3">
                  Quick questions
                </p>

                <div className="flex flex-col gap-2">
                  {QUICK_QUESTIONS.map((question) => (
                    <button
                      key={question.id}
                      onClick={() => handleQuestion(question)}
                      className="text-left bg-white border border-[#E8DDD3] text-[#32183D] px-4 py-3 rounded-xl text-sm font-medium shadow-sm hover:border-[#F36C32] hover:bg-[#FFF8F2] hover:translate-x-1 hover:shadow-md active:scale-[0.98] transition-all duration-200"
                    >
                      {question.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Input Area */}
            <div className="border-t border-[#E8DDD3] bg-white/70 backdrop-blur px-4 py-3">
              <div className="flex items-center bg-white border border-[#E8DDD3] rounded-xl px-4 py-3 text-sm text-[#32183D]/45 cursor-not-allowed select-none">
                <span className="flex-1">AI chat coming soon...</span>
                <span className="text-[#F36C32] text-lg">✦</span>
              </div>

              {messages.length > 0 && (
                <button
                  onClick={resetChat}
                  className="mt-2 text-xs font-medium text-[#32183D]/55 hover:text-[#F36C32] transition"
                >
                  Start new conversation
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ChatbotWidget;
