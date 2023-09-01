let Topics = {
    'Quadratics': [function solveEquation(){
        let [x, y] = [randBtw(-10, 10),
         randBtw(-10, 10)]
        let a = 1, b = -(x+y), c = x*y,
        A = 'x'+'2'.sup(),
        B = `${b?((Math.sign(b)==1?' + ':' - ')+(Math.abs(b)==1?'':Math.abs(b))+'x'):''}`,
        C = `${c?((Math.sign(c)==1?' + ':' - ')+Math.abs(c)):''}`;
        eq = A+B+C+' = 0'
        text = [
        'Which of the following set of options satisfy the equation:<br>',
        'Find the value of x in:<br>',
        'Solve for x in:<br>',
        'Find all (n) for which the remainder when (x-n) divides the equation: '
        ]
        return [text[random(text.length)]+eq, [x, y], '']
    }],
    'Simultaneous Equations': [
        function bd(){
            return ["2x-2=4",3]
        },
        function be(){
            return ['2x-21',21/2]
        }],
    'Coordinate Geometry': [function ab(){
        return ["3, 4,...", 5]
    },
         function ac(){
             return ['x+2x+3x=180', 30]
         }],
    'Algebra': [
        function bd(){
            return ['3x+9=18', 3]
        },
        function be(){
            return ['3+2',5]
        }]
}
let selectFrom = options;
function generateOptions(correct=0, suffix=''){
    let ran = parseInt(correct)!=correct?randBtw(0,4):0,
     which = random(4), range = randBtw(-10, 10, ran),
    options = Array(4);
    for(let i=0; i<4;i++){
        switch (typeof correct){
            case 'string':
                for(let j = 0; j<4; j++){
                     let opt = '';
                     for (let s of correct){
                         let r = Math.abs(parseInt(s) + ([1, -1][random(2)] * (j+1)) + suffix);
                         if (r == 0 || r == 1) r='';
                         opt+= parseInt(s)?r:s
                     }
                     options[i] = opt
                }
                break;
            case 'number':
                options[i] = correct + ([1, -1][random(2)] * (i+1)) + suffix
                break;
            case 'object':
                options[i] = correct.map(y=>y + ([1, -1][random(2)] * (i+1)) + suffix)
                break;
        }
    }
    options[which] = correct+suffix;
    return options;
}

let types = {0:'Quadratics', 1: 'Simultaneous Equations', 2:'Coordinate Geometry', 3: 'Algebra'}
console.log