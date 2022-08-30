import { testBasicImageGen } from "./ImageModule"

const hello = "hello"

const addWorldToString = (input: string): string=>{
    return (input + " world!")
}

console.log(addWorldToString(hello))
testBasicImageGen()
