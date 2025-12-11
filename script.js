(() => {
  const slides = Array.from(document.querySelectorAll('.slide'))
  const prevBtn = document.querySelector('.slider-btn.prev')
  const nextBtn = document.querySelector('.slider-btn.next')
  const dotsContainer = document.getElementById('dots')
  let current = slides.findIndex(s => s.getAttribute('aria-hidden') === 'false')
  if (current === -1) current = 0
  let interval = null

  function show(index){
    slides.forEach((s,i) => {
      s.setAttribute('aria-hidden', i === index ? 'false' : 'true')
    })
    updateDots(index)
    current = index
  }

  function next(){
    show((current + 1) % slides.length)
  }
  function prev(){
    show((current - 1 + slides.length) % slides.length)
  }

  function startAutoplay(){
    stopAutoplay()
    interval = setInterval(next, 4500)
  }
  function stopAutoplay(){
    if(interval) clearInterval(interval)
  }

  function updateDots(activeIndex){
    const dots = Array.from(dotsContainer.children)
    dots.forEach((d,i)=> d.classList.toggle('active', i===activeIndex))
  }

  // create dots
  slides.forEach((_,i)=>{
    const b = document.createElement('button')
    b.addEventListener('click', ()=> show(i))
    if(i===current) b.classList.add('active')
    dotsContainer.appendChild(b)
  })

  nextBtn.addEventListener('click', ()=>{ next(); startAutoplay(); })
  prevBtn.addEventListener('click', ()=>{ prev(); startAutoplay(); })

  const slider = document.getElementById('slider')
  slider.addEventListener('mouseenter', stopAutoplay)
  slider.addEventListener('mouseleave', startAutoplay)

  // keyboard navigation
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'ArrowRight') next()
    if(e.key === 'ArrowLeft') prev()
  })

  // init
  show(current)
  startAutoplay()
})();
