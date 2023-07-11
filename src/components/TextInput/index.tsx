const TextInput = () => {
  return (
    <div className="flex rounded-md outline outline-2 outline-neutral-900 text-neutral-200 px-3 py-2 gap-2">
      <img src="/assets/icons/search.svg" />
      <input
        type="text"
        placeholder="Search album..."
        className="bg-transparent outline-none placeholder:text-neutral-400 text-sm"
      />
    </div>
  );
};

export default TextInput;
