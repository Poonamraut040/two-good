function locomotiveAnimation() {
    gsap.registerPlugin(ScrollTrigger);
  
    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll locomotive scrolltrigger codepen
  
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true,
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);
  
    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
      scrollTop(value) {
        return arguments.length
          ? locoScroll.scrollTo(value, 0, 0)
          : locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector("#main").style.transform
        ? "transform"
        : "fixed",
    });
  
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  
    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
  }
  locomotiveAnimation();
  
  function navbarAnimation() {
    gsap.to("#nav-part1 svg", {
      transform: "translateY(-100%)",
      scrollTrigger: {
        trigger: "#page1",
        scroller: "#main",
        start: "top 0",
        end: "top -5%",
        scrub: true,
      },
    });
    gsap.to("#nav-part2 #links", {
      transform: "translateY(-100%)",
      opacity: 0,
      scrollTrigger: {
        trigger: "#page1",
        scroller: "#main",
        start: "top 0",
        end: "top -5%",
        scrub: true,
      },
    });
  }
  navbarAnimation()
  

 function videoconAnimation(){
 var videocon = document.querySelector("#video-container")
 var playbtn = document.querySelector("#play")
 videocon.addEventListener("mouseenter", function(){
    gsap.to(playbtn,{
        scale:1,
        opacity:1

    })
    // playbtn.style.opacity = 1
    // playbtn.style.scale = 1
 })
 videocon.addEventListener("mouseleave", function(){
    gsap.to(playbtn,{
        scale:0,
        opacity:0
    })
 })
 videocon.addEventListener("mousemove", function(dets){   /*dets mtlb ky ky ho raha hai mouse ke stah  */
    gsap.to(playbtn,{
        left: dets.x - 70,
        top: dets.y - 80,
        
    })
 })
}
videoconAnimation()

function loadinganimation() {
    gsap.from("#page1 h1", {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 0.9,
      stagger: 0.3,
    });
    gsap.from("#page1 #video-container", {
      scale: 0.9,
      opacity: 0,
      delay: 1.3,
      duration: 0.5,
    });
  }
  loadinganimation();
  /* y: 100: It animates the elements along the Y-axis by moving them down 100 pixels.

opacity: 0: It sets the initial opacity of the elements to 0, making them fully transparent.
delay: 0.5: It delays the animation by 0.5 seconds.
duration: 0.9: It sets the duration of the animation to 0.9 seconds.
stagger: 0.3: It staggers the animations of individual elements by 0.3 seconds. 
This means each element will start its animation 0.3 seconds after the previous one.
  */

// document.querySelectorAll("#child1").addEventListener("mouseenter", function(){
    // gsap.to("#cursor",{
        // transform: 'translate(-50%, -50%) scale(1)'
    // })
// })
// document.querySelector("#child1").addEventListener("mouseleave", function(){
    // gsap.to("#cursor",{
        // transform: 'translate(-50%, -50%) scale(0)'
    // })
// })
// 

function cursorAnimation(){
    document.addEventListener("mousemove", function(dets){
        gsap.to("#cursor",{
            left:dets.x,
            top:dets.y
    
        })
    })
    document.querySelectorAll(".child").forEach(function (thing) {
        thing.addEventListener("mouseenter", function () {
          gsap.to("#cursor", {
            transform: "translate(-50%,-50%) scale(1)",
          });
        });
        thing.addEventListener("mouseleave", function () {
          gsap.to("#cursor", {
            transform: "translate(-50%,-50%) scale(0)",
          });
        });
      });
    
}
cursorAnimation();