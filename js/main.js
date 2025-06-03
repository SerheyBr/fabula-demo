// accordeon action
document.querySelectorAll('.faq-item').forEach((el) => {
   el.querySelector('.faq-item__trigger').addEventListener('click', (e) => {
      const trigger = e.currentTarget

      if (el.classList.contains('active')) {
         el.classList.remove('active')
      } else {
         document
            .querySelectorAll('.faq-item')
            .forEach((el) => el.classList.remove('active'))
         el.classList.add('active')
      }
   })
})

//action slider toggle before after

const sliderItems = document.querySelectorAll('.give-floor-item')
if (window.innerWidth <= 1024) {
   sliderItems.forEach((el, index) => {
      const images = [
         ...el.querySelector('.give-floor-item-mobil__img').children,
      ]
      const btnBefore = el.querySelector(`#exemple${index + 1}-before`)
      const btnAfter = el.querySelector(`#exemple${index + 1}-after`)

      // console.log(btnAfter)
      btnBefore.addEventListener('click', (e) => {
         images[0].style.display = 'block'
      })
      btnAfter.addEventListener('click', (e) => {
         images[0].style.display = 'none'
      })
   })
}

// расчет высоты фиксированной кнопки и padding-bottom у секции активности кнопки
const contactUsBtn = document.querySelector('.hero-contact-us')
const contactUsBtnScrollZone = document.querySelector('.btn-scroll')
const contactUsBtnHeight = contactUsBtn.clientHeight
contactUsBtnScrollZone.style.paddingBottom = `${contactUsBtnHeight + 20}px`

document.addEventListener('DOMContentLoaded', (event) => {
   //функция для разделения текста на буквы
   const splitText = (className, newClassName) => {
      let textElement = document.querySelector(className)
      let text = textElement.textContent
      textElement.innerHTML = '' // Очищаем текст

      text.split('').forEach((letter) => {
         let span = document.createElement('span')
         span.textContent = letter
         span.classList.add(newClassName)
         textElement.appendChild(span)
      })
   }

   splitText('.now-imagine__text', 'now-imagine__text--letter')
   splitText('.solution__text', 'solution__text--letter')

   // //анимируем плавное заполнение текста
   gsap.to('.now-imagine__text--letter', {
      color: '#FFFFFF', // Меняем цвет на яркий
      stagger: 0.03, // Поочередное появление букв
      scrollTrigger: {
         trigger: '.now-imagine__text',
         start: 'top 100%',
         toggleActions: 'play',
      },
   })
   gsap.to('.solution__text--letter', {
      color: '#FFFFFF', // Меняем цвет на яркий
      stagger: 0.03, // Поочередное появление букв
      scrollTrigger: {
         trigger: '.solution__text',
         start: 'top 80%',
         toggleActions: 'play',
      },
   })

   //липкая кнопка .hero-contact-us
   gsap.to('.hero-contact-us', {
      scrollTrigger: {
         trigger: '.btn-scroll', // Когда доскроллим до этого блока
         start: 'bottom 98%', // Когда верхняя часть блока достигнет центра экрана
         // end: 'top top',
         scrub: 1,
         onEnter: () =>
            document.querySelector('.hero-contact-us').classList.add('sticky'),
         onLeaveBack: () =>
            document
               .querySelector('.hero-contact-us')
               .classList.remove('sticky'),
         // markers: true,
      },
   })

   //блюр в с рандомной задержкой
   document.querySelectorAll('.we-know__list-item').forEach((el) => {
      gsap.to(el, {
         // filter: () => `blur(${gsap.utils.random(0, 8)}px)`,
         duration: gsap.utils.random(2, 5), // Разная скорость анимации
         repeat: -1, // Бесконечный цикл
         yoyo: true, // Возвращение к изначальному значению
         stagger: {
            // Рандомное время старта для каждого элемента
            each: gsap.utils.random(0, 1),
            repeatRefresh: true, // Генерирует новое значение для каждого повтора
         },
      })
   })

   //запуск анимации заполнения круговой индикатор прогресса
   gsap.from('.circle-progres', {
      strokeDashoffset: '511.82px',

      duration: 3,
      scrollTrigger: {
         trigger: '.circle-progres',
         start: 'top 100%',
         toggleActions: 'play',
      },
   })

   //анимация списка с заполнением кружков
   const resultList = document.querySelectorAll('.result-item')
   let currentAnimationResultList

   const activeitItemFromResultList = (index = 0) => {
      if (currentAnimationResultList) {
         currentAnimationResultList.kill()
      }
      resultList.forEach((el) => {
         el.classList.remove('active')
      })

      if (index >= resultList.length) {
         index = 0
      }
      resultList[index].classList.add('active')

      currentAnimationResultList = gsap.delayedCall(6, () => {
         activeitItemFromResultList(index + 1)
      })
   }

   ScrollTrigger.create({
      trigger: '.result', // замени на нужный тебе селектор
      start: 'top 70%', // когда верх секции достигнет 70% окна
      once: true, // запустится один раз
      // markers: true,
      onEnter: () => {
         activeitItemFromResultList()
      },
   })

   resultList.forEach((el, index) => {
      el.addEventListener('click', (e) => {
         activeitItemFromResultList(index)
      })
   })

   //анимация мушек
   function moveRandomly(spot) {
      gsap.to(spot, {
         x: `+=${gsap.utils.random(-100, 100)}`, // Случайное смещение по X
         y: `+=${gsap.utils.random(-100, 100)}`, // Случайное смещение по Y
         rotation: gsap.utils.random(-180, 180), // Случайный поворот
         duration: gsap.utils.random(5, 10), // Случайная скорость
         ease: 'power1.inOut',
         onComplete: () => moveRandomly(spot), // Повторяем движение с новыми параметрами
      })
   }
   const arraySpot = [
      ...document.querySelectorAll('.projects-bg__el'),
      ...document.querySelectorAll('.hero__bg-crcl'),
   ]

   document
   arraySpot.forEach((spot) => moveRandomly(spot))

   //анимация облаков
   document.querySelectorAll('nom-imagine-star')
   const animationCloudes = (cloudsGrup, grupStepX, elStepX) => {
      const tl = gsap.timeline()

      tl.from(cloudsGrup, {
         x: grupStepX,
         duration: 2,
         ease: 'power3',
      })
      tl.from(
         cloudsGrup.children,
         {
            x: elStepX,
            stagger: 0.1,
            duration: 2,
            ease: 'power3',
         },
         '<1',
      )
      return tl
   }
   const cloudsLeftTop = document.querySelector('.now-imagine-clouds__top-left')
   const cloudsRightTop = document.querySelector(
      '.now-imagine-clouds__top-right',
   )
   const cloudsLeftBottom = document.querySelector(
      '.now-imagine-clouds__bottom-left',
   )
   const cloudsRightBottom = document.querySelector(
      '.now-imagine-clouds__bottom-right',
   )

   const timelineCloud = gsap.timeline({
      scrollTrigger: {
         trigger: '.now-imagine',
         start: 'top center',
      },
   })

   timelineCloud
      .add(animationCloudes(cloudsLeftTop, -200, -50))
      .add(animationCloudes(cloudsRightTop, 250, 150), '<0.1')
      .from(
         '.nom-imagine-moon',
         {
            x: -100,
            opacity: 0,
            scale: 0.8,
            rotate: 20,
            duration: 5,
            ease: 'power3',
         },
         '<1',
      )
      .from(
         '.now-imagine-clouds__top-center',
         {
            x: 100,
            opacity: 0.7,
            scale: 0.8,
            duration: 3,
            ease: 'power3',
         },
         '<1.1',
      )
      .add(animationCloudes(cloudsLeftBottom, -300, -200), '<0.7')
      .add(animationCloudes(cloudsRightBottom, 350, 250), '<0.1')

   //анимация звезд
   document.querySelectorAll('.nom-imagine-star').forEach((el) => {
      gsap.to(el, {
         scale: 0.1,
         duration: gsap.utils.random(3, 5), // Разная скорость анимации
         opacity: gsap.utils.random(0.7, 1),
         repeat: -1, // Бесконечный цикл
         yoyo: true, // Возвращение к изначальному значению
         stagger: {
            // Рандомное время старта для каждого элемента
            each: gsap.utils.random(0, 1),
            repeatRefresh: true, // Генерирует новое значение для каждого повтора
         },
      })
   })

   //анимация projects-item
   const sectionProjects = document.querySelector('.projects__wrapper')
   const skrollDistansProjects = 6000
   const projectItems = document.querySelectorAll('.projects-item')
   document.querySelector('.result').style.marginTop =
      skrollDistansProjects + 'px'

   const tlProjects = gsap.timeline({
      scrollTrigger: {
         trigger: sectionProjects,
         start: 'top top',
         end: `+=${skrollDistansProjects}`,
         pin: true,
         scrub: 1,
         pinSpacing: false,
         // markers: true,
      },
   })
   projectItems.forEach((el, index, arr) => {
      // tlProjects.to(el, { y: '-100vh' }, '-=0.41')
      tlProjects.to(el, { y: '-100%' }, '-=0.3')
      // tlProjects.to(el, { y: '-100%' })
   })

   // const secProjects = document.querySelector('.projects')
   // const triggerSecProg = secProjects.querySelector('.projects__wrapper')
   // const listrSecProg = secProjects.querySelector('.projects__items')
   // const heightListProg = listrSecProg.clientHeight
   // const scrollDistanceProj = 3000
   // const actionTranslateY = heightListProg + window.innerHeight / 3
   // secProjects.style.marginBottom = `${scrollDistanceProj}px`
   // listrSecProg.style.transform = `translateY(${window.innerHeight}px)`
   // console.log(heightListProg)
   // const tlProjects = gsap.timeline({
   //    scrollTrigger: {
   //       trigger: triggerSecProg,
   //       start: 'top top',
   //       end: `+=${scrollDistanceProj}`,
   //       pin: true,
   //       scrub: 1,
   //       pinSpacing: false,
   //       // markers: true,
   //    },
   // })

   // tlProjects.to(listrSecProg, { y: -actionTranslateY })

   //анимация цифр
   const animateCount = (element, targetValue) => {
      const count = { value: 0 }

      gsap.to(count, {
         value: targetValue,
         duration: 3,
         scrollTrigger: {
            trigger: element,
            start: 'top center',
            toggleActions: 'play none none none',
         },
         onUpdate: () => {
            element.textContent = `${Math.round(count.value)}`
         },
      })
   }

   document.querySelectorAll('.we-fabula-column__title--num').forEach((el) => {
      const targetValue = parseInt(el.getAttribute('data-target')) || 100

      animateCount(el, targetValue)
   })

   //анимация секции we offer
   const sectionOffer = document.querySelector('.offer')
   const offerElementsInfo = document.querySelectorAll('.offer-item__info')
   const lottieElements = document.querySelectorAll('.offer-item__img')
   const scrollDistanceOffer = 4500
   const nextSection = document.querySelector('.we-fabula')
   nextSection.style.marginTop = `${scrollDistanceOffer}px`

   const tlOffer = gsap.timeline({
      scrollTrigger: {
         trigger: sectionOffer,
         start: 'top top',
         end: `+=${scrollDistanceOffer}`,
         pin: true,
         scrub: 1,
         // markers: true,
         // onLeave: () => {
         //    // Запуск второй анимации после скролла первой
         //    gsap.to(offerElementsInfo[2], { y: '-50vh', opacity: 0 })
         // },
         // onEnterBack: () => {
         //    // Запуск второй анимации после скролла первой
         //    gsap.to(offerElementsInfo[2], { y: '0', opacity: 1 })
         // },
      },
   })

   tlOffer
      .to({}, { duration: 1 })
      .to(lottieElements[0], { opacity: 0 })
      .to(offerElementsInfo[0], { y: '-50vh', opacity: 0 })
      .to(offerElementsInfo[1], { y: '0' })
      .to(lottieElements[1], { opacity: 1 })
      .to({}, { duration: 1 })
      .to(lottieElements[1], { opacity: 0 })
      .to(offerElementsInfo[1], { y: '-50vh', opacity: 0 })
      .to(offerElementsInfo[2], { y: '0' })
      .to(lottieElements[2], { opacity: 1 })
      .to({}, { duration: 1 })
      .to(lottieElements[2], { opacity: 0 })
      .to(offerElementsInfo[2], { y: '-30vh', opacity: 0.1 })

   //footer анимация
   const footerBg = document.querySelector('.footer__bg')
   const footer = document.querySelector('.footer')

   gsap.from(footerBg, {
      y: 0,
      // scale: 0,
      duration: 2,
      scrollTrigger: {
         trigger: footer,
         start: 'top bottom',
      },
   })
})

//проверка работы слайдера

const swiper4 = new Swiper('.give-floor-slider', {
   slidesPerView: 1,
   loopedSlides: 1,
   centeredSlides: true,
   spaceBetween: 0,
   loop: true,
   pagination: {
      el: '.give-floor-slider-pagination',
      clickable: true,
   },
})

//# sourceMappingURL=main.js.map
