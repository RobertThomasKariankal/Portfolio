import React, { createContext, useContext, useState } from "react";
import { TerminalModal } from "@/components/TerminalModal";
import { CommandPalette } from "@/components/CommandPalette";
import { MatrixBackground } from "@/components/MatrixBackground";

interface CyberUiContextType {
  isTerminalOpen: boolean;
  openTerminal: () => void;
  closeTerminal: () => void;
  isCommandPaletteOpen: boolean;
  openCommandPalette: () => void;
  closeCommandPalette: () => void;
  isMatrixActive: boolean;
  toggleMatrix: () => void;
}

const CyberUiContext = createContext<CyberUiContextType | undefined>(undefined);

export const CyberUiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isMatrixActive, setIsMatrixActive] = useState(false);

  const openTerminal = () => setIsTerminalOpen(true);
  const closeTerminal = () => setIsTerminalOpen(false);
  const openCommandPalette = () => setIsCommandPaletteOpen(true);
  const closeCommandPalette = () => setIsCommandPaletteOpen(false);
  const toggleMatrix = () => setIsMatrixActive((prev) => !prev);

  return (
    <CyberUiContext.Provider
      value={{
        isTerminalOpen,
        openTerminal,
        closeTerminal,
        isCommandPaletteOpen,
        openCommandPalette,
        closeCommandPalette,
        isMatrixActive,
        toggleMatrix,
      }}
    >
      <MatrixBackground active={isMatrixActive} />
      {children}
      <TerminalModal isOpen={isTerminalOpen} onClose={closeTerminal} />
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={closeCommandPalette}
        onOpenTerminal={openTerminal}
      />
    </CyberUiContext.Provider>
  );
};

export const useCyberUi = () => {
  const context = useContext(CyberUiContext);
  if (!context) {
    throw new Error("useCyberUi must be used within a CyberUiProvider");
  }
  return context;
};
