const faceImages = [
    'faces/face1.png',
  ];
  
  const maxFaces = 15;
  const faceLifespan = 3000;
  const minDistance = 100; // minimum distance in pixels between faces
  
  let lastX = null;
  let lastY = null;
  const activeFaces = [];
  
  document.addEventListener('mousemove', (e) => {
    const x = e.pageX;
    const y = e.pageY;
  
    // On first move, just set initial position
    if (lastX === null || lastY === null) {
      lastX = x;
      lastY = y;
      return;
    }
  
    const dx = x - lastX;
    const dy = y - lastY;
    const distance = Math.sqrt(dx * dx + dy * dy);
  
    if (distance < minDistance) return; // not far enough yet
  
    lastX = x;
    lastY = y;
  
    const trail = document.createElement('img');
    const randomImage = faceImages[Math.floor(Math.random() * faceImages.length)];
    trail.src = randomImage;
  
    const size = 160 + Math.random() * 80;
    trail.className = 'trail';
    trail.style.width = `${size}px`;
    trail.style.height = `${size}px`;
    trail.style.left = `${x - size / 2}px`;
    trail.style.top = `${y - size / 2}px`;
  
    const rotation = (Math.random() * 30) - 15;
    trail.style.transform = `rotate(${rotation}deg)`;
  
    document.body.appendChild(trail);
    activeFaces.push(trail);
  
    if (activeFaces.length > maxFaces) {
      const oldFace = activeFaces.shift();
      oldFace.remove();
    }
  
    setTimeout(() => {
      if (trail.parentNode) {
        trail.remove();
        const index = activeFaces.indexOf(trail);
        if (index !== -1) activeFaces.splice(index, 1);
      }
    }, faceLifespan);
  });
  