!function(){function e(e,t){return new Promise((function(n,o){setTimeout((function(){Math.random()>.3?n({position:e,delay:t}):o({position:e,delay:t})}),t)}))}document.querySelector(".form").addEventListener("submit",(function(t){t.preventDefault();for(var n=Number(t.target.elements.delay.value),o=Number(t.target.elements.step.value),a=Number(t.target.elements.amount.value),i=n,c=1;c<=a;c++)e(c,i).then((function(e){var t=e.position,n=e.delay;console.log("✅ Fulfilled promise ".concat(t," in ").concat(n,"ms"))})).catch((function(e){var t=e.position,n=e.delay;console.log("❌ Rejected promise ".concat(t," in ").concat(n,"ms"))})),i+=o}))}();
//# sourceMappingURL=03-promises.beea1945.js.map
