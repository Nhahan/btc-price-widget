import { useEffect, useState } from 'react';

type Props = {
  text: string;
};

export default function TypingEffect({ text }: Props) {
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const typeTitle = async () => {
      setShowCursor(true);
      for (let i = 0; i < text.length; i++) {
        setDisplayedTitle(text.slice(0, i + 1));
        const delay = Math.floor(Math.random() * 150) + 100;
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
      setShowCursor(false);
    };

    typeTitle();

    return () => {
      setDisplayedTitle('');
      setShowCursor(true);
    };
  }, [text]);

  return (
    <span className='text-3xl font-bold inline-block whitespace-nowrap'>
      {displayedTitle}
      <span className={`border-r-2 border-current animate-blink ${showCursor ? 'opacity-100' : 'opacity-0'}`}></span>
    </span>
  );
}
