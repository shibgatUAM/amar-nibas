import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import axiosSecure from '@/hooks/axiosSecure';
import toast from 'react-hot-toast';

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const ContactUs = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form[0].value;
    const email = form[1].value;
    const message = form[2].value;

    try {
      const res = await axiosSecure.post('/contact', { name, email, message });
      if (res.data.success) {
        toast.success('Message sent successfully!');
        form.reset();
      } else {
        toast.error('Failed to send message. Please try again later.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error(
        'An error occurred while sending your message. Please try again later.'
      );
    }
  };

  return (
    <motion.section
      ref={ref}
      variants={fadeUpVariant}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          Have a question, concern, or just want to say hello? Fill out the form
          below and we’ll get back to you as soon as possible.
        </p>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-6 max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md"
        >
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <textarea
            rows="5"
            placeholder="Your Message"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-primary hover:bg-opacity-90 transition text-white font-semibold py-3 rounded-none cursor-pointer"
          >
            Send Message
          </button>
        </form>
      </div>
    </motion.section>
  );
};

export default ContactUs;
