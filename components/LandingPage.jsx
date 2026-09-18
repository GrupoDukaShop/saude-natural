'use client';

import { useEffect } from 'react';
import { track } from '@vercel/analytics';

const CHECKOUT_URL = 'https://pay.cakto.com.br/3ct27k5_1110487';

export default function LandingPage({ markup }) {
  useEffect(() => {
    const progressBar = document.getElementById('scrollProgressBar');
    const topButton = document.getElementById('scrollToTop');

    const updateScrollState = () => {
      const scrollTop = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (progressBar) {
        progressBar.style.width = `${documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0}%`;
      }

      if (topButton) {
        topButton.classList.toggle('visible', scrollTop > 500);
      }
    };

    const revealElements = document.querySelectorAll(
      '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale'
    );

    let observer;
    if ('IntersectionObserver' in window && revealElements.length) {
      document.documentElement.classList.add('has-scroll-anim');
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-revealed');
            window.setTimeout(() => entry.target.classList.add('reveal-completed'), 800);
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );
      revealElements.forEach((element) => observer.observe(element));
    }

    const faqItems = document.querySelectorAll('.faq-item');
    const faqHandlers = [];
    faqItems.forEach((item) => {
      const question = item.querySelector('.faq-question');
      if (!question) return;
      const handler = () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach((faqItem) => faqItem.classList.remove('active'));
        if (!isActive) item.classList.add('active');
      };
      question.addEventListener('click', handler);
      faqHandlers.push([question, handler]);
    });

    const checkoutLinks = document.querySelectorAll(`a[href="${CHECKOUT_URL}"]`);
    const checkoutHandlers = [];
    const checkoutTimers = [];
    checkoutLinks.forEach((link) => {
      const handler = (event) => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

        event.preventDefault();
        track('checkout_click', { placement: link.className || 'checkout-link' });
        checkoutTimers.push(
          window.setTimeout(() => window.location.assign(CHECKOUT_URL), 500)
        );
      };
      link.addEventListener('click', handler);
      checkoutHandlers.push([link, handler]);
    });

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    topButton?.addEventListener('click', scrollToTop);
    window.addEventListener('scroll', updateScrollState, { passive: true });
    updateScrollState();

    return () => {
      observer?.disconnect();
      faqHandlers.forEach(([question, handler]) => question.removeEventListener('click', handler));
      checkoutHandlers.forEach(([link, handler]) => link.removeEventListener('click', handler));
      checkoutTimers.forEach((timer) => window.clearTimeout(timer));
      topButton?.removeEventListener('click', scrollToTop);
      window.removeEventListener('scroll', updateScrollState);
    };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}