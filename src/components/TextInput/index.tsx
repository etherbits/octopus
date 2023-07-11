import * as Icon from "react-feather";

interface Props {
  icon: keyof typeof Icon;
  placeholder?: string;
}

const TextInput: React.FC<Props> = ({ icon, placeholder }) => {
  const LeftIcon = Icon[icon || "AlertCircle"];

  return (
    <div className="flex items-center rounded-md outline outline-2 outline-neutral-900 text-neutral-200 px-3 py-2 gap-2">
      <LeftIcon size={18} color="#a3a3a3" strokeWidth={1.5} />
      <input
        type="text"
        placeholder={placeholder}
        className="bg-transparent outline-none placeholder:text-neutral-400 text-sm"
      />
    </div>
  );
};

export default TextInput;
