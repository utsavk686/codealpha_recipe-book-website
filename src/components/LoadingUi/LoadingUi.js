import React from 'react'
import "./loadingui.css"

export default function LoadingUi() {
    return (



        <div className='fixed top-0 left-0 right-0 h-screen w-screen z-40 bg-gray-400 bg-opacity-75'>
            <div className="loader">
                <div className="loader-text">
                    <div className="loader">
                        <span className="l">L</span>
                        <span className="o">o</span>
                        <span className="a">a</span>
                        <span className="d">d</span>
                        <span className="i">i</span>
                        <span className="n">n</span>
                        <span className="g">g</span>
                        <span className="d1">.</span>
                        <span className="d2">.</span>
                        <span className="d3">.</span>
                    </div>
                </div>
                <div className="container-loader h-full w-full">
                    <div className="coffee-header">
                        <div className="coffee-header__buttons coffee-header__button-one"></div>
                        <div className="coffee-header__buttons coffee-header__button-two"></div>
                        <div className="coffee-header__display"></div>
                        <div className="coffee-header__details"></div>
                    </div>
                    <div className="coffee-medium">
                        <div className="coffe-medium__exit"></div>
                        <div className="coffee-medium__arm"></div>
                        <div className="coffee-medium__liquid"></div>
                        <div className="coffee-medium__smoke coffee-medium__smoke-one"></div>
                        <div className="coffee-medium__smoke coffee-medium__smoke-two"></div>
                        <div className="coffee-medium__smoke coffee-medium__smoke-three"></div>
                        <div className="coffee-medium__smoke coffee-medium__smoke-for"></div>
                        <div className="coffee-medium__cup"></div>
                    </div>
                    <div className="coffee-footer"></div>
                </div>
            </div>
        </div>




    )
}
