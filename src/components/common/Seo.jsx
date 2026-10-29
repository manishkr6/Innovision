import { useEffect } from 'react';

export const Seo = ({ title, description }) => {
  useEffect(() => {
    const baseTitle = "INNOVISION 2026 | The ICFAI University, Sikkim";
    document.title = title ? `${title} | INNOVISION 2026` : baseTitle;

    if (description) {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', description);
      }
    }
  }, [title, description]);

  return null;
};

