import { useEffect, useRef } from "react";

function CommandPalette({ commands, isOpen, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousActiveElement = document.activeElement;
    const dialog = dialogRef.current;
    dialog?.showModal();
    dialog?.querySelector("button")?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      dialog?.close();
      previousActiveElement?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const runCommand = (command) => {
    command.action();
    onClose();
  };

  return (
    <dialog
      className="command-palette"
      ref={dialogRef}
      aria-labelledby="command-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) {
          onClose();
        }
      }}
    >
      <div className="command-window">
        <div className="command-heading">
          <div>
            <p>QUICK NAVIGATION</p>
            <h2 id="command-title">Where to?</h2>
          </div>
          <button type="button" aria-label="Close command palette" onClick={onClose}>
            ESC
          </button>
        </div>

        <div className="command-list">
          {commands.map((command) => (
            <button
              type="button"
              onClick={() => runCommand(command)}
              key={command.label}
            >
              <span>{command.label}</span>
              <small>{command.hint}</small>
            </button>
          ))}
        </div>

        <p className="command-footer">Press Ctrl+K anytime to open this menu.</p>
      </div>
    </dialog>
  );
}

export default CommandPalette;
