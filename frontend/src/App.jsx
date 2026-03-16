import { useEffect, useState } from "react";

import SearchBar from "./components/SearchBar";
import SnippetCard from "./components/SnippetCard";
import SnippetForm from "./components/SnippetForm";
import { createSnippet, deleteSnippet, getSnippets } from "./services/api";

function App() {
  const [snippets, setSnippets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadSnippets = async (search = "") => {
    setLoading(true);
    try {
      const data = await getSnippets(search);
      setSnippets(data);
      setError("");
    } catch (requestError) {
      setError("Unable to load snippets. Please make sure backend is running on localhost:8000.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSnippets();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadSnippets(searchTerm);
    }, 250);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSave = async (snippetData) => {
    setSaving(true);
    try {
      await createSnippet(snippetData);
      await loadSnippets(searchTerm);
    } catch (requestError) {
      setError("Unable to save snippet. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (snippetId) => {
    try {
      await deleteSnippet(snippetId);
      await loadSnippets(searchTerm);
    } catch (requestError) {
      setError("Unable to delete snippet. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100 md:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <header>
          <h1 className="text-3xl font-bold text-white">SnipVault</h1>
          <p className="text-slate-400">Store, search, and reuse your favorite code snippets.</p>
        </header>

        <SnippetForm onSave={handleSave} isSaving={saving} />
        <SearchBar value={searchTerm} onChange={setSearchTerm} />

        {error ? <p className="rounded-md border border-rose-500/30 bg-rose-500/10 p-3 text-rose-300">{error}</p> : null}

        {loading ? <p className="text-slate-300">Loading snippets...</p> : null}

        {!loading && snippets.length === 0 ? (
          <p className="text-slate-400">No snippets found. Create one to get started.</p>
        ) : null}

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {snippets.map((snippet) => (
            <SnippetCard key={snippet.id} snippet={snippet} onDelete={handleDelete} />
          ))}
        </section>
      </div>
    </main>
  );
}

export default App;
