import React, { useState } from "react";
import Alert from "../components/Alert";
import { Particles } from "../components/Particles";
import { useScrollReveal } from "../hooks/useScrollReveal";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const [sectionRef, isVisible] = useScrollReveal({
    threshold: 0.1,
    once: true,
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const showAlertMessage = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/Contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      setFormData({ name: "", email: "", message: "" });
      showAlertMessage("success", "Message sent successfully!");
    } catch (err) {
      console.error(err);
      showAlertMessage("danger", "Failed to send message.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative flex items-center c-space section-spacing"
    >
      <Particles
        className="absolute inset-0 z-50"
        quantity={100}
        ease={80}
        color="#fff"
        refresh
      />

      {showAlert && <Alert type={alertType} text={alertMessage} />}

      <div
        ref={sectionRef}
        className={`flex flex-col items-center justify-center max-w-md p-5 mx-auto
        border border-white/10 rounded-2xl bg-primary scroll-reveal ${
          isVisible ? "visible" : ""
        }`}
      >
        <div className="flex flex-col items-start w-full gap-5 mb-10">
          <h2 className="text-heading">Let’s Talk</h2>
          <p className="text-neutral-400">
            Whether it’s a new feature, a full-scale platform, or a system that
            needs stability and performance — I help ship software that lasts.
          </p>
        </div>

        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="field-label">Full Name</label>
            <input
              name="name"
              className="field-input field-input-focus"
              placeholder="Your good name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-5">
            <label className="field-label">Email</label>
            <input
              name="email"
              type="email"
              className="field-input field-input-focus"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-5">
            <label className="field-label">Message</label>
            <textarea
              name="message"
              rows={4}
              className="field-input field-input-focus"
              placeholder="This message lands directly in my email — feel free to say hello or ask anything."
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-md bg-radial from-lavender hover-animation"
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
