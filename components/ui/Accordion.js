"use client";

import { createContext, use, useEffect, useRef, useState } from "react";

const AccordionItemContext = createContext(null);

export function AccordionItem({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <AccordionItemContext value={{ open, toggle: () => setOpen((o) => !o) }}>
      <div className={"accordion-item" + (open ? " open" : "")}>{children}</div>
    </AccordionItemContext>
  );
}

export function AccordionTrigger({ children }) {
  const { toggle } = use(AccordionItemContext);
  return (
    <button className="accordion-trigger" onClick={toggle}>
      <span>{children}</span>
      <span className="plus">+</span>
    </button>
  );
}

// The panel animates max-height, so it needs the content's real height; a
// ResizeObserver keeps that correct when the viewport or content reflows.
export function AccordionPanel({ children }) {
  const { open } = use(AccordionItemContext);
  const innerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const inner = innerRef.current;
    const observer = new ResizeObserver(() => setHeight(inner.offsetHeight));
    observer.observe(inner);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="accordion-panel" style={open ? { maxHeight: height + "px" } : undefined}>
      <div className="accordion-panel-inner" ref={innerRef}>{children}</div>
    </div>
  );
}
