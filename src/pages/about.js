import { Button } from "@mui/material"

export  function About() {
    console.log("About page loaded")
    
    function handleWebviewClick() {
        // window.postMessage({ type: "webview", payload: "webview" }, "*")

        const msg = "Hello from the MinterLab"
        window.uxpHost.postMessage(msg)

    }

    return (
        <div>
            <h1>About</h1>
            <Button onClick={handleWebviewClick}>Webview Test</Button>
        </div>
    )
}