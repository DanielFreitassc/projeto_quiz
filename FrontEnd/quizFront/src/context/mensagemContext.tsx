import React, { createContext, useContext, ReactNode, useState } from 'react';

type MessageContextType = {
  setMessage: React.Dispatch<React.SetStateAction<string | null>>;
  message: string | null;
};

const MessageContext = createContext<MessageContextType | undefined>(undefined);

type MessageProviderProps = {
  children: ReactNode;
};

const MessageProvider: React.FC<MessageProviderProps> = ({ children }) => {
  const [message, setMessage] = useState<string | null>(null);

  return (
    <MessageContext.Provider value={{ setMessage, message }}>
      {children}
    </MessageContext.Provider>
  );
};

const useMessage = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessage deve ser usado dentro de um MessageProvider');
  }
  return context;
};

export { MessageProvider, useMessage };