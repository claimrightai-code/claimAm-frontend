export const isEmail = (value: string) => {
  if (!value) return false;
  return /^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/.test(value);
};

export const isPhone = (value: string) => {
  if (!value) return false;
  return /^[+0-9\s()-]{7,20}$/.test(value);
};

export const scrollToFirstError = (errors: Record<string, string> | null | undefined) => {
  if (!errors) return;
  const keys = Object.keys(errors);
  if (!keys.length) return;
  const firstKey = keys[0];
  const selector = `[name="${firstKey}"], #${firstKey}, [data-field="${firstKey}"]`;
  const el = document.querySelector(selector) as HTMLElement | null;
  if (el) {
    try {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      (el as any).focus?.();
    } catch (e) {
      // ignore
    }
  } else {
    // Fallback: scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

export const required = (value: string | undefined | null) => {
  return value === undefined || value === null || (typeof value === "string" && !value.trim());
};