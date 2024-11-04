'use client';

import { useEffect, useState } from 'react';

type Props = {
  title: string;
};

function TypingTitle({ title }: Props) {
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const typeTitle = async () => {
      setShowCursor(true);
      for (let i = 0; i < title.length; i++) {
        setDisplayedTitle((prev) => prev + title.charAt(i));
        const delay = Math.floor(Math.random() * 175) + 65;
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
      setShowCursor(false);
    };

    typeTitle().then(() => setShowCursor(false));

    return () => {};
  }, [title]);

  return (
    <h1 className='text-3xl font-bold inline-block whitespace-nowrap'>
      {displayedTitle}
      <span className={`border-r-2 border-current animate-blink ${showCursor ? 'opacity-100' : 'opacity-0'}`}></span>
    </h1>
  );
}

export default TypingTitle;
