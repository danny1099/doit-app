declare global {
  interface Children {
    children: React.ReactNode;
  }

  interface APIResult<T> {
    data: T | null;
    code: number;
    message: string | null;
    status: "success" | "error";
    error?: Error | null;
    errorMessage?: string | null;
  }
}

export {};
