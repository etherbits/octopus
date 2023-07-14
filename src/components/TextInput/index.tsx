import { HtmlHTMLAttributes, Ref, useRef } from "react";
import * as Icon from "react-feather";

interface Props extends HtmlHTMLAttributes<HTMLInputElement> {
  icon: keyof typeof Icon;
  onValueChange?: (arg0: string) => void;
  pollDelay?: number;
}

const TextInput: React.FC<Props> = (props) => {
  const { icon, pollDelay, onValueChange, onChange, ...inputProps } = props;
  const LeftIcon = Icon[icon || "AlertCircle"];
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  return (
    <div className="flex items-center rounded-md outline outline-2 text-neutral-200 outline-neutral-900 px-3 py-2 gap-2 group focus-within:outline-neutral-600">
      <LeftIcon
        size={18}
        strokeWidth={1.5}
        className="stroke-neutral-400 group-focus-within:stroke-neutral-200"
      />
      <input
        type="text"
        className="bg-transparent outline-none placeholder:text-neutral-400 text-sm"
        onChange={(e) => {
          if (onChange) onChange(e);

          if (!onValueChange) return;
          const value = e.currentTarget.value;

          if (timeoutRef.current) clearTimeout(timeoutRef.current);

          timeoutRef.current = setTimeout(() => {
            onValueChange(value);
            clearTimeout(timeoutRef.current);
          }, pollDelay);
        }}
        {...inputProps}
      />
    </div>
  );
};

export default TextInput;
