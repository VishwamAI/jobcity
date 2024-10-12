import { useState, useEffect, CSSProperties } from 'react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="scroll-to-top" style={isVisible ? visibleStyle : hiddenStyle}>
      <button onClick={scrollToTop} style={buttonStyle}>
        ↑
      </button>
    </div>
  );
};

const buttonStyle: CSSProperties = {
  position: 'fixed',
  bottom: '50px',
  right: '50px',
  padding: '10px 20px',
  fontSize: '20px',
  backgroundColor: '#6366F1',
  color: 'white',
  border: 'none',
  borderRadius: '50px',
  transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
};

const visibleStyle: CSSProperties = {
  opacity: 1,
  transition: 'opacity 0.3s ease-in-out', 
  pointerEvents: 'auto', 
};

const hiddenStyle: CSSProperties = {
  opacity: 0,
  transition: 'opacity 0.3s ease-in-out',
  pointerEvents: 'none',
};

const styles = `
  .scroll-to-top button:hover {
    transform: scale(1.2);
  }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default ScrollToTopButton;
