'use client';

import { useEffect } from 'react';

const CHECKOUT_URL = 'https://pay.cakto.com.br/3ct27k5_1110487';

export default function CheckoutRedirect() {
  useEffect(() => {
    const redirectTimer = window.setTimeout(() => {
      window.location.replace(CHECKOUT_URL);
    }, 500);

    return () => window.clearTimeout(redirectTimer);
  }, []);

  return null;
}