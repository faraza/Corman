import { testBasicImageGen, testCharacterMouthAnimation } from "./ImageAndAnimation"

const hello = "hello"

const addWorldToString = (input: string): string=>{
    return (input + " world!")
}

console.log(addWorldToString(hello))
testCharacterMouthAnimation()
