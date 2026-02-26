import { useForm, ValidationError } from "@formspree/react";

export default function ContactForm() {
  const [state, handleSubmit] = useForm("mgoldnye");

  if (state.succeeded) {
    return <p className="text-center pt-6">Thanks! I’ll get back to you soon.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto">
      <label htmlFor="email" className="text-sm font-medium">
        Email Address
      </label>
      <input
        id="email"
        type="email"
        name="email"
        required
        className="p-2 rounded-md border bg-background"
        placeholder="you@example.com"
      />
      <ValidationError prefix="Email" field="email" errors={state.errors} />

      <label htmlFor="message" className="text-sm font-medium">
        Message
      </label>
      <textarea
        id="message"
        name="message"
        required
        rows={5}
        className="p-2 rounded-md border bg-background"
        placeholder="Your message..."
      />
      <ValidationError prefix="Message" field="message" errors={state.errors} />

      <button
        type="submit"
        disabled={state.submitting}
        className="bg-primary text-white py-2 rounded-md hover:opacity-90 disabled:opacity-60"
      >
        {state.submitting ? "Sending..." : "Send"}
      </button>
    </form>
  );
}