import { useEffect, useRef, useState } from "react";

const MOVE_STEP = 16;

function CaseStudyWindow({ project, onClose }) {
  const dialogRef = useRef(null);
  const dragRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!project) {
      return undefined;
    }

    const previousActiveElement = document.activeElement;
    const dialog = dialogRef.current;
    dialog?.showModal();
    dialog?.querySelector(".case-window-close")?.focus();

    return () => {
      dialog?.close();
      previousActiveElement?.focus();
    };
  }, [project]);

  if (!project) {
    return null;
  }

  const handleClose = () => {
    setPosition({ x: 0, y: 0 });
    onClose();
  };

  const handlePointerDown = (event) => {
    if (event.pointerType !== "mouse" || event.button !== 0) {
      return;
    }

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: position.x,
      originY: position.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    const drag = dragRef.current;

    if (!drag || drag.pointerId !== event.pointerId) {
      return;
    }

    setPosition({
      x: drag.originX + event.clientX - drag.startX,
      y: drag.originY + event.clientY - drag.startY,
    });
  };

  const stopDragging = (event) => {
    if (dragRef.current?.pointerId === event.pointerId) {
      dragRef.current = null;
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleTitleKeyDown = (event) => {
    const movement = {
      ArrowUp: { x: 0, y: -MOVE_STEP },
      ArrowDown: { x: 0, y: MOVE_STEP },
      ArrowLeft: { x: -MOVE_STEP, y: 0 },
      ArrowRight: { x: MOVE_STEP, y: 0 },
    }[event.key];

    if (!movement) {
      return;
    }

    event.preventDefault();
    setPosition((current) => ({
      x: current.x + movement.x,
      y: current.y + movement.y,
    }));
  };

  return (
    <dialog
      className="case-window-dialog"
      ref={dialogRef}
      aria-labelledby={`case-title-${project.id}`}
      onCancel={(event) => {
        event.preventDefault();
        handleClose();
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) {
          handleClose();
        }
      }}
    >
      <article
        className="case-window"
        style={{ "--window-x": `${position.x}px`, "--window-y": `${position.y}px` }}
      >
        <header
          className="case-window-bar"
          tabIndex="0"
          aria-label="Drag case study window. Use arrow keys to move it."
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={stopDragging}
          onPointerCancel={stopDragging}
          onKeyDown={handleTitleKeyDown}
        >
          <div className="window-dots" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <p>{project.number} / CASE STUDY</p>
          <button
            className="case-window-close"
            type="button"
            aria-label={`Close ${project.title} case study`}
            onClick={handleClose}
          >
            CLOSE
          </button>
        </header>

        <div className="case-window-body">
          <img src={project.image} alt="" />

          <div className="case-window-copy">
            <p className="project-type">{project.type}</p>
            <h2 id={`case-title-${project.id}`}>{project.title}</h2>
            <p>{project.description}</p>

            <dl>
              {Object.entries(project.caseStudy).map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </article>
    </dialog>
  );
}

export default CaseStudyWindow;
