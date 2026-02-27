"use client";
import React, { useState, useCallback, useRef, FC, ChangeEvent } from "react";
import { useClickAway } from "react-use";

interface Option {
  value: number;
  text: number;
}

type NiceSelectProps = {
  options: Option[];
  defaultCurrent?: number;
  value?: number;
  placeholder: string;
  className?: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  name: string;
};

const NumberNiceSelect: FC<NiceSelectProps> = ({
  options,
  defaultCurrent,
  value,
  placeholder,
  className,
  onChange,
  name,
}) => {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<Option | undefined>(
    value !== undefined
      ? options.find((o) => o.value === value)
      : defaultCurrent !== undefined
        ? options[defaultCurrent]
        : undefined,
  );

  React.useEffect(() => {
    if (value !== undefined) {
      const option = options.find((o) => o.value === value);
      if (option) setCurrent(option);
    }
  }, [value, options]);
  const onClose = useCallback(() => {
    setOpen(false);
  }, []);
  const ref = useRef<HTMLDivElement | null>(null);

  useClickAway(ref, onClose);

  const currentHandler = (item: Option) => {
    setCurrent(item);
    onChange({
      target: { value: item.value },
    } as unknown as ChangeEvent<HTMLSelectElement>);
    onClose();
  };

  return (
    <div
      className={`nice-select form-select-lg ${className || ""} ${open ? "open" : ""}`}
      role="button"
      tabIndex={0}
      onClick={() => setOpen((prev) => !prev)}
      onKeyDown={(e) => e}
      ref={ref}
    >
      <span className="current">{current?.text || placeholder}</span>
      <ul
        className="list"
        role="menubar"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        {options?.map((item, i) => (
          <li
            key={i}
            data-value={item.value}
            className={`option ${
              item.value === current?.value ? "selected focus" : ""
            }`}
            style={{ fontSize: "14px" }}
            role="menuitem"
            onClick={() => currentHandler(item)}
            onKeyDown={(e) => e}
          >
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NumberNiceSelect;
