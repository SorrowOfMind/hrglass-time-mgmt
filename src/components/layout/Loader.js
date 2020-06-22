import React from 'react';
import {motion} from 'framer-motion';

const backdropVariants = {
    hidden: {opacity: 0},
    visible: {opacity: 1}
}

const loaderVariants = {
    hidden: {rotate: 0},
    visible: {rotate: 360}
}

const Loader = () => {
    return (
        <motion.div 
        className="backdrop"
        variants={backdropVariants}
        initial="hidden"
        animate="visible">
            <ul className="loader-container">
                <motion.li 
                className="loader_circle circle-1"
                variants={loaderVariants}
                transition={{duration: 1, loop: Infinity, ease:'easeInOut'}}
                ></motion.li>
            </ul>
            <ul className="loader-container">
                <motion.li 
                className="loader_circle circle-2"
                variants={loaderVariants}
                transition={{duration: 1, loop: Infinity, delay: 0.1, ease:'easeInOut'}}
                ></motion.li>
            </ul>
            <ul className="loader-container">
                <motion.li 
                className="loader_circle  circle-3"
                variants={loaderVariants}
                transition={{duration: 1, loop: Infinity, delay: 0.2, ease:'easeInOut'}}
                ></motion.li>
            </ul>
           
        </motion.div>
    )
}

export default Loader;