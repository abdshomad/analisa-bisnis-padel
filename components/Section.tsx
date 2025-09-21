
import React from 'react';

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

// FIX: Wrapped Section component with React.forwardRef to allow passing refs.
const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ id, title, children, className = '' }, ref) => {
    return (
      <section ref={ref} id={id} className={`py-12 md:py-16 ${className}`}>
        <h2 className="text-3xl font-bold text-center mb-2 text-brand-cyan">{title}</h2>
        <div className="w-20 h-1 bg-brand-cyan mx-auto mb-10"></div>
        {children}
      </section>
    );
  }
);

Section.displayName = 'Section';

export default Section;
