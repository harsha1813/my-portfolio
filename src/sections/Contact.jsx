import emailjs from '@emailjs/browser';
import { useRef, useState } from 'react';
import useAlert from '../hooks/useAlert.js';
import Alert from '../components/Alert.jsx';

const Contact = () => {
  const formRef = useRef();
  const { alert, showAlert, hideAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.send(
        'service_1rzvmge', // Service ID
        'template_ynsg9ze', // Template ID
        {
          from_name: form.name,
          to_name: 'BHEEMANATHI HARHSAVARDHAN',
          from_email: form.email,
          to_email: 'bheemanathiharsha@gmail.com',
          message: form.message,  
        },     
         'LE-hg0yZE0shNsveK' // Public Key
        
    )

      setLoading(false);
      alert('sent');

      setForm({
      name: '',
      email: '',
      message: '',
      });
      
    } catch (error) {
      setLoading(false);
      console.error(error);
      alert(' not sent');
    }
  };

  return (
    <section className="c-space my-20" id="contact">
      {alert.show && <Alert {...alert} />}
      <div className="relative min-h-screen flex items-center justify-center flex-col">
        <img src="/assets/terminal.png" alt="terminal-bg" className="absolute inset-0 min-h-screen" />
        <div className="contact-container">
          <h3 className="head-text">Let’s Make Magic Happen!</h3>
          <p className="text-lg text-white-600 mt-3">
            Whether it's about work, ideas, or just to say hello—I'm all ears (well, technically, eyes). Drop me a line!
          </p>
          <form ref={formRef} onSubmit={handleSubmit} className="mt-12 flex flex-col space-y-7">
            <label className="space-y-3">
              <span className="field-label">Full Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="field-input"
                placeholder="Agent 007, what's your real name??"
              />
            </label>
            <label className="space-y-3">
              <span className="field-label">Email address</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="field-input"
                placeholder="The one you actually check, please!!"
              />
            </label>
            <label className="space-y-3">
              <span className="field-label">Your message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="field-input"
                placeholder="Your message in a bottle goes here...."
              />
            </label>
            <button className="field-btn" type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
              <img src="/assets/arrow-up.png" alt="arrow-up" className="field-btn_arrow" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
