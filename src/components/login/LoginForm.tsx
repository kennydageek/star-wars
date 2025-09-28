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
    password: '',
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

  const validatePassword = (password: string): string => {
    if (!password) return 'Password is required';

    if (password.length < 8) return 'Password must be at least 8 characters';

    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (!hasLetter || !hasNumber) {
      return 'Password must contain both letters and numbers';
    }

    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    // Clear error when user starts typing
    if (errors[id as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [id]: '',
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setTouched((prev) => ({
      ...prev,
      [id]: true,
    }));

    // Validate field on blur
    let error = '';
    if (id === 'email') {
      error = validateEmail(value);
    } else if (id === 'password') {
      error = validatePassword(value);
    }

    setErrors((prev) => ({
      ...prev,
      [id]: error,
    }));
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
    const passwordError = validatePassword(formData.password);

    // Update errors state
    setErrors({
      email: emailError,
      password: passwordError,
    });

    // Check if form is valid using the direct results
    const isFormValid = !emailError && !passwordError;

    if (isFormValid) {
      console.log('Login successful:', formData);
      // Redirect to dashboard on successful validation
      navigate('/overview');
    } else {
      console.log('Validation failed - current errors:', {
        email: emailError,
        password: passwordError,
      });
      console.log('Form data:', formData);
    }
  };

  // Helper to determine if button should be disabled
  const isFormValid = () => {
    return (
      formData.email && formData.password && !errors.email && !errors.password
    );
  };

  return (
    <form
      className="border flex flex-col gap-12 border-[#A4A7B74D] rounded-lg py-[74px] px-[132px]"
      onSubmit={handleSubmit}
    >
      <FormHeader title="Login">
        <p className="text-[#737373]">Kindly enter your details to log in </p>
      </FormHeader>

      <div className="w-[335px] flex flex-col gap-5">
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
              hasError={touched.password && !!errors.password}
            />
            {touched.password && errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <Button
            disabled={!isFormValid()}
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
