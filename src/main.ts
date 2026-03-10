type X = {
    a: string; 
} 
const y = {
    a: "A",
    b: "B"
} 
const r: X = y

type N = (a: number) => void
type M = (a: number) => void

let x : N = (j: number) => undefined
let z : M = (j: number) => j + 1

z = x
x = z

let c = () => ({a: "A"})
let d = () => ({ a: 'A', b : 'B'})

c = d;
//d = c incorrect return type of c is not assignable to d cause the second elemt is missing

//discarding func param is allowed as it is common practice in js

[1,2,4].map((e, _i, _a) => e + 2)

type OptionalParam = (a: number, ...rest: number[]) => undefined;
let optionalParam: OptionalParam = (a,b,c) => undefined;

function overload (x : string) : void
function overload (x: string, y: number): void;
function overload (x: string, y?: number): void {
    console.log(x,y)
}

overload('a')
overload('a',1)

//checkout more on function overload

class supertype {
    a: string;
    constructor(v: string){
        this.a = v
    }
}

class T extends supertype {
    a = ""
    constructor(v: string){
        super(v)
    }
}
class W extends supertype {}

type GetA = (x: supertype) => string;
const getA: GetA = x => x.a
const getResult = getA(new supertype(""))

//enums - controlled list of allowed values, modify finite set of options in a clear and concise manner
// which is used to define a set of named constant value

const enum E {
    A,
    B
}
const enum F {
   A,
   B,
   C
}

const xa: number = E.A
const ya: F = 0   //valid cause zero can be foumnd in the enum element 

//E.A === F.A invalid enum values from different types is invalid

class instanceI {
    public a: string;
    constructor(v: string){
        this.a = v
    }
}

class instanceII {
    private a: string;
    constructor(v: string){
        this.a = v
    }
}

//let instanceCheck: instanceI = new instanceII("") invalid - the instance of class II is not compatible 
// with instanceI because of it's protected member

//Generics it allows us to detect types that are decided later
interface GenA<T>{
    a: T
}
let gen1: GenA<number> = {a: 1}
let gen2: GenA<string> = {a: ""}

//gen1 == gen2 
// invalid the type argument used in the final structure detetermines this

interface GenB<T> {}
const genB1: GenB<number> = 1 //pass any type decided with the generic T
const genB2: GenB<number> = 2

genB1 == genB2 //valid as no type arument is used in the final structure

/*
When generics do not have their type argument specified, all the
unspecified arguments are treated as types with “any”:
*/

type GenC = <T>(x: T) => T
type GenD = <T>(x: T) => T

let genC1: GenC = param => param
let genC2: GenD = param => param

genC1 = genC2

let unknown: unknown 
unknown = 1 // valid all types are assignable to unknown

//let e3: number = unknown //but unknwon are not assignable to all types

let never: never;
//never = 1 //invalid nothing is assignable to never

let voidd: void
//voidd = 1  invalid void is not assignable to or from anything except any like this below
let any: any;
voidd = any;

//Types as sets

