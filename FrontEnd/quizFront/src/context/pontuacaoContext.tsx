import { createContext, useContext, useState, ReactNode } from "react";

interface PontuacaoContext {
    pontuacao: number;
    aumentarPontuacao: () => void;
}

interface PontuacaoProviderProps {
    children: ReactNode;
}

const PontuacaoContext = createContext<PontuacaoContext | undefined>(undefined);

const PontuacaoProvider: React.FC<PontuacaoProviderProps> = ({ children }) => {
    const [pontuacao, setPontuacao] = useState(0);

    const aumentarPontuacao = () => {
        setPontuacao((prevPontuacao) => prevPontuacao + 100);
    };

    const contextValue: PontuacaoContext = {
        pontuacao,
        aumentarPontuacao,
    };

    return (
        <PontuacaoContext.Provider value={contextValue}>
            {children}
        </PontuacaoContext.Provider>
    );
};

const usePontuacao = (): PontuacaoContext => {
    const context = useContext(PontuacaoContext);
    if (!context) {
        throw new Error("usePontuacao deve ser usado dentro de um PontuacaoProvider");
    }
    return context;
};

export { PontuacaoProvider, usePontuacao };