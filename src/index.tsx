import { createRoot } from 'react-dom/client'
import { App } from './App'
import { BrowserRouter, Route, Routes } from 'react-router'

const domNode = document.getElementById('root')
if (domNode != null) {
    const root = createRoot(domNode)
    root.render(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />} />
            
            </Routes>
        </BrowserRouter>
    )
}

// TODO: 
//  - Write more routes for Home, About, Contact and BookDetail. 
