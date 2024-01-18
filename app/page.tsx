"use client";

import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const { push, refresh } = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      username: event.currentTarget.username.value,
      password: event.currentTarget.password.value,
    };

    try {
      const { data } = await axios.post("/api/auth/login", payload);

      console.log(JSON.stringify(data));

      // redirect the user to /dashboard
      push("/dashboard");
      refresh();
    } catch (e) {
      const error = e as AxiosError;

      alert(error.message);
    }
  };

  return (
    <main>
      <h1>Nextjs authentication JWT verify http cookie only</h1>

      <div className='flex min-h-screen flex-col items-center justify-between p-24'>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            required
            className="text-black px-1 border rounded border-black"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="text-black px-1 border rounded border-black"
          />
        </div>

        <button
          type="submit"
          className="p-2 bg-orange-600 text-white w-fit rounded"
        >
          Submit
        </button>
      </form>
      </div>
    </main>
  );
};
