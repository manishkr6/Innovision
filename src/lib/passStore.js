const KEY = 'innovision_registrations';

// Only passes the sheet confirmed count; older browser-generated ones have no `confirmed` flag.
export const getPasses = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]').filter((pass) => pass.confirmed === true);
  } catch (e) {
    return [];
  }
};

const save = (passes) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(passes));
    window.dispatchEvent(new Event('innovision_registration_added'));
  } catch (e) {
    console.error('Failed to save pass on this device', e);
  }
};

export const addPass = (pass) => save([...getPasses().filter((p) => p.id !== pass.id), pass]);

export const removePass = (id) => {
  const remaining = getPasses().filter((p) => p.id !== id);
  save(remaining);
  return remaining;
};
