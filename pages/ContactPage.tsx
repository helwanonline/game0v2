import React from 'react';
import type { Language } from '../types';
import { SEO } from '../components/SEO';

export const ContactPage: React.FC<{ language: Language }> = ({ language }) => {
  const content = {
    ar: {
      title: 'اتصل بنا',
      description: 'هل لديك سؤال أو اقتراح؟ تواصل مع فريق 5199.online.',
      h1: 'تواصل معنا',
      p1: 'نحن هنا للمساعدة! سواء كان لديك سؤال حول لعبة ما، أو اقتراح للموقع، أو تريد فقط أن تقول مرحباً، فإننا نود أن نسمع منك.',
      email: 'البريد الإلكتروني للدعم:',
      formName: 'الاسم',
      formEmail: 'بريدك الإلكتروني',
      formMessage: 'رسالتك',
      formSend: 'إرسال الرسالة',
    },
    en: {
      title: 'Contact Us',
      description: 'Have a question or a suggestion? Get in touch with the 5199.online team.',
      h1: 'Get in Touch',
      p1: "We're here to help! Whether you have a question about a game, a suggestion for the site, or just want to say hello, we'd love to hear from you.",
      email: 'Support Email:',
      formName: 'Name',
      formEmail: 'Your Email',
      formMessage: 'Your Message',
      formSend: 'Send Message',
    },
  };

  const currentContent = content[language];

  return (
    <>
      <SEO title={currentContent.title} description={currentContent.description} language={language} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-light-text mb-4">{currentContent.h1}</h1>
          <p className="text-lg text-dark-text mb-8">{currentContent.p1}</p>
          <div className="bg-secondary rounded-lg p-6 mb-10">
            <p className="text-dark-text">{currentContent.email}</p>
            <a href="mailto:support@5199.online" className="text-accent text-lg font-semibold hover:text-accent-hover">support@5199.online</a>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-light-text">{currentContent.formName}</label>
              <input type="text" name="name" id="name" className="mt-1 block w-full bg-primary border border-gray-700 rounded-md shadow-sm py-2 px-3 text-light-text focus:outline-none focus:ring-accent focus:border-accent" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-light-text">{currentContent.formEmail}</label>
              <input type="email" name="email" id="email" className="mt-1 block w-full bg-primary border border-gray-700 rounded-md shadow-sm py-2 px-3 text-light-text focus:outline-none focus:ring-accent focus:border-accent" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-light-text">{currentContent.formMessage}</label>
              <textarea id="message" name="message" rows={4} className="mt-1 block w-full bg-primary border border-gray-700 rounded-md shadow-sm py-2 px-3 text-light-text focus:outline-none focus:ring-accent focus:border-accent"></textarea>
            </div>
            <div>
              <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-accent hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-hover disabled:bg-gray-600" disabled>
                {currentContent.formSend}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactPage;