const Search = () => {
  return (
    <div className="flex items-center gap-3 bg-neutral-900 rounded-md py-1 px-2 w-full focus-within:outline outline-1 outline-neutral-600">
      <div className="flex-shrink-0 w-5 h-5 bg-neutral-600 [mask-image:url(/assets/icons/search.svg)]" />
      <input
        className="bg-transparent text-neutral-200 w-full placeholder:text-neutral-600 focus:outline-none"
        placeholder="Search"
      />
    </div>
  );
};

export default Search;
