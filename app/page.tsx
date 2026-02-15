"use client";

import { useState } from "react";
import {
  decrement,
  increment,
  incrementAsync,
  incrementByAmount,
} from "@/lib/features/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

export default function Home() {
  const dispatch = useAppDispatch();
  const counterValue = useAppSelector((state) => state.counter.value);
  const status = useAppSelector((state) => state.counter.status);
  const [amount, setAmount] = useState("5");

  const parsedAmount = Number(amount) || 0;

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-8 px-6">
        <h1 className="text-center text-3xl font-semibold tracking-tight">
          Redux Toolkit Action Listener Counter
        </h1>

        <p className="text-6xl font-bold">{counterValue}</p>

        <div className="grid w-full max-w-md grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => dispatch(decrement())}
            className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 font-medium hover:bg-zinc-800"
          >
            Decrement
          </button>
          <button
            type="button"
            onClick={() => dispatch(increment())}
            className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 font-medium hover:bg-zinc-800"
          >
            Increment
          </button>
        </div>

        <div className="flex w-full max-w-md items-center gap-3">
          <input
            type="number"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-zinc-100 outline-none ring-zinc-300 placeholder:text-zinc-400 focus:ring-2"
            placeholder="Amount"
          />
          <button
            type="button"
            onClick={() => dispatch(incrementByAmount(parsedAmount))}
            className="rounded-lg bg-emerald-500 px-4 py-3 font-medium text-emerald-950 hover:bg-emerald-400"
          >
            Add
          </button>
        </div>

        <button
          type="button"
          onClick={() => dispatch(incrementAsync(parsedAmount))}
          className="w-full max-w-md rounded-lg bg-cyan-400 px-4 py-3 font-semibold text-cyan-950 hover:bg-cyan-300"
        >
          Increment Async (listener)
        </button>

        <p className="text-sm text-zinc-300">
          Status: <span className="font-semibold">{status}</span>
        </p>
      </div>
    </main>
  );
}
