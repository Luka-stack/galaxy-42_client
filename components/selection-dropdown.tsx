import { useEffect, useRef, useState } from 'react';

export interface Selectable {
  id: string;
  label: string;
}

interface Props {
  title: String;
  selectables: Selectable[];
  selected: Selectable;
  setSelectable: (item: Selectable) => void;
}

export const SelectionDropdown = ({
  title,
  selectables,
  selected,
  setSelectable,
}: Props) => {
  const [show, setShow] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const closeDropdown = (event: any) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        show
      ) {
        setShow(false);
        return;
      }
    };

    document.addEventListener('mousedown', closeDropdown);

    return () => {
      document.removeEventListener('mousedown', closeDropdown);
    };
  }, [dropdownRef, show]);

  return (
    <div
      className="relative w-40 py-1 text-center rounded-full cursor-pointer bg-bg-500 text-gx-purple-500 group"
      ref={dropdownRef}
      onClick={() => setShow(!show)}
    >
      {`${title}: ${selected.label}`}
      {show && (
        <div className="absolute w-full mt-2 overflow-hidden text-right border rounded-lg bg-bg-500 border-gx-purple-500/50">
          {selectables.map((option) => (
            <p
              key={option.id}
              className="py-1 pr-4 cursor-pointer hover:bg-bg-400 hover:text-center"
              onClick={() => setSelectable(option)}
            >
              {option.label}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};
