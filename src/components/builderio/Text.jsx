import React, { useState } from "react";

function Text(props){
    const {content} = props;

    return (
        <div className='w-full'>
            <div className='max-w-xl mx-auto text-content' dangerouslySetInnerHTML={{__html: content}}></div>
        </div>
    )
}

export default Text;