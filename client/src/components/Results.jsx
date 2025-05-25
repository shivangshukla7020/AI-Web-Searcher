import { motion } from "framer-motion";

export default function Results({ results }) {
  if (!results.length) {
    return null;
  }

  // Variants for each item animation
  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <div className="mt-6 space-y-4">
      {results.map(({ title, summary, link, type }, index) => (
        <motion.div
          key={index}
          className="border p-4 rounded shadow hover:shadow-lg transition"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={itemVariants}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          layout
        >
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl font-semibold text-blue-700 hover:underline"
          >
            {title}
          </a>
          <p className="mt-2 text-gray-700">{summary}</p>
          <p className="mt-1 text-sm text-gray-500 italic">{type}</p>
        </motion.div>
      ))}
    </div>
  );
}
