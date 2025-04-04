// alert(window.innerHeight + 'px')

// const baseWidth = 1920

const baseWidth = 1920
const baseFontSize = 16

const calculationVw = (px) => {
   const res = (px / baseWidth) * 100
   return +res.toFixed(4)
}
const calculationRem = (px) => {
   const res = px / baseFontSize
   return +res.toFixed(4)
}

const clampFonts = (min, max, text = '') => {
   const res = `clamp(${calculationRem(min)}rem, ${calculationVw(max)}vw, ${calculationRem(max)}rem) - font size`
   console.log(res, text)
}

const clampSizesBlock = (min, max, text = '') => {
   const res = `clamp(${min}px, ${calculationVw(max)}vw, ${max}px) - size box`
   console.log(res, text)
}

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

//ленивая подгрузка картинок
// function lazyLoadImages() {
//    const images = document.querySelectorAll('img[data-src]')

//    if ('IntersectionObserver' in window) {
//       const observer = new IntersectionObserver(
//          (entries, observer) => {
//             console.log(entries)
//             console.log(observer)
//             entries.forEach((entry) => {
//                if (entry.isIntersecting) {
//                   console.log('true')
//                   const img = entry.target
//                   img.src = img.getAttribute('data-src')
//                   img.removeAttribute('data-src')
//                   img.classList.add('loaded') // можно сделать fade-in в CSS
//                   observer.unobserve(img)
//                }
//             })
//          },
//          {
//             rootMargin: '0px 0px 200px 0px', // предварительная подгрузка
//             threshold: 0.1,
//          },
//       )
//       console.log(images)
//       images.forEach((img) => observer.observe(img))
//    } else {
//       // Fallback для старых браузеров
//       images.forEach((img) => {
//          img.src = img.getAttribute('data-src')
//          img.removeAttribute('data-src')
//       })
//       console.log('asdasd')
//    }
// }

// document.addEventListener('DOMContentLoaded', lazyLoadImages)

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

   //анимируем плавное заполнение текста
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
         start: 'bottom bottom', // Когда верхняя часть блока достигнет центра экрана
         end: 'top top',
         onEnter: () =>
            document.querySelector('.hero-contact-us').classList.add('sticky'),
         onLeaveBack: () =>
            document
               .querySelector('.hero-contact-us')
               .classList.remove('sticky'),
         markers: false, // Поставь true, если хочешь видеть триггеры на экране
      },
   })

   //блюр в с рандомной задержкой
   document.querySelectorAll('.we-know__list-item').forEach((el) => {
      gsap.to(el, {
         filter: () => `blur(${gsap.utils.random(0, 8)}px)`,
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

   activeitItemFromResultList()

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
         duration: 3,
         ease: 'power3',
      })
      tl.from(
         cloudsGrup.children,
         {
            x: elStepX,
            stagger: 0.2,
            duration: 6,
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

   // animationCloudes(cloudsLeftTop, -200, -50)
   // animationCloudes(cloudsRightTop, 250, 150)
   // animationCloudes(cloudsLeftBottom, -300, -200)
   // animationCloudes(cloudsRightBottom, 350, 250)

   const timelineCloud = gsap.timeline({
      scrollTrigger: {
         trigger: '.now-imagine',
         start: 'top center',
      },
   })

   timelineCloud
      .add(animationCloudes(cloudsLeftTop, -200, -50))
      .add(animationCloudes(cloudsRightTop, 250, 150), '<0.7')
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
         '<0.9',
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
         '<0.5',
      )
      .add(animationCloudes(cloudsLeftBottom, -300, -200), '<0.7')
      .add(animationCloudes(cloudsRightBottom, 350, 250), '<0.7')

   //анимация звезд
   document.querySelectorAll('.nom-imagine-star').forEach((el) => {
      gsap.to(el, {
         scale: gsap.utils.random(0, 1),
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
   const list = [...document.querySelector('.projects__items').children]

   list.forEach((el) => {
      gsap.from(el, {
         opacity: 0,
         y: 100,
         scale: 0,
         duration: 1.5,
         scrollTrigger: {
            trigger: el,
            start: 'top bottom',
         },
      })
   })

   gsap.to('.projects-bg__el', {
      y: '400%', // Двигаем фон вверх (можно поменять значение для другого эффекта)
      ease: 'none',
      // duration: 1,
      scrollTrigger: {
         trigger: '.projects',
         start: 'top bottom',
         end: 'bottom top',
         scrub: 2, // Связь со скроллом (чем больше, тем плавнее)
      },
   })
})

//проверка работы слайдера
// const swiper = new Swiper('.slider-customers__slider', {
//    slidesPerView: 9,
//    spaceBetween: 0,
//    loop: true,
//    speed: 5000,
//    allowTouchMove: false,

//    autoplay: {
//       delay: 0,
//       disableOnInteraction: false,
//    },
//    freeMode: {
//       enabled: true,
//       momentum: false,
//    },
//    breakpoints: {
//       340: {
//          speed: 500,
//       },
//       768: {
//          speed: 1500,
//       },
//       1024: {
//          speed: 9000,
//       },
//    },
// })

const swiper4 = new Swiper('.give-floor-slider', {
   slidesPerView: 1,
   spaceBetween: 0,
   pagination: {
      el: '.give-floor-slider-pagination',
      clickable: true,
   },
})

//# sourceMappingURL=main.js.map
