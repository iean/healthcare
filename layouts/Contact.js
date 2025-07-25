import config from "@config/config.json";
import { markdownify } from "@lib/utils/textConverter";

const Contact = ({ data }) => {
  const { frontmatter } = data;
  const { title, info } = frontmatter;
  const { contact_form_action } = config.params;

  return (
    <section className="section">
      <div className="container">
        {markdownify(title, "h1", "text-center font-normal mb-8")}
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div className="order-2 md:order-1 content">
            {markdownify(info.title, "h4")}
            {markdownify(info.description, "p", "mt-4")}
            <ul className="contact-list mt-5 space-y-2">
              {info.contacts.map((contact, index) => (
                <li key={index}>
                  {markdownify(contact, "strong", "text-dark")}
                </li>
              ))}
            </ul>
          </div>
          <div className="order-1 md:order-2">
            <form
              className="space-y-4"
              method="POST"
              action={contact_form_action}
            >
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  className="form-input w-full rounded"
                  name="name"
                  type="text"
                  placeholder="Name"
                  required
                />
                <input
                  className="form-input w-full rounded"
                  name="phone"
                  type="text"
                  placeholder="Phone"
                />
              </div>
              <input
                className="form-input w-full rounded"
                name="email"
                type="email"
                placeholder="Email"
                required
              />
              <input
                className="form-input w-full rounded"
                name="subject"
                type="text"
                placeholder="Subject"
              />
              <textarea
                className="form-textarea w-full rounded-md"
                name="message"
                rows="6"
                placeholder="Message"
                required
              />
              <button type="submit" className="btn btn-primary w-full">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
