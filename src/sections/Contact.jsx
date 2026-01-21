import React, { useState } from "react";
import Alert from "../components/Alert";
import { Particles } from "../components/Particles";
import { useScrollReveal } from "../hooks/useScrollReveal";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isLoading, setisLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("Empty");

  const [sectionRef, isVisible] = useScrollReveal({
    threshold: 0.1,
    once: true,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showAlertMessage = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  // 🔁 ONLY REAL CHANGE IS HERE
  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);

    try {
      const response = await fetch("http://localhost:5137/api/Contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error("API error");
      }

      setFormData({ name: "", email: "", message: "" });
      showAlertMessage("success", result.message || "Message sent!");
    } catch (error) {
      console.error(error);
      showAlertMessage("danger", "Something went wrong!");
    } finally {
      setisLoading(false);
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
        color={"#ffffff"}
        refresh
      />

      {showAlert && <Alert type={alertType} text={alertMessage} />}

      <div
        ref={sectionRef}
        className={`flex flex-col items-center justify-center max-w-md p-5 mx-auto border border-white/10 rounded-2xl bg-primary scroll-reveal ${
          isVisible ? "visible" : ""
        }`}
      >
        <div className="flex flex-col items-start w-full gap-5 mb-10">
          <h2 className="text-heading"> Lets Talk </h2>
          <p className="font-normal text-neutral-400">
            Whether it’s a new feature, a full-scale platform, or a system that
            needs stability and performance
            <br /> I help ship software that lasts.
          </p>
        </div>

        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="name" className="field-label">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="field-input field-input-focus"
              placeholder="Your good name"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="email" className="field-label">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="field-input field-input-focus"
              placeholder="Violet@gmail.com"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="message" className="field-label">
              Message
            </label>
            <textarea
              id="message"
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
            className="w-full px-1 py-3 text-center rounded-md cursor-pointer bg-radial from-lavender hover-animation"
          >
            {!isLoading ? "send" : "Sending..."}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
