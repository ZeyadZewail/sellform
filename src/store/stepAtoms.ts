import { atom } from "jotai/index";
import { Make, Model } from "../types/types.ts";

export const makeAtom = atom<Make | null>(null);
export const modelAtom = atom<Model | null>(null);

export const yearAtom = atom<number | null>(null);

export const kilometerAtom = atom<number | null>(null);
