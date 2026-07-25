import React from 'react'
import { assets } from '../assets/assets'

const AppDownload = () => {
    return (
        <div
            className="mx-auto mt-24 text-center font-semibold text-[max(3vw,20px)]"
            id="app-download"
        >
            <p>
                For Better Experience Download <br />
                GoldFork App
            </p>

            <div className="flex justify-center gap-[max(2vw,10px)] mt-10">
                <img
                    src={assets.play_store}
                    alt="Google Play"
                    className="w-[max(30vw,120px)] max-w-[180px] cursor-pointer transition duration-500 hover:scale-105"
                />
                <img
                    src={assets.app_store}
                    alt="App Store"
                    className="w-[max(30vw,120px)] max-w-[180px] cursor-pointer transition duration-500 hover:scale-105"
                />
            </div>
        </div>
    )
}

export default AppDownload