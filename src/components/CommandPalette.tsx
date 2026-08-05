import React, { useEffect } from "react";
import { Command } from "cmdk";
import { useNavigate } from "react-router-dom";
import {
  Home,
  FolderGit2,
  Award,
  Briefcase,
  Mail,
  Terminal as TerminalIcon,
  Moon,
  Sun,
  Search,
} from "lucide-react";
import { useTheme } from "next-themes";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTerminal: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenTerminal,
}) => {
  const navigate = useNavigate();
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open handled by parent or toggle
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const runCommand = (action: () => void) => {
    action();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-xl bg-background border border-primary/30 rounded-2xl shadow-[0_0_40px_hsl(var(--primary)/0.2)] overflow-hidden">
        <Command className="w-full">
          <div className="flex items-center px-4 border-b border-border bg-secondary/30">
            <Search className="w-4 h-4 text-muted-foreground mr-2" />
            <Command.Input
              placeholder="Type a command or search..."
              className="w-full py-4 text-sm bg-transparent focus:outline-none placeholder:text-muted-foreground"
            />
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-muted text-muted-foreground">
              ESC
            </span>
          </div>

          <Command.List className="max-h-80 overflow-y-auto p-2 space-y-1">
            <Command.Empty className="p-4 text-sm text-center text-muted-foreground">
              No matching commands found.
            </Command.Empty>

            <Command.Group heading="Navigation" className="text-xs font-mono font-bold text-muted-foreground px-2 py-1 uppercase">
              <Command.Item
                onSelect={() => runCommand(() => navigate("/"))}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-primary/20 hover:text-primary cursor-pointer transition-colors"
              >
                <Home className="w-4 h-4 text-primary" />
                <span>Go to Home</span>
              </Command.Item>

              <Command.Item
                onSelect={() => runCommand(() => navigate("/work"))}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-primary/20 hover:text-primary cursor-pointer transition-colors"
              >
                <FolderGit2 className="w-4 h-4 text-primary" />
                <span>View Portfolio Projects</span>
              </Command.Item>

              <Command.Item
                onSelect={() => runCommand(() => navigate("/certificates"))}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-primary/20 hover:text-primary cursor-pointer transition-colors"
              >
                <Award className="w-4 h-4 text-primary" />
                <span>View Certificates & Expertise</span>
              </Command.Item>

              <Command.Item
                onSelect={() => runCommand(() => navigate("/experience"))}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-primary/20 hover:text-primary cursor-pointer transition-colors"
              >
                <Briefcase className="w-4 h-4 text-primary" />
                <span>View Experience Timeline</span>
              </Command.Item>

              <Command.Item
                onSelect={() => runCommand(() => navigate("/connect"))}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-primary/20 hover:text-primary cursor-pointer transition-colors"
              >
                <Mail className="w-4 h-4 text-primary" />
                <span>Contact & Connect</span>
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Cyber Tools & Preferences" className="text-xs font-mono font-bold text-muted-foreground px-2 py-1 uppercase mt-2">
              <Command.Item
                onSelect={() => runCommand(onOpenTerminal)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-primary/20 hover:text-primary cursor-pointer transition-colors"
              >
                <TerminalIcon className="w-4 h-4 text-cyan-400" />
                <span>Launch Cyber CLI Terminal</span>
              </Command.Item>

              <Command.Item
                onSelect={() => runCommand(() => setTheme(theme === "dark" ? "light" : "dark"))}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-primary/20 hover:text-primary cursor-pointer transition-colors"
              >
                {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
                <span>Toggle Theme ({theme === "dark" ? "Light Mode" : "Dark Mode"})</span>
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
};
