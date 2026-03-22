type X = {
  a: string;
};
const y = {
  a: "A",
  b: "B",
};
const r: X = y;

type N = (a: number) => void;
type M = (a: number) => void;

let x: N = (j: number) => undefined;
let z: M = (j: number) => j + 1;

z = x;
x = z;

let c = () => ({ a: "A" });
let d = () => ({ a: "A", b: "B" });

c = d;
//d = c incorrect return type of c is not assignable to d cause the second elemt is missing

//discarding func param is allowed as it is common practice in js

[1, 2, 4].map((e, _i, _a) => e + 2);

type OptionalParam = (a: number, ...rest: number[]) => undefined;
let optionalParam: OptionalParam = (a, b, c) => undefined;

function overload(x: string): void;
function overload(x: string, y: number): void;
function overload(x: string, y?: number): void {
  console.log(x, y);
}

overload("a");
overload("a", 1);

//checkout more on function overload

class supertype {
  a: string;
  constructor(v: string) {
    this.a = v;
  }
}

class T extends supertype {
  a = "";
  constructor(v: string) {
    super(v);
  }
}
class W extends supertype {}

type GetA = (x: supertype) => string;
const getA: GetA = (x) => x.a;
const getResult = getA(new supertype(""));

//enums - controlled list of allowed values, modify finite set of options in a clear and concise manner
// which is used to define a set of named constant value

const enum E {
  A,
  B,
}
const enum F {
  A,
  B,
  C,
}

const xa: number = E.A;
const ya: F = 0; //valid cause zero can be foumnd in the enum element

//E.A === F.A invalid enum values from different types is invalid

class instanceI {
  public a: string;
  constructor(v: string) {
    this.a = v;
  }
}

class instanceII {
  private a: string;
  constructor(v: string) {
    this.a = v;
  }
}

//let instanceCheck: instanceI = new instanceII("") invalid - the instance of class II is not compatible
// with instanceI because of it's protected member

//Generics it allows us to detect types that are decided later
interface GenA<T> {
  a: T;
}
let gen1: GenA<number> = { a: 1 };
let gen2: GenA<string> = { a: "" };

//gen1 == gen2
// invalid the type argument used in the final structure detetermines this

interface GenB<T> {}
const genB1: GenB<number> = 1; //pass any type decided with the generic T
const genB2: GenB<number> = 2;

genB1 == genB2; //valid as no type arument is used in the final structure

/*
When generics do not have their type argument specified, all the
unspecified arguments are treated as types with “any”:
*/

type GenC = <T>(x: T) => T;
type GenD = <T>(x: T) => T;

let genC1: GenC = (param) => param;
let genC2: GenD = (param) => param;

genC1 = genC2;

let unknown: unknown;
unknown = 1; // valid all types are assignable to unknown

//let e3: number = unknown //but unknwon are not assignable to all types

let never: never;
//never = 1 //invalid nothing is assignable to never

let voidd: void;
//voidd = 1  invalid void is not assignable to or from anything except any like this below
let any: any;
voidd = any;

//Types as sets
//Union universal

type unionA = {
  a: string;
};

type unionB = {
  b: string;
};

type unionAB = unionA | unionB;
const check: unionAB = { a: "a", b: "b" }; //valid

type unionC = {
  a: string;
  b: string;
};

type UnionABC = unionA & unionC;
const unionABC: UnionABC = { a: "a", b: "b" }; //valid
//const unionABC1: UnionABC = {a: 'a'}  //invalid since we used the and and not the union type

interface ext1 {
  a: string;
}
interface ext2 extends ext1 {
  b: string;
}
interface ext3 extends ext2 {
  c: string;
}
const ext: ext3 = { a: "a", b: "b", c: "c" };

//type declaration
type Type = {
  a: string;
};

const typeDeclare: Type = {
  a: "a",
};

//type assertion with "as" keyword
type Assertion = {
  a: string;
};
const assertion = {
  a: "a",
  b: "b",
} as Assertion; //tells typescript there is more information to provide on this type

type Key<Type> = {
  [property in keyof Type as `prefix_${string &
    property}`]: () => Type[property];
};

type check = {
  a: string;
  b: string;
};
type key = Key<check>; //the type Key<Type> uses a mapped type with a etmplate literal to remap the keys of Type
//it creates new properties with a 'prefix_' added to each key, and their corresponding values are functions returning original property values

//symbol
type newSymbol = {
  [sym: symbol]: number;
};
const a = Symbol("a");
const b = Symbol("b");
let obj: newSymbol = {};
obj[a] = 123;
obj[b] = 456;

console.log(obj[a]); //123
console.log(obj[b]); //456

//arrays
const array1: string[] = ["a", "b"];
const array2: Array<string> = ["a", "b"];
const array3: Array<string | number> = ["a", 1, "b", 2];

//readonly arrays

const readArray1: readonly string[] = ["a", "b"];
const readArray2: ReadonlyArray<string> = ["a", "b"];
const readArray3: ReadonlyArray<string | number> = ["a", 1, "b", 2];

//readArray1.push('a') //invalid

const tuple: [string, number] = ["a", 1];
const readTuple: readonly [string, number] = ["1", 1];

//index signatiures

type index = {
  [name: string | number]: string;
};
const index_i: index = { a: "a", 1: "1" };
console.log(index_i["1"]); // '1'
console.log(index_i[1]); // '1'

//Enums - an enum is a set of named constant values
enum Color {
  Red = "Red color",
  Green = "Green color",
  Blue = "Blue color",
}

//Numeric Enums
enum Size {
  small, //value starts from zero
  Meduim,
  Large,
}

enum Size_i {
  Small = 10,
  Medium,
  Large,
}
console.log(Size_i.Medium); //11

//string enums
enum Language {
  English = "EN",
  Spanish = "ES",
}

//reverse mapping - getting the enum member from it;s value
enum Grade {
  A = 90,
  B = 80,
  C = 70,
  F = "fail",
}

const myGrade = Grade.A;
console.log(Grade[myGrade]); // A
console.log(Grade[80]); // B

//Narrowing
// The process of refining the type of a variable within a conditional block.

//typeof type guards

const fn = (x: number | string) => {
  if (typeof x === "number") {
    return x + 1;
  }
  return -1;
};

const toUpperCase = (name: string | null) => {
  if (name) {
    return name.toUpperCase();
  } else {
    return null;
  }
};

//in operator
//The in operator is a way to narroe the type of a variable based on whether a property exist within the variable

type Dog = {
  name: string;
  breed: string;
};

type Cat = {
  name: String;
  likesCream: boolean;
};

const getAnimalType = (pet: Dog | Cat) => {
  if ("breed" in pet) {
    return "Dog";
  } else {
    return "Cat";
  }
};

//Instanceof narrowing
//check if an object is an instance of a class or interface

class Square {
  constructor(public width: number) {}
}
class Rectangle {
  constructor(public width: number, public height: number) {}
}

const area = (shape: Square | Rectangle) => {
  if (shape instanceof Square) {
    return shape.width * shape.width;
  } else {
    return shape.height * shape.width;
  }
};

const square = new Square(20);
const rectangle = new Rectangle(10, 20);

console.log(area(square));
console.log(area(rectangle));

//control flow analysis

const f1 = (x: unknown) => {
  const isString = typeof x === "string";
  if (isString) x.length;
};

const f2 = (
  obj:
    | {
        kind: "foo";
        foo: string;
      }
    | {
        kind: "bar";
        bar: number;
      }
) => {
  const isFoo = obj.kind === "foo";
  if (isFoo) {
    obj.foo;
  } else {
    obj.bar;
  }
};

const isString = (v: unknown): v is string => typeof v === "string";

const foo = (bar: unknown) => {
  if (isString(bar)) {
    console.log(bar.toUpperCase());
  } else console.log("not a string");
};

type square = {
  kind: "square"; //type discriminant
  size: number;
};

type circle = {
  kind: "circle"; //type discriminant
  radius: number;
};

type Shape = square | circle;

const newArea = (shape: Shape) => {
  switch (shape.kind) {
    case "square":
      return Math.pow(shape.size, 2);
    case "circle":
      return Math.PI * Math.pow(shape.radius, 2);
  }
};

const s_shape: square = { kind: "square", size: 20 };
const c_shape: circle = { kind: "circle", radius: 10 };

console.log(newArea(s_shape));
console.log(newArea(c_shape));

//tuple types - represent an array with a fixed number of elements and their types

type Point = [number, number];

const point: Point = [2, 4];

//fixed length tuple

const tu = [10, "hello"] as const;
//tu.push(2); //Invalid

//Advanced
//Mapped types
//it allows you to create a new types based on an existing type
//by transforming each property using a mapping function
//ny mapping existing types you can create new types that represent the same information in a different format

type MyMappedType<T> = {
  [p in keyof T]: T[p][]; //Give me the key of the object type passed 'p' and return the value of the object in typed array imagine we have an array new['22'] this returns the value of the key 22 in this case it is just a type
};

type MyType = {
  foo: string;
  bar: number;
};

type MyNewType = MyMappedType<MyType>;

//result in a cleaer view but we could achieve this with the use of mapped types and generic
// type MyNewType = {
//     foo: string[];
//     bar: number[];
// }

const typeImpl: MyNewType = {
  foo: ["hello", "world"],
  bar: [1, 2, 3, 4],
};

//Mapped types modifiers

// all properties marked as readonly
type readonly<R> = { readonly [P in keyof R]: R[P] };

//all properties marked as mutable
type mutable<R> = { -readonly [p in keyof R]: R[p] };

//all marked as optional
type Mypartial<R> = { [Q in keyof R]: R[Q] };

//conditional types - ways to create a type that depends on a condition, where the type created is determined based on the result of the condition

type IsArray<T> = T extends any[] ? true : false; //checks if type is an array return type true

const myArray = [1, 2, 3];
const myNumber = 26;

type checkTypeArray = IsArray<typeof myArray>; //returns true
type checkTypeNotArray = IsArray<typeof myNumber>; // returns false

//Distributive conditional types

type Nullable<T> = T extends any ? T | null : never;
type NumberOrBool = number | boolean;

type NullableNumberOrBool = Nullable<NumberOrBool>;

//infer keyword is used in conditional types to extract they type of a generic parameter
//from a type that depends on it

type ElementType<T> = T extends (infer U)[] ? U : never;
type Numbers = ElementType<number[]>; //number
type Strings = ElementType<string[]>; //string

//built-in conditional types provided by the language. They are designed to perform
//common type transformations based on the characteristics

type literal = "a" | "b" | "c" | "d" | "e" | undefined;
type functionTest = (a: number, b: number) => number;

type exclude = Exclude<literal, "a">; //then excludes 'a'
type extract = Extract<literal, "a" | "b">; //extracts only 'a' or 'b'
type nonNullable = NonNullable<literal>; //removes Null or undefined in a type
type returnType = ReturnType<functionTest>; //extracts the return type of a function type
type parameter = Parameters<functionTest>; //extracts the parameter type of a function type gives as an array

//any type some takeaways to consider
/*
- Limit the usage of "any" to specific cases ehere thr type is truly unkown
- Do not return "any" type from a function, as this weakends type saftey in code that uses it
- instead of use any use "@ts-ignore" if you need to silence the compiler
*/

//void type is used to indicate that f function does not return a value

const sayHello = (): void => {
  console.log("Hello");
};

//Interfaces and type
//intefaces define the structure of an object, specifying the names and types of properties or methods that an object must have

interface InterfaceName {
  property1: number;
  method1(arg1: number, arg2: string, arg3: string): string;
}

//similar to using type
type typeName = {
  property1: number;
  method1(arg1: number, arg2: string, arg3: string): string;
};

//Function overload in typescript allows you to define multiple functiom signature for a single
//fuction name

function h(name: string): string;
function h(name: string[]): string;

function h(name: unknown): unknown {
  if (typeof name === "string") {
    return `hi, ${name}`;
  } else if (Array.isArray(name)) {
    return name.map((name) => `Hi, ${name}`);
  }
  throw new Error("Invalid value");
}

h("Emmanuel");
h(["Emma", "Nans", "bitch", "nigha"]);
//overloads could also be implemented as a method in a class

//Merging and extensions - two different concepts related to working with types and interfsces

//merging allows you to combime multiple declarations of the same name into a single definition, example defining an interface
//with the same multipe names

interface merge_one {
  a: String;
}
interface merge_one {
  //the same interface name
  b: Number;
}

const person: merge_one = {
  a: "a",
  b: 7,
};

//Extension whereas refers to the ability to extend or inherit from existing types or interface to create new ones
interface a_one {
  name: string;
  eat(): void;
}

interface bird extends a_one {
  sing(): void;
}

const d_1: bird = {
  name: "lucky",
  eat() {
    console.log("Eating");
  },
  sing() {
    console.log("singing");
  },
};

//in typescript it is possible to define multiple contructor overloads,
//but you can have only one implementation that muct be compatibe wit all overloads

class Person {
  name: string;
  age: number;

  constructor();
  constructor(name: string);
  constructor(name: string, age: number);
  constructor(name?: string, age?: number) {
    this.age = age ?? 0;
    this.name = name ?? "unknown";
  }

  displayInfo() {
    console.log(`Name: ${this.name}, Age: ${this.age}`);
  }
}

const p1 = new Person();
p1.displayInfo(); //Name: unknown, Age: 0

//protected constructors are useful when you want to create a base class that should not be instantiated directly but can be extended by subclasses
class BaseClass {
  protected constructor() {}
}
//const b_class = new BaseClass() invalid and error

class DerivedBaseClass extends BaseClass {
  private value: number;

  constructor(v: number) {
    super();
    this.value = v;
  }
}
const d_b_class = new DerivedBaseClass(7);

//Get and Set these are specia methods that allows you to define custom access and modification bahaviour from class properties.
//internallt getting and setting their values

class MyClass {
  private _myProperty: string;

  constructor(v: string) {
    this._myProperty = v;
  }

  get myProperty(): string {
    return this._myProperty;
  }
  set myProperty(v: string) {
    this._myProperty = v;
  }
}

