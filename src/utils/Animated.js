import React from 'react';
import '../styles/App.css'; 

class AnimatedArrow extends React.Component {
    componentDidMount() {
        this.animateArrow(); // Bắt đầu animate khi component được render
    }

    animateArrow = () => {
        const arrow = document.querySelector('.arrow');
        arrow.animate([
            {left: '0'},
            {left: '10px'},
            {left: '0'}
        ],{
            duration: 700,
            iterations: Infinity
        });
    }

    render() {
        return (
            <div className="icon-arrow">
                <div className="arrow"></div>
            </div>
        );
    }
}

export default AnimatedArrow;
