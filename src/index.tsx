import { createRoot } from 'react-dom/client'
import { App } from './App'

const domNode = document.getElementById('root')
if (domNode != null) {
    const root = createRoot(domNode)
    root.render(<App />)
}

// TODO: 
//  - Write more routes for Home, About, Contact and BookDetail. 
