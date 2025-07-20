import { motion } from 'framer-motion';
import React from 'react';
import { useInView } from 'react-intersection-observer';

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const AboutUs = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.section
      ref={ref}
      variants={fadeUpVariant}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="bg-white py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-4xl font-extrabold text-[#0B2C3D] mb-4">
          About <span className="text-[#FF503C]">Us</span>
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto mb-10">
          We are a passionate team committed to helping people connect with the
          right properties and opportunities. Whether you're an agent listing a
          home or a user searching for the perfect match, our platform ensures
          efficiency, transparency, and trust.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {[
            {
              title: 'Our Vision',
              text: 'To revolutionize the way people explore real estate or career opportunities by making the process simple and user-friendly.',
            },
            {
              title: 'Our Mission',
              text: 'Empower users with tools and insights to make informed decisions when buying, selling, or renting properties.',
            },
            {
              title: 'Why Us',
              text: (
                <ul className="list-disc list-inside space-y-1">
                  <li>Trusted agent network</li>
                  <li>Smart search & filters</li>
                  <li>Real-time updates</li>
                  <li>User reviews & ratings</li>
                  <li>Secure & responsive platform</li>
                </ul>
              ),
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={fadeUpVariant}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              transition={{ delay: 0.1 * index }}
              className="bg-gray-100 p-6 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold mb-2 text-primary">
                {item.title}
              </h3>
              <div className="text-gray-700">{item.text}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default AboutUs;
