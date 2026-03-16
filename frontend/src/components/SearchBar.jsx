function SearchBar({ value, onChange }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
      <input
        type="text"
        className="w-full rounded-md border border-slate-700 bg-slate-950 p-2 text-slate-100"
        placeholder="Search by title or tag..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

export default SearchBar;
