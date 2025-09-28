import { useState } from 'react';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { Link, useNavigate } from 'react-router-dom';
import FormHeader from '../forms/FormHeader';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: [] as string[], // Change to array for multiple errors
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const navigate = useNavigate();

  // Validation functions
  const validateEmail = (email: string): string => {
    if (!email) return 'Email is required';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address';

    return '';
  };

  const validatePassword = (password: string): string[] => {
    const passwordErrors: string[] = [];

    if (!password) {
      passwordErrors.push('Password is required');
      return passwordErrors; // Return early if no password
    }

    if (password.length < 8) {
      passwordErrors.push('Password must be at least 8 characters');
    }

    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (!hasLetter || !hasNumber) {
      passwordErrors.push('Password must contain both letters and numbers');
    }

    return passwordErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    // Clear error when user starts typing
    if (errors[id as keyof typeof errors]) {
      if (id === 'password') {
        setErrors((prev) => ({
          ...prev,
          [id]: [],
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          [id]: '',
        }));
      }
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setTouched((prev) => ({
      ...prev,
      [id]: true,
    }));

    // Validate field on blur
    if (id === 'email') {
      const error = validateEmail(value);
      setErrors((prev) => ({
        ...prev,
        [id]: error,
      }));
    } else if (id === 'password') {
      const passwordErrors = validatePassword(value);
      setErrors((prev) => ({
        ...prev,
        [id]: passwordErrors,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      email: true,
      password: true,
    });

    // Get validation results
    const emailError = validateEmail(formData.email);
    const passwordErrors = validatePassword(formData.password);

    // Update errors state
    setErrors({
      email: emailError,
      password: passwordErrors,
    });

    // Check if form is valid
    const isFormValid = !emailError && passwordErrors.length === 0;

    if (isFormValid) {
      navigate('/overview');
    } else {
      console.log('error');
    }
  };

  // Helper to determine if button should be disabled
  const isFormValid = () => {
    return (
      formData.email &&
      formData.password &&
      !errors.email &&
      errors.password.length === 0
    );
  };

  return (
    <form
      className="lg:border max-lg:w-full flex flex-col gap-12 border-[#A4A7B74D] rounded-lg py-[74px] px-10 md:px-[132px]"
      onSubmit={handleSubmit}
    >
      <FormHeader title="Login">
        <p className="text-[#737373]">Kindly enter your details to log in </p>
      </FormHeader>

      <div className="w-full lg:w-[335px] flex flex-col gap-5">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <Input
              id="email"
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              hasError={touched.email && !!errors.email}
            />
            {touched.email && errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Input
              id="password"
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              hasError={touched.password && errors.password.length > 0}
            />
            {touched.password && errors.password.length > 0 && (
              <div className="mt-1">
                {errors.password.map((error, index) => (
                  <p key={index} className="text-red-500 text-xs">
                    • {error}
                  </p>
                ))}
              </div>
            )}
          </div>

          <Button
            className={!isFormValid() ? 'opacity-50 cursor-not-allowed' : ''}
          >
            Log in
          </Button>
        </div>
        <Link className="text-[#0A74DC] text-center text-sm" to="/overview">
          Forgot your password?
        </Link>
      </div>

      <p className="text-center text-xs text-[#B0B9C8]">
        <span className="text-[#0B2253] underline"> Privacy Policy</span> and{' '}
        <span className="text-[#0B2253] underline">Terms of Services</span>
      </p>
    </form>
  );
};

export default LoginForm;
