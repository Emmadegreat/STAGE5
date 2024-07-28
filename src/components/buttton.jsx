import React from 'react'

const Buttton = ({href, className, text}) => {
    return (

        <a href={href} className={className}>
            <p>{ text}</p>
        </a>

    )
}

export default Buttton
