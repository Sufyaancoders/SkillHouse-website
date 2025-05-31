import React, { useRef, useState, useEffect } from 'react';

const VerificationInput = ({ length = 6, onComplete }) => {
  const [code, setCode] = useState(Array(length).fill(''));
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  const handleChange = (index, value) => {
    if (!/^\d{0,1}$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    const fullCode = newCode.join('');
    if (fullCode.length === length && onComplete) {
      onComplete(fullCode);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();

    if (!/^\d+$/.test(pastedData)) return;

    const digits = pastedData.split('').slice(0, length);
    const newCode = [...code];

    digits.forEach((digit, index) => {
      if (index < length) {
        newCode[index] = digit;
      }
    });

    setCode(newCode);

    const nextEmptyIndex = newCode.findIndex(digit => !digit);
    const focusIndex = nextEmptyIndex === -1 ? length - 1 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();

    if (newCode.filter(Boolean).length === length && onComplete) {
      onComplete(newCode.join(''));
    }
  };

  return (
    <div className="flex justify-center gap-2 sm:gap-4 w-full max-w-md mx-auto" onPaste={handlePaste}>
      {Array.from({ length }).map((_, index) => (
        <div key={index} className="relative w-full">
          <input
            ref={el => inputRefs.current[index] = el}
            type="text"
            inputMode="numeric"
            pattern="\d*"
            maxLength={1}
            value={code[index]}
            onChange={e => handleChange(index, e.target.value)}
            onKeyDown={e => handleKeyDown(index, e)}
            className="w-full aspect-square text-center text-2xl font-semibold bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 shadow-sm"
            autoComplete="one-time-code"
            aria-label={`Digit ${index + 1}`}
          />
          <div
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-blue-500 transition-all duration-300 ease-out ${
              code[index] ? 'w-full' : ''
            }`}
          />
        </div>
      ))}
    </div>
  );
};

export default VerificationInput;
