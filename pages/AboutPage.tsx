import React from 'react';
import type { Language } from '../types';
import { SEO } from '../components/SEO';

export const AboutPage: React.FC<{ language: Language }> = ({ language }) => {
  const content = {
    ar: {
      title: 'من نحن',
      description: 'تعرف على القصة وراء 5199.online، وجهتك الأولى لأفضل ألعاب المتصفح المجانية.',
      h1: 'مهمتنا: متعة لا حدود لها للجميع',
      p1: 'تأسست منصة 5199.online على مبدأ بسيط: يجب أن تكون الألعاب ممتعة ومتاحة للجميع، في أي وقت وفي أي مكان. نحن فريق من اللاعبين والمطورين الشغوفين الذين يسعون جاهدين لجمع أفضل ألعاب المتصفح وأكثرها تسلية في مكان واحد.',
      h2: 'قصتنا',
      p2: 'بدأت كفكرة صغيرة بين الأصدقاء، نمت 5199.online لتصبح مجتمعًا نابضًا بالحياة للاعبين من جميع أنحاء العالم. نحن نؤمن بقوة اللعب في التقريب بين الناس وخلق لحظات من الفرح. مكتبتنا المنسقة بعناية من الألعاب الكلاسيكية والحديثة تضمن وجود شيء جديد ومثير دائمًا لاكتشافه.',
    },
    en: {
      title: 'About Us',
      description: 'Learn the story behind 5199.online, your number one destination for the best free browser games.',
      h1: 'Our Mission: Limitless Fun for Everyone',
      p1: '5199.online was founded on a simple principle: gaming should be fun and accessible to everyone, anytime, anywhere. We are a passionate team of gamers and developers dedicated to curating the very best and most entertaining browser games in one place.',
      h2: 'Our Story',
      p2: 'What started as a small idea among friends has grown into a vibrant community of players from all around the world. We believe in the power of play to bring people together and create moments of joy. Our carefully curated library of classic and modern games ensures there’s always something new and exciting to discover.',
    },
  };

  const currentContent = content[language];

  return (
    <>
      <SEO title={currentContent.title} description={currentContent.description} language={language} />
      <div className="bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-light-text mb-4">{currentContent.title}</h1>
            <p className="max-w-3xl mx-auto text-lg text-dark-text">{currentContent.description}</p>
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto prose prose-invert lg:prose-xl text-light-text">
          <h2>{currentContent.h1}</h2>
          <p>{currentContent.p1}</p>
          <h2>{currentContent.h2}</h2>
          <p>{currentContent.p2}</p>
        </div>
      </div>
    </>
  );
};

export default AboutPage;