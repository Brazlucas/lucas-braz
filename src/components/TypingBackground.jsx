import { useState, useEffect } from 'react';

const codeSnippets = [
  `<?php
namespace App\\Http\\Controllers;

class PortfolioController extends Controller
{
    public function index()
    {
        return view('welcome', [
            'developer' => 'Lucas Braz',
            'skills' => ['Laravel', 'Vue.js']
        ]);
    }
}`,
  `import { ref, onMounted } from 'vue';

export default {
  setup() {
    const loading = ref(true);
    
    onMounted(async () => {
      await fetchData();
      loading.value = false;
    });

    return { loading };
  }
}`,
  `public function authenticate(Request $request)
{
    $credentials = $request->validate([
        'email' => ['required', 'email'],
        'password' => ['required'],
    ]);

    if (Auth::attempt($credentials)) {
        $request->session()->regenerate();
        return redirect()->intended('dashboard');
    }
}`,
  `01001100 01110101 01100011 01100001 01110011
00100000 01000010 01110010 01100001 01111010
01000100 01100101 01110110 01100101 01101100
01101111 01110000 01100101 01110010 00100000
01000110 01110101 01101100 01101100 00100000
01010011 01110100 01100001 01100011 01101011`
];

const TypewriterBlock = ({ code, className, delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let currentIndex = 0;
    let timeout;
    let isDeleting = false;
    let isMounted = true;

    const type = () => {
      if (!isMounted) return;

      if (!isDeleting && currentIndex < code.length) {
        setDisplayedText(code.slice(0, currentIndex + 1));
        currentIndex++;
        timeout = setTimeout(type, Math.random() * 30 + 20); // Typing speed
      } else if (isDeleting && currentIndex > 0) {
        setDisplayedText(code.slice(0, currentIndex - 1));
        currentIndex--;
        timeout = setTimeout(type, 10); // Deleting speed
      } else if (!isDeleting && currentIndex === code.length) {
        // Finished typing, wait before deleting
        timeout = setTimeout(() => {
          isDeleting = true;
          type();
        }, 5000);
      } else if (isDeleting && currentIndex === 0) {
        // Finished deleting, wait before typing again
        isDeleting = false;
        timeout = setTimeout(type, 1000);
      }
    };

    const startTimeout = setTimeout(type, delay);

    return () => {
      isMounted = false;
      clearTimeout(timeout);
      clearTimeout(startTimeout);
    };
  }, [code, delay]);

  return (
    <div className={`font-mono text-sm md:text-base whitespace-pre opacity-30 ${className}`}>
      {displayedText}
      <span className="animate-pulse text-primary-400">|</span>
    </div>
  );
};

const TypingBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-dark-500" />
      <div className="absolute inset-0 bg-gradient-to-br from-dark-500 via-teal-900/10 to-cyan-900/10" />
      
      {/* Glowing Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-[40%] left-[50%] w-[40%] h-[40%] bg-highlight-600/8 rounded-full blur-[120px] animate-pulse" />
      </div>

      {/* Typing Code Blocks */}
      <div className="absolute inset-0 p-4 md:p-12 flex flex-col justify-between z-0">
        {/* <TypewriterBlock 
          code={codeSnippets[0]} 
          className="text-blue-300 self-start max-w-lg" 
          delay={0}
        /> */}
        
        <TypewriterBlock 
          code={codeSnippets[1]} 
          className="text-green-300 self-end max-w-lg hidden md:block" 
          delay={2000}
        />
        
        {/* <TypewriterBlock 
          code={codeSnippets[2]} 
          className="text-purple-300 self-center max-w-lg hidden lg:block" 
          delay={4000}
        /> */}

        <TypewriterBlock 
          code={codeSnippets[3]} 
          className="text-emerald-400/30 self-start max-w-lg absolute bottom-20 left-10 hidden xl:block tracking-widest" 
          delay={6000}
        />
      </div>
    </div>
  );
};

export default TypingBackground;
