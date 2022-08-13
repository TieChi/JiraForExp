import { useState } from "react";

export const useUndo = <T>(initialState: T) => {
  const [past, setPast] = useState<T[]>([]);
  const [present, setPresent] = useState(initialState);
  const [future, setFuture] = useState<T[]>([]);

  const canUndo = past.length !== 0;
  const canRedo = future.length !== 0;

  const undo = () => {
    if (!canUndo) return;

    // 分别取到尚未使用的，新present值和剪掉末尾的新past数组。
    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);

    setPast(newPast);
    setPresent(previous);
    setFuture([present, ...future]);
  };

  const redo = () => {
    if (!canRedo) return;

    // 取新present值和剪掉开头的新future。

    const next = future[0];
    const newFutrue = future.slice(0);

    setPast([...past, present]);
    setPresent(next);
    setFuture(newFutrue);
  };

  const set = (newPresent: T) => {
    if (present === newPresent) return;

    setPast([...past, present]);
    setPresent(newPresent);
    setFuture([]);
  };

  const reset = (newPresent: T) => {
    setPast([]);
    setPresent(newPresent);
    setFuture([]);
  };

  return [
    { past, present, future },
    { set, reset, undo, redo, canUndo, canRedo },
  ] as const;
};
