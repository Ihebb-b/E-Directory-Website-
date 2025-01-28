// components/AutoPlayVideo.jsx

import React, { useRef, useEffect } from 'react';

const AutoPlayVideo = ({ src }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        const videoElement = videoRef.current;

        const handleIntersection = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    videoElement.play();
                } else {
                    videoElement.pause();
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, {
            threshold: 0.5 // Adjust this value to control when the video starts/stops
        });

        if (videoElement) {
            observer.observe(videoElement);
        }

        return () => {
            if (videoElement) {
                observer.unobserve(videoElement);
            }
        };
    }, []);

    return (
        <video ref={videoRef} src={src} muted loop className="video-responsive" />
    );
};

export default AutoPlayVideo;