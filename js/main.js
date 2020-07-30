(() => {
    
    let yOffset = 0; // page yOffset val
    let prevScrollHeight = 0 // before yOffset scroll height
    let currentScene = 0 // now scroll section
    let newScene = false // if enter the new scene  newScene = true

    let acc = 0.1;
    let delayedYOffset = 0;
    let rafId;
    let rafState;

    const sceneInfo = [
        {   
            // 0
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-0'),
                messageA: document.querySelector('#scroll-section-0 .main-message.a'),
                messageB: document.querySelector('#scroll-section-0 .main-message.b'),
                messageC: document.querySelector('#scroll-section-0 .main-message.c'),
                messageD: document.querySelector('#scroll-section-0 .main-message.d'),
                canvas: document.querySelector('#video-canvas-0'),
                context: document.querySelector('#video-canvas-0').getContext('2d'),
                videoImages: []
            },
            values: {
                videoImageCount: 300,
                imageSequence: [0, 299],
                canvasOpacity: [1, 0, {start: 0.9, end: 1.0}],

                messageAOpacityIn: [0, 1, {start: 0.1, end: 0.2}],
                messageBOpacityIn: [0, 1, {start: 0.3, end: 0.4}],
                messageCOpacityIn: [0, 1, {start: 0.5, end: 0.6}],
                messageDOpacityIn: [0, 1, {start: 0.7, end: 0.8}],

                messageAOpacityOut: [1, 0, {start: 0.25, end: 0.3}],
                messageBOpacityOut: [1, 0, {start: 0.45, end: 0.5}],
                messageCOpacityOut: [1, 0, {start: 0.65, end: 0.7}],
                messageDOpacityOut: [1, 0, {start: 0.85, end: 0.9}],

                messageATranslateYIn: [20, 0, {start: 0.1, end: 0.2}],
                messageBTranslateYIn: [20, 0, {start: 0.3, end: 0.4}],
                messageCTranslateYIn: [20, 0, {start: 0.5, end: 0.6}],
                messageDTranslateYIn: [20, 0, {start: 0.7, end: 0.8}],
                
                messageATranslateYOut: [0, -20, {start: 0.25, end: 0.3}],
                messageBTranslateYOut: [0, -20, {start: 0.45, end: 0.5}],
                messageCTranslateYOut: [0, -20, {start: 0.65, end: 0.7}],
                messageDTranslateYOut: [0, -20, {start: 0.85, end: 0.9}]
            }
        },
        {
            // 1
            type: 'normal',
            // heightNum: 5, //type none is don't use
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-1')
            }
        },
        {
            // 2
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-2'),
                messageA: document.querySelector('#scroll-section-2 .a'),
                messageB: document.querySelector('#scroll-section-2 .b'),
                messageC: document.querySelector('#scroll-section-2 .c'),
                pinB: document.querySelector('#scroll-section-2 .b .pin'),
                pinC: document.querySelector('#scroll-section-2 .c .pin'),
                canvas: document.querySelector('#video-canvas-1'),
				context: document.querySelector('#video-canvas-1').getContext('2d'),
                videoImages: []
            },
            values: {
                videoImageCount: 960,
				imageSequence: [0, 959],
                canvasOpacityIn: [0, 1, {start: 0, end: 0.1}],
                canvasOpacityOut: [1, 0, {start: 0.9, end: 1}],

                messageAOpacityIn: [0, 1, { start: 0.25, end: 0.3 }],
                messageBOpacityIn: [0, 1, { start: 0.6, end: 0.65 }],
                messageCOpacityIn: [0, 1, { start: 0.87, end: 0.92 }],
     
                messageAOpacityOut: [1, 0, {start: 0.4, end: 0.45}],
                messageBOpacityOut: [1, 0, {start: 0.68, end: 0.73}],
                messageCOpacityOut: [1, 0, {start: 0.95, end: 0.1}],
    
                messageATranslateYIn: [20, 0, {start: 0.15, end: 0.2}],
                messageBTranslateYIn: [30, 0, {start: 0.6, end: 0.65}],
                messageCTranslateYIn: [30, 0, {start: 0.87, end: 0.92}],
        
                messageATranslateYOut: [0, -20, {start: 0.4, end: 0.45}],
                messageBTranslateYOut: [0, -20, {start: 0.68, end: 0.73}],
                messageCTranslateYOut: [0, -20, {start: 0.95, end: 0.1}],

                pinBScaleY: [0.5, 1, {start: 0.5, end: 0.55}],
                pinCScaleY: [0.5, 1, {start: 0.72, end: 0.77}],
                pinBOpacityIn: [0, 1, {start: 0.5, end: 0.55}],
                pinCOpacityIn: [0, 1, {start: 0.72, end: 0.77}],
                pinBOpacityOut: [0, 1, {start: 0.58, end: 0.63}],
                pinCOpacityOut: [0, 1, {start: 0.85, end: 0.9}]
            }
        },
        {
            // 3
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-3'),
                canvasCaption: document.querySelector('.canvas-caption'),
                canvas: document.querySelector('.image-blend-canvas'),
                context: document.querySelector('.image-blend-canvas').getContext('2d'),
                imagePath: [
                    './images/blend-image-1.jpg',
                    './images/blend-image-2.jpg'
                ],
                images: []
            },
            values: {
                rect1X: [0, 0, {start: 0, end: 0}],
                rect2X: [0, 0, {start: 0, end: 0}],
                rectStartY: 0,
                blendHeight: [0, 0, {start: 0, end: 0}],
                canvasScale: [0, 0, {start: 0, end: 0}],
                canvasCaptionOpacity: [0, 1, {start: 0, end: 0}],
                canvasCaptionTranslateY: [20, 0, {start: 0, end: 0}]
            }
        }
    ];

    function menuInfo() {
        if(yOffset > 44) {
            document.body.classList.add('first-nav-sticky');
        }
        else {
            document.body.classList.remove('first-nav-sticky');
        }
    }

    function setCanvasImages() {
        let imgElem;
        for(let i=0; i<sceneInfo[0].values.videoImageCount; i++) {
            imgElem = document.createElement('img');
            imgElem.src = `./video/001/IMG_${i+6726}.jpg`;
            sceneInfo[0].objs.videoImages.push(imgElem);

        }

        let imgElem2;
        for(let i=0; i<sceneInfo[2].values.videoImageCount; i++) {
            imgElem2 = document.createElement('img');
            imgElem2.src = `./video/002/IMG_${i+7027}.jpg`;
            sceneInfo[2].objs.videoImages.push(imgElem2);

        }

        let imgElem3;
        for(let i=0; i<sceneInfo[3].objs.imagePath.length; i++) {
            imgElem3 = new Image();
            imgElem3.src = sceneInfo[3].objs.imagePath[i];
            sceneInfo[3].objs.images.push(imgElem3);
        }
    }

    function setLayout() {
        // Scroll section hight setting
        for(let i=0; i<sceneInfo.length; i++){
            if(sceneInfo[i].type === 'sticky') {
                sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            }
            else {
                sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
            }
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
        }

        yOffset = window.pageYOffset;
        let totalScrollHeight = 0;
        for(let i=0; i<sceneInfo.length; i++){
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if(totalScrollHeight > yOffset){
                currentScene = i;
                break;
            }
        }
        document.body.setAttribute('id',`show-scene-${currentScene}`);

        const heightRatio = window.innerHeight / 1080;
        sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
        sceneInfo[2].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
    }

    function calcValues(values, currentYOffset) {
        let rv;
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;

        if(values.length === 3){
            // between start and end animation play
            const scrollPartStart = values[2].start * scrollHeight;
            const scrollPartEnd = values[2].end * scrollHeight;
            const scrollPartHeight = scrollPartEnd - scrollPartStart;

            if(currentYOffset >= scrollPartStart && currentYOffset <= scrollPartEnd) {
                rv = (currentYOffset - scrollPartStart) / scrollPartHeight * (values[1]-values[0]) + values[0];
            }
            else if(currentYOffset < scrollPartStart) {
                rv = values[0];
            }
            else if(currentYOffset > scrollPartEnd) {
                rv = values[1];
            }
            
        }
        else {
            rv = scrollRatio * (values[1]-values[0]) + values[0];
        }
        

        return rv;
    }

    function anymation() {
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        const currentYOffset = yOffset - prevScrollHeight;
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight; // yOffset / now scrollHeight

        switch(currentScene) {
            case 0:

                // let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
                // objs.context.drawImage(objs.videoImages[sequence], 0, 0);
                objs.canvas.style.opacity = calcValues(values.canvasOpacity, currentYOffset);

                if(scrollRatio <= 0.22) {
                    // in
                    objs.messageA.style.opacity = calcValues(values.messageAOpacityIn, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageATranslateYIn, currentYOffset)}%, 0)`;
                }
                else {
                    //out
                    objs.messageA.style.opacity = calcValues(values.messageAOpacityOut, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageATranslateYOut, currentYOffset)}%, 0)`;
                }

                if(scrollRatio <= 0.42) {
                    // in
                    objs.messageB.style.opacity = calcValues(values.messageBOpacityIn, currentYOffset);
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageBTranslateYIn, currentYOffset)}%, 0)`;
                }
                else {
                    //out
                    objs.messageB.style.opacity = calcValues(values.messageBOpacityOut, currentYOffset);
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageBTranslateYOut, currentYOffset)}%, 0)`;
                }

                if(scrollRatio <= 0.62) {
                    // in
                    objs.messageC.style.opacity = calcValues(values.messageCOpacityIn, currentYOffset);
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageCTranslateYIn, currentYOffset)}%, 0)`;
                }
                else {
                    //out
                    objs.messageC.style.opacity = calcValues(values.messageCOpacityOut, currentYOffset);
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageCTranslateYOut, currentYOffset)}%, 0)`;
                }

                if(scrollRatio <= 0.82) {
                    // in
                    objs.messageD.style.opacity = calcValues(values.messageDOpacityIn, currentYOffset);
                    objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageDTranslateYIn, currentYOffset)}%, 0)`;
                }
                else {
                    //out
                    objs.messageD.style.opacity = calcValues(values.messageDOpacityOut, currentYOffset);
                    objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageDTranslateYOut, currentYOffset)}%, 0)`;
                }


                
                break;
            case 1:
                break;
            case 2:

                // let sequence2 = Math.round(calcValues(values.imageSequence, currentYOffset));
                // objs.context.drawImage(objs.videoImages[sequence2], 0, 0);

                if(scrollRatio <= 0.5) {
                    // in
                    objs.canvas.style.opacity = calcValues(values.canvasOpacityIn, currentYOffset);
                }
                else {
                    // out
                    objs.canvas.style.opacity = calcValues(values.canvasOpacityOut, currentYOffset);
                }

                if (scrollRatio <= 0.32) {
                    // in
                    objs.messageA.style.opacity = calcValues(values.messageAOpacityIn, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageATranslateYIn, currentYOffset)}%, 0)`;
                } 
                else {
                    // out
                    objs.messageA.style.opacity = calcValues(values.messageAOpacityOut, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageATranslateYOut, currentYOffset)}%, 0)`;
                }
    
                if (scrollRatio <= 0.67) {
                    // in
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageBTranslateYIn, currentYOffset)}%, 0)`;
                    objs.messageB.style.opacity = calcValues(values.messageBOpacityIn, currentYOffset);
                    objs.pinB.style.transform = `scaleY(${calcValues(values.pinBScaleY, currentYOffset)})`;
                } 
                else {
                    // out
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageBTranslateYOut, currentYOffset)}%, 0)`;
                    objs.messageB.style.opacity = calcValues(values.messageBOpacityOut, currentYOffset);
                    objs.pinB.style.transform = `scaleY(${calcValues(values.pinBScaleY, currentYOffset)})`;
                }
    
                if (scrollRatio <= 0.93) {
                    // in
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageCTranslateYIn, currentYOffset)}%, 0)`;
                    objs.messageC.style.opacity = calcValues(values.messageCOpacityIn, currentYOffset);
                    objs.pinC.style.transform = `scaleY(${calcValues(values.pinCScaleY, currentYOffset)})`;
                } 
                else {
                    // out
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageCTranslateYOut, currentYOffset)}%, 0)`;
                    objs.messageC.style.opacity = calcValues(values.messageCOpacityOut, currentYOffset);
                    objs.pinC.style.transform = `scaleY(${calcValues(values.pinCScaleY, currentYOffset)})`;
                }

                if(scrollRatio > 0.9) {
                    const objs = sceneInfo[3].objs;
                    const values = sceneInfo[3].values;
                    const widthRatio = window.innerWidth / objs.canvas.width;
                    const heightRatio = window.innerHeight / objs.canvas.height;
                    let canvasScaleRatio;
                    if(widthRatio <= heightRatio) {
                        canvasScaleRatio = heightRatio;
                        // console.log("heightRatio");
                    }
                    else {
                        canvasScaleRatio = widthRatio;
                        // console.log("widthRatio");
                    }

                    objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
                    objs.context.fillStyle = 'gray';
                    objs.context.drawImage(objs.images[0], 0, 0);

                    const recalculatedInnerWidth = document.body.offsetWidth / canvasScaleRatio;
                    const recalculatedInnerHeight = window.innerHeight / canvasScaleRatio;
                    

                    const whiteRectWidth = recalculatedInnerWidth * 0.15;
                    values.rect1X[0] = (objs.canvas.width - recalculatedInnerWidth) / 2;
                    values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
                    values.rect2X[0] = values.rect1X[0] + recalculatedInnerWidth - whiteRectWidth;
                    values.rect2X[1] = values.rect2X[0] + whiteRectWidth;




                    objs.context.fillRect(parseInt(values.rect1X[0]), 0, parseInt(whiteRectWidth), objs.canvas.height);
                    objs.context.fillRect(parseInt(values.rect2X[0]), 0, parseInt(whiteRectWidth), objs.canvas.height);

                }

                break;
            case 3:
                let step = 0;
                // full screen setting
                const widthRatio = window.innerWidth / objs.canvas.width;
                const heightRatio = window.innerHeight / objs.canvas.height;
                let canvasScaleRatio;
                if(widthRatio <= heightRatio) {
                    canvasScaleRatio = heightRatio;
                    // console.log("heightRatio");
                }
                else {
                    canvasScaleRatio = widthRatio;
                    // console.log("widthRatio");
                }

                objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
                objs.context.fillStyle = 'gray';
                objs.context.drawImage(objs.images[0], 0, 0);

                const recalculatedInnerWidth = document.body.offsetWidth / canvasScaleRatio;
                const recalculatedInnerHeight = window.innerHeight / canvasScaleRatio;

                if(!values.rectStartY) {
                    // values.rectStartY = objs.canvas.getBoundingClientRect().top;
                    values.rectStartY = objs.canvas.offsetTop + (objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2;
                    values.rect1X[2].start = (window.innerHeight / 2) / scrollHeight;
                    values.rect2X[2].start = (window.innerHeight / 2) / scrollHeight;
                    values.rect1X[2].end = values.rectStartY / scrollHeight;
                    values.rect2X[2].end = values.rectStartY / scrollHeight;
                }
                

                const whiteRectWidth = recalculatedInnerWidth * 0.15;
                values.rect1X[0] = (objs.canvas.width - recalculatedInnerWidth) / 2;
                values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
                values.rect2X[0] = values.rect1X[0] + recalculatedInnerWidth - whiteRectWidth;
                values.rect2X[1] = values.rect2X[0] + whiteRectWidth;



                // make white box in left right position
                // objs.context.fillRect(values.rect1X[0], 0, parseInt(whiteRectWidth), objs.canvas.height);
                // objs.context.fillRect(values.rect2X[0], 0, parseInt(whiteRectWidth), objs.canvas.height);
                objs.context.fillRect(parseInt(calcValues(values.rect1X, currentYOffset)), 0, parseInt(whiteRectWidth), objs.canvas.height);
                objs.context.fillRect(parseInt(calcValues(values.rect2X, currentYOffset)), 0, parseInt(whiteRectWidth), objs.canvas.height);

                if(scrollRatio < values.rect1X[2].end) {
                    step = 1;

                    objs.canvas.classList.remove('sticky');
                }
                else {
                    step = 2;

                    values.blendHeight[0] = 0;
                    values.blendHeight[1] = objs.canvas.height;
                    values.blendHeight[2].start = values.rect1X[2].end;
                    values.blendHeight[2].end = values.blendHeight[2].start + 0.2;

                    const blendHeight = calcValues(values.blendHeight, currentYOffset);
                    
                    objs.context.drawImage(objs.images[1], 
                        0, objs.canvas.height - blendHeight, objs.canvas.width, blendHeight,
                        0, objs.canvas.height - blendHeight, objs.canvas.width, blendHeight);


                    objs.canvas.classList.add('sticky');
                    objs.canvas.style.top = `${-(objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2}px`;
                    if (scrollRatio > values.blendHeight[2].end) {
                        values.canvasScale[0] = canvasScaleRatio;
                        values.canvasScale[1] = document.body.offsetWidth / (1.5 * objs.canvas.width);
                        values.canvasScale[2].start = values.blendHeight[2].end;
                        values.canvasScale[2].end = values.canvasScale[2].start + 0.2;

                        objs.canvas.style.transform = `scale(${calcValues(values.canvasScale, currentYOffset)})`;
                        objs.canvas.style.marginTop = 0;
                
                    }
                    if(scrollRatio > values.canvasScale[2].end && values.canvasScale[2].end > 0) {
                        objs.canvas.classList.remove('sticky');
                        objs.canvas.style.marginTop = `${scrollHeight * 0.4}px`;

                        values.canvasCaptionOpacity[2].start = values.canvasScale[2].end;
                        values.canvasCaptionOpacity[2].end = values.canvasCaptionOpacity[2].start + 0.1;
                        values.canvasCaptionTranslateY[2].start = values.canvasScale[2].start;
                        values.canvasCaptionTranslateY[2].end = values.canvasCaptionOpacity[2].end;
                        objs.canvasCaption.style.opacity = calcValues(values.canvasCaptionOpacity, currentYOffset);
                        objs.canvasCaption.style.transform = `translate3d(0, ${calcValues(values.canvasCaptionTranslateY, currentYOffset)}%, 0)`
                    }
                }

                break;
        }
    }

    function scrollLoop() {
        newScene = false;
        prevScrollHeight = 0;
        for(let i=0; i<currentScene; i++){
            prevScrollHeight += sceneInfo[i].scrollHeight;  
        }
        if(delayedYOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            newScene = true;
            currentScene++;
            document.body.setAttribute('id',`show-scene-${currentScene}`);
        }
        if(delayedYOffset < prevScrollHeight) {
            newScene = true;
            if(currentScene === 0){
                return;
            }
            currentScene--;
            document.body.setAttribute('id',`show-scene-${currentScene}`);
        }
        if (newScene){
            return;
        }
        anymation();

    }

    function loop() {
        delayedYOffset = delayedYOffset + (yOffset - delayedYOffset) * acc;

        if(!newScene) {
            if(currentScene === 0 || currentScene === 2) {
                const currentYOffset = delayedYOffset - prevScrollHeight;
                const values = sceneInfo[currentScene].values;
                const objs = sceneInfo[currentScene].objs;
                let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
                if(objs.videoImages[sequence]) {
                    objs.context.drawImage(objs.videoImages[sequence], 0, 0);
                }
            }  
        }
        rafId = requestAnimationFrame(loop);
            
        if(Math.abs(yOffset - delayedYOffset) < 1) {
            cancelAnimationFrame(rafId);
            rafState = false;
        }
    }

    setCanvasImages();

    // window.addEventListener('DOMContentLoaded', setLayout);
    window.addEventListener('load', () => {

        document.body.classList.remove("before-load");
        setLayout();
        sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0],0,0);

        let tempYOffset = yOffset;
        let tempScrollCount = 0;
        if(tempYOffset > 0) {
            let setIntervalId = setInterval(() => {
                window.scrollTo(0, tempYOffset);
                tempYOffset += 5;
                tempScrollCount ++;
                if(tempScrollCount >= 20) {
                    clearInterval(setIntervalId);
                }
            }, 20);
        }

        // setTimeout(() => {
        //     window.scrollTo(0, 200);
        // },500);

        window.addEventListener('scroll', () => {
            yOffset = window.pageYOffset;
            menuInfo();
            scrollLoop();
    
            if(!rafState) {
                rafId = requestAnimationFrame(loop);
                rafState = true;
            }
        });

        window.addEventListener('resize', () => {
            if(window.innerWidth > 900) {
                setLayout();
                sceneInfo[3].values.rectStartY = 0;
            }
        });
        
        window.addEventListener('orientationchange', () => {
            setTimeout(setLayout, 300);
        });

        document.querySelector('.loading').addEventListener('transitionend', (event) => {
            document.body.removeChild(event.currentTarget);
        });
    });
    
})();