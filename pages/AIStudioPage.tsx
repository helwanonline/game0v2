
import React, { useState } from 'react';
import { ai } from '../lib/gemini';
import { SEO } from '../components/SEO';
import { Spinner } from '../components/Spinner';
import type { Language } from '../types';
import { ErrorMessage } from '../components/ErrorMessage';

const AIStudioPage: React.FC<{ language: Language }> = ({ language }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!ai) {
      setError("AI client is not configured. Please check API key.");
      return;
    }
    if (!prompt.trim()) {
      setError(language === 'ar' ? 'الرجاء إدخال وصف للصورة.' : 'Please enter a prompt.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImageUrl(null);

    try {
      const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '1:1',
        },
      });

      if (response.generatedImages && response.generatedImages.length > 0) {
        const base64ImageBytes = response.generatedImages[0].image.imageBytes;
        const imageUrl = `data:image/jpeg;base64,${base64ImageBytes}`;
        setGeneratedImageUrl(imageUrl);
      } else {
        throw new Error('No image was generated. Please try a different prompt.');
      }
    } catch (e) {
      const message = e instanceof Error ? e.message : 'An unknown error occurred.';
      console.error('Image generation failed:', e);
      setError(`Image generation failed: ${message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const pageTitle = language === 'ar' ? 'استوديو توليد الصور بالذكاء الاصطناعي' : 'AI Image Generation Studio';
  const pageDescription = language === 'ar' ? 'أنشئ صورًا فريدة من خلال وصف نصي باستخدام قوة الذكاء الاصطناعي.' : 'Create unique images from text descriptions using the power of AI.';

  return (
    <>
      <SEO title={pageTitle} description={pageDescription} language={language} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-light-text mb-4">{pageTitle}</h1>
          <p className="text-lg text-dark-text mb-8">{pageDescription}</p>
        </div>

        <div className="max-w-3xl mx-auto bg-secondary p-6 rounded-lg shadow-lg">
          <div className="space-y-4">
            <label htmlFor="prompt" className="block text-sm font-medium text-light-text">
              {language === 'ar' ? 'اكتب وصفًا للصورة التي تريد إنشاءها' : 'Write a prompt for the image you want to create'}
            </label>
            <textarea
              id="prompt"
              rows={3}
              className="w-full bg-primary border border-gray-700 rounded-md shadow-sm p-3 text-light-text focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder={language === 'ar' ? 'مثال: روبوت يركب لوح تزلج أحمر' : 'e.g., A robot holding a red skateboard.'}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={isLoading}
            />
            <button
              onClick={handleGenerate}
              disabled={isLoading || !ai}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-accent hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-hover disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Spinner size="w-5 h-5" />
                  <span className="ml-2">{language === 'ar' ? 'جاري الإنشاء...' : 'Generating...'}</span>
                </>
              ) : (
                language === 'ar' ? 'إنشاء الصورة' : 'Generate Image'
              )}
            </button>
             {!ai && (
              <p className="text-center text-yellow-500 text-sm mt-2">
                {language === 'ar' ? 'ميزة الذكاء الاصطناعي غير مفعلة. يرجى مراجعة إعدادات مفتاح API.' : 'AI Feature is not enabled. Please check API key configuration.'}
              </p>
            )}
          </div>
        </div>

        <div className="mt-10">
          {isLoading && (
            <div className="flex flex-col items-center justify-center p-8 bg-secondary rounded-lg">
              <Spinner />
              <p className="mt-4 text-dark-text">{language === 'ar' ? 'يقوم الذكاء الاصطناعي برسم تحفتك الفنية...' : 'The AI is painting your masterpiece...'}</p>
            </div>
          )}

          {error && <ErrorMessage message={error} onRetry={handleGenerate} language={language} />}

          {generatedImageUrl && (
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-4">{language === 'ar' ? 'صورتك جاهزة!' : 'Your Image is Ready!'}</h2>
              <div className="aspect-square bg-primary rounded-lg flex items-center justify-center p-2">
                <img src={generatedImageUrl} alt="AI generated image" className="rounded-lg shadow-2xl max-w-full max-h-full object-contain" />
              </div>
               <a
                href={generatedImageUrl}
                download="ai-generated-image.jpg"
                className="mt-6 w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                {language === 'ar' ? 'تحميل الصورة' : 'Download Image'}
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AIStudioPage;
