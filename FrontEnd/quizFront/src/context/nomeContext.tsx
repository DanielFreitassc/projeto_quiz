import React, { createContext, useContext, ReactNode, useState } from 'react';

interface NomeContextType {
  nome: string | null;
  setNome: (novoNome: string) => void;
  limparNome: () => void;
}

interface NomeProviderProps {
  children: ReactNode;
}

const NomeContext = createContext<NomeContextType | undefined>(undefined);

const NomeProvider: React.FC<NomeProviderProps> = ({ children }) => {
  const [nome, setNomeState] = useState<string | null>(null);

  const setNome = (novoNome: string) => {
    setNomeState(novoNome);
  };

  const limparNome = () => {
    setNomeState(null);
  };

  const contextValue: NomeContextType = {
    nome,
    setNome,
    limparNome,
  };

  return <NomeContext.Provider value={contextValue}>{children}</NomeContext.Provider>;
};

const useNome = (): NomeContextType => {
  const context = useContext(NomeContext);
  if (!context) {
    throw new Error('useNome deve ser usado dentro de um NomeProvider');
  }
  return context;
};

export { NomeProvider, useNome };