import { motion } from "framer-motion";

export default function Results({ results }) {
  if (!results.length) {
    return null;
  }

  // Container variants to stagger children animations
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Variants for each item animation
  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <motion.div
      className="mt-6 space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {results.map(({ title, summary, link, type }, index) => (
        <motion.div
          key={index}
          className="border p-4 rounded shadow hover:shadow-lg transition"
          variants={itemVariants}
          transition={{ duration: 0.15 }}
          layout
        >
          <a
            className="text-xl font-semibold text-blue-700 hover:underline"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {title}
          </a>

          <p className="text-gray-500 truncate" title={link}>
            {link}
          </p>

          <p className="mt-2 text-gray-700">{summary}</p>
          <p className="mt-1 text-sm text-gray-500 italic">{type}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
