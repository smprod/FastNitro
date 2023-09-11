import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from '@app'
import {RecoilRoot} from "recoil";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RecoilRoot>
            <App/>
        </RecoilRoot>
    </React.StrictMode>,
)
