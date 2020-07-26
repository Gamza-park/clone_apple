(() => {
    
    let yOffset = 0; // page yOffset val
    let prevScrollHeight = 0 // before yOffset scroll height
    let currentScene = 0 // now scroll section
    let newScene = false // if enter the new scene  newScene = true

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
                messageD: document.querySelector('#scroll-section-0 .main-message.d')
            },
            values: {
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
                pinC: document.querySelector('#scroll-section-2 .c .pin')
            },
            values: {
                messageAOpacityIn: [0, 1, {start: 0.15, end: 0.2}],
                messageBOpacityIn: [0, 1, {start: 0.5, end: 0.55}],
                messageCOpacityIn: [0, 1, {start: 0.72, end: 0.77}],
     
                messageAOpacityOut: [1, 0, {start: 0.3, end: 0.35}],
                messageBOpacityOut: [1, 0, {start: 0.58, end: 0.63}],
                messageCOpacityOut: [1, 0, {start: 0.85, end: 0.9}],
    
                messageATranslateYIn: [20, 0, {start: 0.15, end: 0.2}],
                messageBTranslateYIn: [30, 0, {start: 0.5, end: 0.55}],
                messageCTranslateYIn: [30, 0, {start: 0.72, end: 0.77}],
        
                messageATranslateYOut: [0, -20, {start: 0.3, end: 0.35}],
                messageBTranslateYOut: [0, -20, {start: 0.58, end: 0.63}],
                messageCTranslateYOut: [0, -20, {start: 0.85, end: 0.9}],

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
                canvasCaption: document.querySelector('.canvas-caption')
            },
            values: {

            }
        }
    ];

    function setLayout() {
        // Scroll section hight setting
        for(let i=0; i<sceneInfo.length; i++){
            if(sceneInfo[i].type === 'sticky') {
                sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            }
            else if(sceneInfo[i].type === 'normal') {
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

            if(currentYOffset >= scrollPartStart && currentYOffset <=scrollPartEnd) {
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
                if (scrollRatio <= 0.32) {
                    // in
                    objs.messageA.style.opacity = calcValues(values.messageAOpacityIn, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageATranslateYIn, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageA.style.opacity = calcValues(values.messageAOpacityOut, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageATranslateYOut, currentYOffset)}%, 0)`;
                }
    
                if (scrollRatio <= 0.67) {
                    // in
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageBTranslateYIn, currentYOffset)}%, 0)`;
                    objs.messageB.style.opacity = calcValues(values.messageBOpacityIn, currentYOffset);
                    objs.pinB.style.transform = `scaleY(${calcValues(values.pinBScaleY, currentYOffset)})`;
                } else {
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
                } else {
                    // out
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageCTranslateYOut, currentYOffset)}%, 0)`;
                    objs.messageC.style.opacity = calcValues(values.messageCOpacityOut, currentYOffset);
                    objs.pinC.style.transform = `scaleY(${calcValues(values.pinCScaleY, currentYOffset)})`;
                }

                break;
            case 3:
                break;
        }
    }

    function scrollLoop() {
        newScene = false;
        prevScrollHeight = 0;
        for(let i=0; i<currentScene; i++){
            prevScrollHeight += sceneInfo[i].scrollHeight;  
        }
        if(yOffset > prevScrollHeight+sceneInfo[currentScene].scrollHeight) {
            newScene = true;
            currentScene++;
            document.body.setAttribute('id',`show-scene-${currentScene}`);
        }
        if(yOffset < prevScrollHeight) {
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

    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset;
        scrollLoop();
    });
    // window.addEventListener('DOMContentLoaded', setLayout);
    window.addEventListener('load', setLayout);
    window.addEventListener('resize', setLayout);

})();