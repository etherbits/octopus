interface Props {
  defaultValue?: number;
  value?: number;
  maxValue?: number;
  onChange?: (percentage: number) => void;
}

const ProgressBar: React.FC<Props> = ({
  defaultValue = 0,
  value,
  maxValue,
  onChange,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!onChange) return;
    const bar = e.currentTarget as HTMLDivElement;

    onChange((e.pageX - bar.offsetLeft) / bar.clientWidth);
  };

  return (
    <div
      className="w-full h-2 bg-neutral-800 rounded-md overflow-hidden"
      onClick={handleClick}
    >
      <div
        className={`h-full bg-orange-600 rounded-md`}
        style={{
          width:
            (maxValue && maxValue > 0
              ? ((value ?? defaultValue) / maxValue) * 100
              : 0) + "%",
        }}
      />
    </div>
  );
};

export default ProgressBar;
