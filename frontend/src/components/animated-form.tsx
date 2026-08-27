import { motion, type Variants } from 'framer-motion';
import { Children } from 'react';

interface AnimatedFormProps {
  children: React.ReactNode;
  onSubmit?: (e: React.SubmitEvent<HTMLFormElement>) => void;
  className?: string;
}

export function AnimatedForm({ children, onSubmit, className = '' }: AnimatedFormProps) {
   const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
  };

  return (
    <motion.form
      onSubmit={onSubmit}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {Children.map(children, (child) => (
        <motion.div variants={itemVariants}>{child}</motion.div>
      ))}
    </motion.form>
  );
}