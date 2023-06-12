"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

function Search() {
  const [search, setSearch] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch("");
    router.push(`/${search}/ `);
  };

  return (
    <form
      className="w-50 flex justify-center md:justify-between"
      onSubmit={handleSubmit}
    >
      <input
        className="bg-white p-2 w-80 text-xl rounded-xl"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
      />
      <button
        className="p-2 text-xl rounded-xl bg-slate-300 ml-2 font-bold"
        type="submit"
      >
        🚀
      </button>
    </form>
  );
}

export default Search;
