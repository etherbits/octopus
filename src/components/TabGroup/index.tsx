interface Props {
  label: string;
  children: React.ReactNode;
}

const TabGroup: React.FC<Props> = ({ label, children }) => {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-neutral-600">{label}</span>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
};

export default TabGroup;
