export const checkPasswordStrength = (password: string): string => {
  const hasNumber = /[0-9]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  const length = password.length;

  const strength = [hasNumber, hasUpper, hasLower, hasSpecial].filter(Boolean).length;

  if (length === 0) return '';
  if (length < 8) return 'Too short';
  if (strength === 1) return 'Very weak';
  if (strength === 2) return 'Weak';
  if (strength === 3) return 'Medium';
  return 'Strong';
};

export const getPasswordStrengthColor = (passwordStrength: string) => {
  switch (passwordStrength) {
    case 'Very weak': return 'red';
    case 'Weak': return 'orange';
    case 'Medium': return 'yellow';
    case 'Strong': return 'green';
    default: return 'gray';
  }
};