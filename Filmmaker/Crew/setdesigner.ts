export async function generateImage(imagePrompt: string, fileOutputLocation: string): Promise<void>{
    await _getDummyImageFromServer(imagePrompt, fileOutputLocation) //TODO: Actually call server        
}

function _getDummyImageFromServer(prompt: string, fileOutputLocation: string): Promise<void>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve()
        }, 3000)
    })
}

async function _testGenerateImage(){
    console.log("TestGenerateImage")
    //TODO: Run python script
}

_testGenerateImage()