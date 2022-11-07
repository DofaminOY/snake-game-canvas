
/**
 * Global options for the GAME
 */
const config = {
    // all game
    fieldWidth: 600,
    fieldHeight: 600,
    delay:150, //конфиг скорости
    
    // snake
    snakeCellWidth: 30,
    snakeCellHeight: 30,
    stepSkipRate: 2, // TODO коофициент припуска - при сравнении размеров змейки и яблока - переименовать.
    snakeColor: 'blue',
    minSnakeLength: 4, // в фрагментах (4шт. фрагментов)
    maxSnakeLength: 50, // в фрагментах (20шт. фрагментов)
    
    // apple 
    appleMealCalculator: 0, // TODO (?)
    appleSize: 22,
    appleColor: 'black',
    scorePerApple: 5,// сколько очей начислять за одно съеденное яблоко

    // score
    scoreTextColor: "purple"
};

const game = { 
    score: 0, // текущее кол-во очей
    currentDirection: null,
    step: 30,
    isFinished: false,
};


let pause = false;
console.log(pause);

let Apple3 = function ( {name = 'name', width = 30, height = 30, x = 30, y = 30, color = snakeFragmentDefaultOptionsX.color, } ) {
    this.name = name;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.color = color;
};

let SnakeFragment = function ( {name = 'snakeFragment', width = 30, height = 30, x = 30, y = 30, index = 0, color = snake.color } ) {
    this.name = name;

    // for render
    this.color = color; 
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;

    this.index = index;
};




// TODO дополнить перечень пар-ров мередаваемых для создания яблока (!)


const snake = {
    name: "snake",
    width: config.snakeCellWidth,
    height: config.snakeCellHeight,
    color: config.snakeColor,
    x: null,
    y: null,
    snakeFragmentArr: [],
};

let snakeFragment = null;

let snakeFragmentDefaultOptionsX = {
    name: "snakeFragment",
    width: config.snakeCellWidth,
    height: config.snakeCellHeight,
    // color: config.snakeColor,
    color: 'green',
    x: snake.x, 
    y: snake.y,
    index: 1,
};

let apple = null;
let appleDefaultOptions = {
    name: "aple",

    color: config.appleColor,
    x: 30,
    y: 30,
    width: config.snakeCellWidth,
    height: config.snakeCellHeight,
};

/**
 * 
 * @param {Object} options 
 * @returns { SnakeFragment } snakeFragment
 */
function getSnakeFragment( options = { x: null, y: null, size: null, index: null, color: null } ) {

    let { x, y, size, index, color } = options;
    let snakeFragment = null;

    let snakeFragmentOptions = JSON.parse( JSON.stringify ( snakeFragmentDefaultOptionsX ) ); 
   
    snakeFragmentOptions.x = x ? x : snakeFragmentDefaultOptionsX.x;
    snakeFragmentOptions.y = y ? y : snakeFragmentDefaultOptionsX.y;
    snakeFragmentOptions.width = size ? size : snakeFragmentDefaultOptionsX.width; 
    snakeFragmentOptions.height = size ? size : snakeFragmentDefaultOptionsX.height;
    snakeFragmentOptions.index = index ? index : snakeFragmentDefaultOptionsX.index;
    snakeFragmentOptions.color = color ? color : snakeFragmentDefaultOptionsX.color;

    
    snakeFragment = new SnakeFragment( snakeFragmentOptions );

    
    // apple = new Apple3( options );
    return snakeFragment;
}




// init();
// var a = new SnakeFragment( snakeFragmentDefaultOptions );
// console.log('a', a);

// a = getSnakeFragment();
// console.log('a', a);

// a = getSnakeFragment({ x: 33, y: 22 });
// console.log('a', a);


// a = getSnakeFragment({ size: 100 });
// console.log('a', a);

// a = getSnakeFragment({ index: 20, x: 44 });
// console.log('a', a);
//--------------------------------------------------------------------------------------------------------------

apple = getNewApple( );

//--------------------------------------------------------------------------------------------------------------

/**
 * //TODO add function descriptions (!) 
 * @param {Object} options - новые настройи для яблока, если не подходят обычные, иначе - дефаулт
 * options = { x: null, y: null, size: null }, где size - длина сторон, квадрата
 * @returns apple: Apple3;
 * 
// used apple = new Apple3( appleOptions );
// apple = getNewApple( { x: 30, y: 50 } );
// apple = getNewApple({ size: 150 });
// apple = getNewApple( appleDefaultOptions );
// apple = getNewApple();
 */
function getNewApple( options = { x: null, y: null, size: null, color: null,} ) {
    
    let { x, y, size, color} = options;
    let apple = null;
    let appleOptions = JSON.parse( JSON.stringify ( appleDefaultOptions ) ); // TODO копировать данные из appleDefaultOptions в appleOptions (!)
    let getRandomCoordResult = getRandomCoord( config, size );
    appleOptions.x = x ? x : getRandomCoordResult.x;
    appleOptions.y = y ? y : getRandomCoordResult.y;
    appleOptions.width = size ? size : appleDefaultOptions.width; // TODO почему не видит переменную?
    appleOptions.height = size ? size : appleDefaultOptions.height;
    appleOptions.color = color ? color : appleDefaultOptions.color;

    apple = new Apple3( appleOptions );
    // apple = new Apple3( options );
    return apple;
}

function init(params) {
    // TODO REMEMBER THIS ROW -- run ONLY ONE TIME (!)
    initSnake();
    // addPauseControl( c );

    // initApple();
}

// // TODO add function init() and initiate values for coordinateSnake and etc. 
function initCoordinateSnake( config, snake ) {
   snake.x = ( ( config.fieldWidth / 2 ) - ( snake.width / 2 ) );
   snake.y = ( ( config.fieldHeight / 2 ) - ( snake.height / 2 ) );
}

function initSnake() {
    initCoordinateSnake( config, snake );
    for ( let i = 1; i <= config.minSnakeLength; i++ ) {
        let opt = { x: snake.x + ( 30 * i), y: snake.y, index: i };
        let el = getSnakeFragment( opt );
        snake.snakeFragmentArr.push( el );
    }
}




















//*----------------------------------------------------------------- use a code
let c = document.getElementById("gameSnake");
let ctx = c.getContext ('2d');

c.style = " border:1px solid #000000; " // параметри поля канвас
c.width = config.fieldWidth; 
c.height = config.fieldHeight;    


const availableDirection = {
    up: { valueID: 'up', controlArr: [38, 87] },
    down: { valueID: 'down', controlArr: [40, 83] },
    left: { valueID: 'left',controlArr: [37, 65] },
    right: { valueID: 'right', controlArr: [39, 68] },
};

// TODO повторить темы объекты и массивы, особо обратить внимание на создание и считывание данных.
// TODO + правила именования свойств объекта.

// TODO научиться проверять содержится ли значение в массиве, иначе говоря  - содержит ли массив искомое значение!

/**
 * 
// for USE EXAMPLE 
let getDirectionValueIDByKeyCode = getDirvalueIDByKeyCode ( availableDirection, 39 );
 * @param { Object } availableDirection - collection of avaible directions.
 * @param { Number } keyCode - keyCode from event object.
 * @returns { String } valueID - valueID of direction.
 */
function getDirectionValueIDByKeyCode ( availableDirection, keyCode ) { // FIX getDirectionValueIDByKeyCode - правила именования переменных
    let valueID = null;
        
    function getElByKeyCode ( elementOfArray ) {
        let res = null;
        let conditionResult = null; 
        
        // your code here .includes("thick scales");
        
        /*
        // todo сохранить себе на картонку и в файл
        // todo сохранить себе на картонки предыдущие "шпоргалки" (!). 
        // TODO Add return notifications for all cases (!)
        // 0 вариант---  if ( keyCode === elementOfArray.controlArr[ 0 ] || keyCode === elementOfArray.controlArr[1]  ) {
        
        Array.includes
        // 1 вариант---if ( elementOfArray.controlArr.includes(keyCode) === true ) {
        
        Array.find
        //let fResult = elementOfArray.controlArr.find(element => element == keyCode);
        
        Array.indexOf
        //3  if ( elementOfArray.controlArr.indexOf(keyCode) !== -1 ) {
        
        Array.filter
        // if (elementOfArray.controlArr.filter(element => element == keyCode) )  { // FIX ERROR CASE
        */ 
       
        // let arrFun = elementOfArray.controlArr.filter(element => element == keyCode);

        // условие проверки - содержит ли массив arrFun значение keyCode или нет.
        if ( elementOfArray.controlArr.find( element => element === keyCode ) )  {
            // условие выполнено
            conditionResult = true;
            console.log( `получаем от conditionResult ${conditionResult}` );
        } else {
            // условие НЕ выполнено
            conditionResult = false;
            console.log( ` получаем от conditionResult ${conditionResult}` );
        }

        // ------------------------------------------- do not modify code here
        // if ( conditionResult === true ) {
        if ( conditionResult ) {
            res = true;   
        } else {
            res =  false;
        }

        return res;
    }


    // значения объекта преобразуем в массив значений (ES8)
    let availableDirectionArr = Object.values( availableDirection ); //[].concat( ...(Object.values( availableDirection ).map( el => el.controlArr )) );
    console.log( 'availableDirectionArr', availableDirectionArr);
    let filterResult = availableDirectionArr.filter( getElByKeyCode );
    // getElByKeyCode ( elementOfArray, indexOfElement, array );
    if ( filterResult[0] === undefined ) {
       // DEBUG THIS
        // FIX  THIS BUG (!)
        console.error( 'filterResult[0] === undefined', `getDirectionValueIDByKeyCode ( availableDirection = ${availableDirection}, keyCode = ${keyCode} )` );
    }
    valueID = filterResult[0].valueID; 

    return valueID;
}


const controlObj = {
    // left 
    37: {
        key: 'ArrowLeft',
        code: 'ArrowLeft',
        keyCode: 37,
        direction: '',

    },
    65: {
        key: 'a',
        code: 'KeyA',
        keyCode: 65,
    },

    // up
    38: {
        key: 'ArrowUp',
        code: 'ArrowUp',
        keyCode: 38,
        direction: '',

    },
    87: {
        key: 'w',
        code: 'KeyW',
        keyCode: 87,
    },
    
    // down
    40: {
        key: 'ArrowDown',
        code: 'ArrowDown',
        keyCode: 40,
        direction: '',

    },
    83: {
        key: 's',
        code: 'KeyS',
        keyCode: 83,
    },

    // right
    39: {
        key: 'ArrowRight',
        code: 'ArrowRight',
        keyCode: 39,
        direction: '',

    },
    68: {
        key: 'd',
        code: 'KeyD',
        keyCode: 68,
    },

    //pause
    80: {
        key: 'p',
        code: 'KeyP',
        keyCode: 80,
    },
};

// let tmpRes = null;
// tmpRes = controlObj['37'];
// tmpRes = controlObj[37];
// tmpRes = controlObj.37;
// console.log( 'tmpRes', tmpRes );

function setX( newX ) {
    snake.x = newX;
}
function setY( newY ) {
    snake.y = newY;
}


// let currentDirection = null; 
// let step = 5;

ctx.fillStyle = ' blue ';
// let blueXY = ctx.fillRect(10, 10, width, height);
document.addEventListener( 'keydown', onKeydown );


function onKeydown( e ) {
    let {code, keyCode } = e;
    let direction = null;
    if ( game.isFinished ) {
        alert( 'Game is over!' );
        return false;
    }
    // ----------------------------------------------------------------- add pause function    
    let p = Object.values( controlObj ).filter ( el => el.keyCode === keyCode ); // TODO change algorithm after add normall/good controll algorithm
    // let arrFun = elementOfArray.controlArr.filter(element => element == keyCode);
    // console.log( p[0].keyCode );
    if ( p.length !== 0 ) {
        if ( p[0].keyCode === 80 || p[0].key === 'p' ) {
            switchPause();
            return;
        }
    }
    // -----------------------------------------------------------------

    // Press W or ArrowUp to get valueID from up: { valueID: 'up', controlArr: [38, 87] },
    // var arrNew = arrOld.concat( [ 1, 2, 3 ], [], [] );
    availableDirectionKeyCodeArr = [].concat( ...(Object.values( availableDirection ).map( el => el.controlArr )) );
    
    // condition - проверяет содержится ли e.keyCode в availableDirectionKeyCodeArr...
    let conditionRes = availableDirectionKeyCodeArr.includes( keyCode ) === true; //true/false;
    
    // Если НЕТ 
    if ( !conditionRes ) {
        // - выходим из ф-ции, 
        return conditionRes;
    }
    
    // если да - проходим дальше и обрабатываем смену направления
    direction = getDirectionValueIDByKeyCode( availableDirection, keyCode );

    // currentDirection = code;
    changeDirection( game, direction );
}

function passingWall ( coordinateSnake, c ) { // параметр відкритої стіни

    if( coordinateSnake.x >  c.width )   { 
        coordinateSnake.x = 0;
        // setX( 0 );
    }
    else if ( coordinateSnake.x <  0  )   { 
        coordinateSnake.x = c.width; 
        // setX( c.width );
    }
    else if ( coordinateSnake.y >  c.height  )  {
        coordinateSnake.y = 0;
        
        // setY( 0 );
    }
    else if ( coordinateSnake.y < 0  ) {
        coordinateSnake.y = c.height;
        // setY( c.height );
    } 
}

/**
 * ОСУЩЕСТВЛЯЕТ ДВИЖЕНИЕ - ПЕРЕМЕЩАЕТ ОБЪЕКТ НА КАРТЕ, т.е. меняет его координаты.
 * @param { String } direction - valueID of direction.
 * @param {Number} step  - Integer value.
 */
function movement ( direction, step,  ) {
    let oldSHX = snake.x;
    let oldSHY = snake.y;

    // move head of snake
    if ( direction == availableDirection.down.valueID ) {
        snake.y = snake.y + step;
        // console.log( `ArrowDown, ${snake.y} координати Y+ ` );
    } else if ( direction == availableDirection.up.valueID ){
        snake.y = snake.y - step;
        // console.log( `ArrowUp, ${snake.y} координати Y- ` );
    } else if ( direction == availableDirection.right.valueID ) {
        snake.x = snake.x + step;
        // console.log( `ArrowRight, ${snake.x} координати X+` );
    } else if ( direction == availableDirection.left.valueID ) {
        snake.x = snake.x - step;
        // console.log( `ArrowLeft, ${snake.x} координати X-` );
    }

    // move fragments of snake 
    if (  snake.snakeFragmentArr.length && ( snake.x !== oldSHX || snake.y !== oldSHY )  ) {
        moveSnakeFragments( snake.snakeFragmentArr, oldSHX, oldSHY );
        const [ first, second, ...body ] = snake.snakeFragmentArr;
       
        if ( isSnakeBodyCollision2( body, snake, true ) ){
            switchPause();
            alert("game over");
        }
    }
    

}

function moveSnakeFragments( snakeFA, oldSHX, oldSHY ) {
    let oldPEX = oldSHX;
    let oldPEY = oldSHY;
    for ( let i = snakeFA.length; i >= 2; i-- ) {
        snakeFA[i-1].x = snakeFA[i-1-1].x;
        snakeFA[i-1].y = snakeFA[i-1-1].y;
    }
    snakeFA[0].x = oldSHX;
    snakeFA[0].y = oldSHY;
}

function renderSnake ( ctx ) {
    let sizeFragDefault = ( config.snakeCellWidth + config.snakeCellHeight ) / 2;

    // render head of snake
    // TODO need implement render of head renderFragment( ctx, { x: snake.x + (z * sizeFragDefault), y: snake.y, width: snake.width, height: snake.height, color: 'green'} )
    
    let arr = snake.snakeFragmentArr;
    for ( let i = 1; i <= snake.snakeFragmentArr.length; i++ ) {
        let el = snake.snakeFragmentArr[ i-1 ];
        renderFragment( ctx, el );
    }

}

function renderFragment( ctx, el ) {
    
    ctx.fillStyle = el.color;
    ctx.fillRect( el.x, el.y, el.width, el.height );
}



function changeDirection( game, direction ) {
    game.currentDirection = direction;
}

function clearCanvas ( ctx, canvas ) {
    ctx.clearRect( 0, 0, canvas.width, canvas.height );
}

function update ( ctx, canvas) {
    console.log( `update` );

    // clear 
    clearCanvas ( ctx, canvas );

    // modify
    modify( canvas );

    
    // draw
    render ( ctx );  

}

function modify( canvas ) {
    
    let { step, currentDirection, } = game; // берёт глобальный объект игры и распечатывает из него два св-ва: шаг и текущее направление...
    
    //movement
    if ( !pause ) {
        movement( currentDirection, step  );
    }

    passingWall ( snake, canvas );

    // let isCollisionResult = isCollision( snake, apple ); // { res, isFullCollision }
    // if (  isCollisionResult.res === true  ) {
    if (  isCollision( snake, apple ).res  ) {
        debugger;
        isCollisionHandler();
        
        game.score += config.scorePerApple;

        if ( snake.snakeFragmentArr.length < config.maxSnakeLength) {
            
            addFragment();
        }
            
    }
    
}

function addFragment () {
    
    let x = null;
    let y = null;
    let isERROR = false;
    
    let lfX = snake.snakeFragmentArr.length ? snake.snakeFragmentArr[snake.snakeFragmentArr.length - 1].x : snake.x;
    let lfY = snake.snakeFragmentArr.length ? snake.snakeFragmentArr[snake.snakeFragmentArr.length - 1].y : snake.y;
    let lfHeight = snake.snakeFragmentArr.length ? snake.snakeFragmentArr[snake.snakeFragmentArr.length - 1].height : snake.height;
    let lfW = snake.snakeFragmentArr.length ? snake.snakeFragmentArr[snake.snakeFragmentArr.length - 1].width : snake.width;

    switch ( game.currentDirection ) {
        case 'up':
            x = lfX;
            y = lfY + lfHeight;
            break;

        case 'down':
            x = lfX;
            y = lfY - lfHeight;
            break;

        case 'left':
            x = lfX + lfW;
            y = lfY;
            break;

        case 'right':
            x = lfX - lfW;
            y = lfY;
            break;
    
        default:
            isERROR = true;
            break;
    }

    let opt = {
        x,
        y,
        index: ( 0 + snake.snakeFragmentArr.length + 1 ) 
    };

    if ( isERROR ) return;
    
    let el = getSnakeFragment( opt );
    snake.snakeFragmentArr.push( el );
}



function render ( ctx ) {
    // ONLY DRAW FUNCTION HERE (!)
    // draw apple
    renderApple ( apple );
   
    // draw snake
    ctx.fillStyle =  snake.color;
    let blueXY = ctx.fillRect( snake.x, snake.y, snake.width, snake.height );
    
    renderSnake ( ctx );
    renderScore( ctx );
}

function renderScore( ctx ) {
    ctx.fillStyle = config.scoreTextColor;
    ctx.font = "48px serif";
    ctx.fillText( "Score " + game.score , 10, 50 );
}

function isCollisionHandler( params ) {
    console.log( 'isCollisionHandler' );

    let isOK = false;
    while( !isOK ) {
        changeAppleCoords( apple );
        // if ( !isSnakeBodyCollision( snake.snakeFragmentArr, apple ) ) {
        if ( !isSnakeBodyCollision2( snake.snakeFragmentArr, apple ) ) {
            isOK = true;
        }

    }
    
}

function changeAppleCoords( apple ) {
    let tmpCoords = getRandomCoord ( config );
    console.log( 'changeAppleCoords' );
 
    apple.x = tmpCoords.x;
    apple.y = tmpCoords.y;
}

function getRandomInt( min, max ) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

function getRandomCoord ( config, size ) {
    let res = {};
    
    let a = isExist( apple ) ? apple : appleDefaultOptions;

    res.x = getRandomInt(  0 ,  config.fieldWidth -  ( size ? size : a.width )  );
    res.y = getRandomInt(  0 ,  config.fieldHeight - ( size ? size : a.height ) );

    if ( res.x + a.width > config.fieldWidth || res.y + a.height > config.fieldHeight ) {
        alert( 'getRandomInt ERROR: res.x + a.width > config.fieldWidth || res.y + a.height > config.fieldHeight' );
        console.error( 'getRandomInt ERROR: res.x + a.width > config.fieldWidth || res.y + a.height > config.fieldHeight' );
    }

    return res;
}


function renderApple ( a3 ) {

    // draw apple
    // TODO взять данные из глобального объекта а3 (пробив область видимости) и нарисовать его.
    ctx.fillStyle = apple.color;
    let a3View = ctx.fillRect( a3.x, a3.y, a3.width, a3.height ); // Done!
    
}



/*
//FIX  THIS BUG
apple
Apple3 {name: 'aple', width: 30, height: 30, x: 384, y: 173}
snake
{x: 385, y: 165}
isCollision( snake, apple)
undefined
*/


//localStorage
// let snakeX =  null;
// let snakeY = null; 
// let a3X = null;
// let a3Y = null; 

let snakeX =  55;
let snakeY = 55; 
let a3X = 55;
let a3Y = 55; 
let paramsSnakeAndApple = null; 
const paramsSnakeAndAppleObj = {
    snake: {
        x: snakeX,
        y: snakeY,
    },
    apple: {
        x: a3X,
        y: a3Y,
    }
}

if ( !snakeX ===  null && !snakeY === null &&  !a3X === null && !a3Y === null ) {
    localStorage['params'] = JSON.stringify( paramsSnakeAndAppleObj );
} else if ( localStorage['params'] && !paramsSnakeAndApple === null  ) {
    paramsSnakeAndApple = JSON.parse(localStorage['params']);
}     
 
    


function isCollision ( snake, apple ) {
    //  snakeX = snake.x;
    //  snakeY = snake.y; 
    //  appleX = apple.x;
    //  appleY = apple.y; 

    let result = {
        res: false,
        isFullCollision: false,
    };
     
    let ifStepMoreAppl = 0; //  перевірка чи більший крок за тіло яблука, ( game.step + 2 ) +2 тому що це дорівнює пікселям, 
    //а для того щоб перескочити обєкт і не зачепити його потрібно щоб крок був хочаб на 2 пікселя більший обєкта, 
    //1 піксель на одну сторону інший на другу, а в іншому випадку одна сторона обєкту бути мати спільні координати і умова виповниться.
    let appleAverageArithmLengthParties = (  apple.width + apple.height ) / 2; 
    let snakeAverageArithmLengthParties = (  snake.width + snake.height ) / 2;

    if ( ( game.step + config.stepSkipRate ) >  ( appleAverageArithmLengthParties ) ) {
        // TODO МНЕ ГЛЯНУТЬ И ВНИКНУТЬ (!).
        ifStepMoreAppl = game.step  -  appleAverageArithmLengthParties // на випадок якщо обєкт якимось чудом буде мати не рівні сторони, будемо шукати середню арифметичну сторону. 
    }
  
    
    //змея
    let SnakeLeft = snake.x; 
    let SnakeRight = snake.x + snake.width; 
    let SnakeTop = snake.y; 
    let SnakeBottom = snake.y + snake.height;  

    //яблуко
    let AppleLeft = ( apple.x + ifStepMoreAppl ); // TODO ПОЯСНИТЬ ЛОГИКУ, тут может быть ошибка (!)
    let AppleRight = ( apple.x + ifStepMoreAppl ) + apple.width;  // TODO ПОЯСНИТЬ ЛОГИКУ, тут может быть ошибка (!)
    let AppleTop = ( apple.y + ifStepMoreAppl );  // TODO ПОЯСНИТЬ ЛОГИКУ, тут может быть ошибка (!)
    let ApplBottom = ( apple.y + ifStepMoreAppl ) + apple.height;    // TODO ПОЯСНИТЬ ЛОГИКУ, тут может быть ошибка (!)
    // console.log( SnakeRight, "SnakeRight", SnakeLeft, "SnakeLeftX", SnakeBottom, "SnakeBottom", SnakeTop, "SnakeTop" );
    // console.log( AppleRight, "AppleRight", AppleLeft, "AppleLeft", ApplBottom, "ApplBottom", AppleTop  , "AppleTop" );

        // FIX тут не ясно, где у нас какой тип данных, нужно именовать так, чтоб было понятно - правила именования переменных (прочесть, ОБСУДИТЬ и ТОЛЬКО после этого применить)... 
        let snakeLeftMoreAppleLeftAndSnakeLeftLessAppleRight = null;
        let snakeTopLessApplBottomAndSnakeTopMoreAppleTop = null;
        let snakeRightLessAppleRightAndSnakeRightMoreAppleLeft = null;
        let snakeBottomMoreAppleTopAndSnakeBottomLessApplBottom = null;
        let appleInsideSnake = null;
        let snakeBiggerApple = null;
        let snakeBiggerAppleAppleRight = null;
        let snakeBiggerAppleAppleLeft = null;
        let snakeBiggerAppleAppleUnderSnake = null;
        let snakeBiggerAppleSnakeUnderApple = null;
        let snakeInsideApple = null; 
        let appleBiggerSnake = null; 
        let appleBiggerSnakeSnakeRight = null; 
        let appleBiggerSnakeSnakeLeft = null; 
        let appleBiggerSnakeUnderApple = null; 
        let appleBiggerAppleUnderSnake = null; 

    if ( ( SnakeLeft === AppleLeft ) && ( SnakeRight === AppleRight ) && ( SnakeTop === AppleTop ) && ( SnakeBottom === ApplBottom ) ) {
        // It is Full Collision (!)
        result.res = true;
        result.isFullCollision = true;

        return result;
    }
        
        
    if ( appleAverageArithmLengthParties > snakeAverageArithmLengthParties ) { // порівняння чи більше яблуко змії

        appleBiggerSnake = ( SnakeRight <= AppleRight ) && ( SnakeRight >= AppleLeft ) &&  ( SnakeLeft <= AppleRight ) && ( SnakeLeft >= AppleLeft ); // appleBiggerSnake and snakeInsideApple по суті разом працює як перевірка повного знаходження змії в середені яблука, але окремі частини коду перевикористовуються в провірці.

        snakeInsideApple =  ( SnakeBottom <= ApplBottom ) && ( SnakeBottom >= AppleTop ) && ( SnakeTop <= ApplBottom ) && ( SnakeTop >= AppleTop ); //ок

        appleBiggerSnakeSnakeRight = ( SnakeRight >= AppleRight ) && ( SnakeRight >= AppleLeft ) &&  ( SnakeLeft <= AppleRight ) && ( SnakeLeft >= AppleLeft ); 

        appleBiggerSnakeSnakeLeft = ( SnakeRight <= AppleRight ) && ( SnakeRight >= AppleLeft ) &&  ( SnakeLeft <= AppleRight ) && ( SnakeLeft <= AppleLeft ); 

        appleBiggerSnakeUnderApple = ( SnakeBottom >= ApplBottom ) && ( SnakeBottom >= AppleTop ) && ( SnakeTop <= ApplBottom ) && ( SnakeTop >= AppleTop );

        appleBiggerAppleUnderSnake = ( SnakeTop <= ApplBottom ) && ( SnakeTop <= AppleTop ) && ( SnakeBottom <= ApplBottom ) && ( SnakeBottom >= AppleTop );

    }
    else if ( appleAverageArithmLengthParties < snakeAverageArithmLengthParties ) { // порівняння чи більша змія яблука
         
        snakeBiggerApple = ( SnakeRight >= AppleRight ) && ( SnakeRight >= AppleLeft ) &&  ( SnakeLeft <= AppleRight ) && ( SnakeLeft <= AppleLeft ); // snakeBiggerApple and appleInsideSnake по суті разом працює як перевірка повного знаходження яблука в середені змії, але окремі частини коду перевикористовуються в провірці.

        appleInsideSnake =  ( SnakeBottom >= ApplBottom ) && ( SnakeBottom >= AppleTop ) && ( SnakeTop <= ApplBottom ) && ( SnakeTop <= AppleTop );

        snakeBiggerAppleAppleRight = ( SnakeRight <= AppleRight ) && ( SnakeRight >= AppleLeft ) &&  ( SnakeLeft <= AppleRight ) && ( SnakeLeft <= AppleLeft ); 

        snakeBiggerAppleAppleLeft = ( SnakeRight >= AppleRight ) && ( SnakeRight >= AppleLeft ) &&  ( SnakeLeft <= AppleRight ) && ( SnakeLeft >= AppleLeft ); 

        snakeBiggerAppleAppleUnderSnake = ( SnakeBottom <= ApplBottom ) && ( SnakeBottom >= AppleTop ); 

        snakeBiggerAppleSnakeUnderApple = ( SnakeTop <= ApplBottom ) && ( SnakeTop >= AppleTop );

               
    }
    else if ( appleAverageArithmLengthParties === snakeAverageArithmLengthParties ) {
         snakeLeftMoreAppleLeftAndSnakeLeftLessAppleRight = ( SnakeLeft >= AppleLeft ) && ( SnakeLeft <=  AppleRight );  // Перевірка  SnakeLeft  більше або рівне AppleLeft і SnakeLeft менше або рівне AppleRight. 
         snakeTopLessApplBottomAndSnakeTopMoreAppleTop = ( SnakeTop <=  ApplBottom ) && ( SnakeTop >= AppleTop ); // Перевірка  SnakeTop чи менша або рівне ApplBottom і SnakeTop більша або рівне AppleTop. Працює лише в комбінації із попереднім кодом.
         snakeRightLessAppleRightAndSnakeRightMoreAppleLeft = ( SnakeRight <=  AppleRight ) && ( SnakeRight >= AppleLeft ); // Перевірка  SnakeRight чи менша або рівне AppleRight і SnakeRight більша або рівне AppleLeft
         snakeBottomMoreAppleTopAndSnakeBottomLessApplBottom = ( SnakeBottom >=  AppleTop ) && ( SnakeBottom <= ApplBottom ); // Перевірка SnakeBottom чи більше або рівне ApplTop і SnakeBottom менше або рівне ApplBottom
    }
    
    
    if  (   // TODO выравнивать содержимое блока самостоятельно, а не оставлять это мне
        ( ( snakeLeftMoreAppleLeftAndSnakeLeftLessAppleRight && snakeTopLessApplBottomAndSnakeTopMoreAppleTop ) || ( snakeRightLessAppleRightAndSnakeRightMoreAppleLeft && snakeTopLessApplBottomAndSnakeTopMoreAppleTop ) ) || 
        ( ( snakeLeftMoreAppleLeftAndSnakeLeftLessAppleRight && snakeBottomMoreAppleTopAndSnakeBottomLessApplBottom ) || ( snakeRightLessAppleRightAndSnakeRightMoreAppleLeft && snakeBottomMoreAppleTopAndSnakeBottomLessApplBottom ) ||
        ( appleInsideSnake && snakeBiggerApple ) || ( snakeBiggerAppleAppleUnderSnake && snakeBiggerApple ) || ( snakeBiggerAppleSnakeUnderApple && snakeBiggerApple ) || ( snakeBiggerAppleAppleRight && appleInsideSnake  ) || (  snakeBiggerAppleAppleLeft && appleInsideSnake  )  ||
        ( snakeInsideApple && appleBiggerSnake ) || ( appleBiggerAppleUnderSnake && appleBiggerSnake ) || ( appleBiggerSnakeUnderApple && appleBiggerSnake ) || ( appleBiggerSnakeSnakeRight && snakeInsideApple  ) || (  appleBiggerSnakeSnakeLeft && snakeInsideApple  ) ) 
    ) {
       //TODO add game obj 
        config.appleMealCalculator = config.appleMealCalculator + 1;
        console.log(config.appleMealCalculator);
        
        // It is Full Collision (!)
        result.res = true;
        result.isFullCollision = false;

        return result;
     
    }
    else if ( false  ) { 
        alert("Error in logic!!!");
    }

    // It is NOT Collision (!)
    return result;

}



// function isSnakeBodyCollision(  a3,  snake ) {
//     // if ( snake.snakeFragmentArr.find( element => element ) )  {
//     if ( true )  {
        
//         console.log(snakeFragmentDefaultOptionsX);
//         console.log(snakeFragmentDefaultOptionsX);
        
    
//         let appleAverageArithmLengthParties = (  a3.width + a3.height ) / 2; 
//         let snakeAverageArithmLengthParties = (  snakeFragmentDefaultOptions.width + snakeFragmentDefaultOptions.height ) / 2;
        
//         //змея
//         let SnakeLeft = snakeFragmentDefaultOptionsX.x; 
//         let SnakeRight = snakeFragmentDefaultOptionsX.x + snakeFragmentDefaultOptions.width; 

//         let SnakeTop = snakeFragmentDefaultOptionsY.y; 
//         let SnakeBottom = snakeFragmentDefaultOptionsY.y + snakeFragmentDefaultOptions.height;
        
//         let appleInsideSnake = null;
//         let snakeBiggerApple = null;
//         let snakeBiggerAppleAppleRight = null;
//         let snakeBiggerAppleAppleLeft = null;
//         let snakeBiggerAppleAppleUnderSnake = null;
//         let snakeBiggerAppleSnakeUnderApple = null;
//         let snakeInsideApple = null; 
//         let appleBiggerSnake = null; 
//         let appleBiggerSnakeSnakeRight = null; 
//         let appleBiggerSnakeSnakeLeft = null; 
//         let appleBiggerSnakeUnderApple = null; 
//         let appleBiggerAppleUnderSnake = null;   

//     //яблуко
//         let AppleLeft =  a3.x;
//         let AppleRight =  a3.x + a3.width;  
//         let AppleTop =  a3.y;  
//         let ApplBottom =  a3.y +  a3.height;    
//     // console.log( SnakeRight, "SnakeRight", SnakeLeft, "SnakeLeftX", SnakeBottom, "SnakeBottom", SnakeTop, "SnakeTop" );
//     // console.log( AppleRight, "AppleRight", AppleLeft, "AppleLeft", ApplBottom, "ApplBottom", AppleTop  , "AppleTop" );

//         let snakeLeftMoreAppleLeftAndSnakeLeftLessAppleRight = null;
//         let snakeTopLessApplBottomAndSnakeTopMoreAppleTop = null;
//         let snakeRightLessAppleRightAndSnakeRightMoreAppleLeft = null;
//         let snakeBottomMoreAppleTopAndSnakeBottomLessApplBottom = null;

//     if ( appleAverageArithmLengthParties === snakeAverageArithmLengthParties ) {
//         snakeLeftMoreAppleLeftAndSnakeLeftLessAppleRight = ( SnakeLeft >= AppleLeft ) && ( SnakeLeft <=  AppleRight );  // Перевірка  SnakeLeft  більше або рівне AppleLeft і SnakeLeft менше або рівне AppleRight. 
//         snakeTopLessApplBottomAndSnakeTopMoreAppleTop = ( SnakeTop <=  ApplBottom ) && ( SnakeTop >= AppleTop ); // Перевірка  SnakeTop чи менша або рівне ApplBottom і SnakeTop більша або рівне AppleTop. Працює лише в комбінації із попереднім кодом.
//         snakeRightLessAppleRightAndSnakeRightMoreAppleLeft = ( SnakeRight <=  AppleRight ) && ( SnakeRight >= AppleLeft ); // Перевірка  SnakeRight чи менша або рівне AppleRight і SnakeRight більша або рівне AppleLeft
//         snakeBottomMoreAppleTopAndSnakeBottomLessApplBottom = ( SnakeBottom >=  AppleTop ) && ( SnakeBottom <= ApplBottom ); // Перевірка SnakeBottom чи більше або рівне ApplTop і SnakeBottom менше або рівне ApplBottom
//     }


//     if  (  
//         ( ( snakeLeftMoreAppleLeftAndSnakeLeftLessAppleRight && snakeTopLessApplBottomAndSnakeTopMoreAppleTop ) || ( snakeRightLessAppleRightAndSnakeRightMoreAppleLeft && snakeTopLessApplBottomAndSnakeTopMoreAppleTop ) ) || 
//         ( ( snakeLeftMoreAppleLeftAndSnakeLeftLessAppleRight && snakeBottomMoreAppleTopAndSnakeBottomLessApplBottom ) || ( snakeRightLessAppleRightAndSnakeRightMoreAppleLeft && snakeBottomMoreAppleTopAndSnakeBottomLessApplBottom ) ||
//         ( appleInsideSnake && snakeBiggerApple ) || ( snakeBiggerAppleAppleUnderSnake && snakeBiggerApple ) || ( snakeBiggerAppleSnakeUnderApple && snakeBiggerApple ) || ( snakeBiggerAppleAppleRight && appleInsideSnake  ) || (  snakeBiggerAppleAppleLeft && appleInsideSnake  )  ||
//         ( snakeInsideApple && appleBiggerSnake ) || ( appleBiggerAppleUnderSnake && appleBiggerSnake ) || ( appleBiggerSnakeUnderApple && appleBiggerSnake ) || ( appleBiggerSnakeSnakeRight && snakeInsideApple  ) || (  appleBiggerSnakeSnakeLeft && snakeInsideApple  ) ) 
//     ) {
    
//         config.appleMealCalculator = config.appleMealCalculator + 1;
//         console.log(config.appleMealCalculator);
//         console.log("Тело змейки на яблоке!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
//         return true;
//     }
//     else if ( false  ) { 
//         alert("Error in logic!!!");
//     }
    
// }

// }

function isSnakeBodyCollision2( frArr, apple, isNeedFullCollision = false ) {
    let res = false; // flag
   

    // цикл проходит по массиву frArr и проверяет КАЖДУЮ ячейку на коллизию с apple
    // при коллизии поднять флаг (res = true;) и прервать цикл (чтоб не жрать ресурсы)
    // isCollision ( snake, a3 )
    for( let i = 0; i < frArr.length; i++ ) {
        let isCollisionResult = isCollision ( frArr[i], apple ); // we get ONJECT { res, isFullCollision }
        // if( isCollisionTrue === true ) { 
            if(  isCollisionResult.res === true ) { // FIX {} !== true 

                if ( isNeedFullCollision && !isCollisionResult.isFullCollision ) {
                    res = false;
                } else {
                    res = true;
                    break;
                }
                    
            
                
            }
    }

    return res;
}

function switchPause ( ) {
    pause = !pause;
    console.log( 'switchPause pause', pause );
}


// ---------------------------------------------------------------------------------------


init();

render ( ctx );


setInterval ( update , config.delay, ctx, c ); // FIX LOGIC ERROR


